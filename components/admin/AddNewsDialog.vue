<template>
  <div>
    <button @click="dialogOpen = true" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      إضافة خبر جديد
    </button>

    <dialog v-if="dialogOpen" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 class="text-xl font-bold mb-4">إضافة خبر جديد</h2>

        <!-- العناوين والوصف -->
        <div class="grid grid-cols-2 gap-4">
          <input v-model="form.titleAr" placeholder="عنوان (عربي)" class="border p-2 rounded" />
          <input v-model="form.titleEn" placeholder="Title (English)" class="border p-2 rounded" />
          <textarea v-model="form.descriptionAr" placeholder="وصف (عربي)" class="border p-2 rounded col-span-1"></textarea>
          <textarea v-model="form.descriptionEn" placeholder="Description (English)" class="border p-2 rounded col-span-1"></textarea>
        </div>

<!-- الصور -->
<h3 class="mt-6 font-semibold">الصور</h3>
<div v-for="(img, index) in form.newsItemImages" :key="index" class="grid grid-cols-4 gap-2 items-center my-2">
  <input type="file" @change="e => handleImageUpload(e, index)" accept="image/*" class="border p-2 rounded" />
  <input v-model="img.captionAr" placeholder="عنوان (عربي)" class="border p-2 rounded" />
  <input v-model="img.captionEn" placeholder="Caption (English)" class="border p-2 rounded" />
  <div v-if="img.url">
    <img :src="img.url" class="w-16 h-16 object-cover rounded" />
  </div>
</div>
<button @click="addImage" class="text-blue-600 hover:underline text-sm">+ صورة جديدة</button>

        <!-- الفيديوهات -->
        <h3 class="mt-6 font-semibold">الفيديوهات</h3>
        <div v-for="(vid, index) in form.newsItemVideos" :key="index" class="grid grid-cols-3 gap-2 items-center my-2">
          <input v-model="vid.url" placeholder="رابط الفيديو (يوتيوب)" class="border p-2 rounded" />
          <input v-model="vid.captionAr" placeholder="عنوان (عربي)" class="border p-2 rounded" />
          <input v-model="vid.captionEn" placeholder="Caption (English)" class="border p-2 rounded" />
        </div>
        <button @click="addVideo" class="text-blue-600 hover:underline text-sm">+ فيديو جديد</button>

        <!-- أزرار -->
        <div class="mt-6 flex justify-end space-x-4">
          <button @click="dialogOpen = false" class="bg-gray-300 px-4 py-2 rounded">إغلاق</button>
          <button @click="submitForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">إرسال</button>
        </div>

        <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
        <p v-if="success" class="text-green-600 mt-2">تم إضافة الخبر بنجاح</p>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const dialogOpen = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({
  titleEn: '',
  titleAr: '',
  descriptionEn: '',
  descriptionAr: '',
  newsItemImages: [],
  newsItemVideos: []
})

const addImage = () => {
  form.newsItemImages.push({ url: '', captionEn: '', captionAr: '' })
}

const addVideo = () => {
  form.newsItemVideos.push({ url: '', captionEn: '', captionAr: '' })
}

const config = useRuntimeConfig()

const handleImageUpload = async (event, index) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', config.public.CLOUDINARY_UPLOAD_PRESET)

  try {
    const response = await $fetch(`https://api.cloudinary.com/v1_1/${config.public.CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    })

    form.newsItemImages[index].url = response.secure_url
  } catch (err) {
    error.value = 'فشل رفع الصورة إلى Cloudinary'
  }
}

const emit = defineEmits(['newsAdded'])

const submitForm = async () => {
  error.value = ''
  success.value = ''

  try {
    const token = localStorage.getItem('authToken') // استدعاء التوكن

    await $fetch('/api/NewsItems/Add', {
      baseURL: config.public.baseUrl,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // إرسال التوكن
      },
      body: form,
    })

    success.value = 'تمت إضافة الخبر بنجاح ✅'

    setTimeout(() => {
      dialogOpen.value = false
      emit('newsAdded')
      resetForm()
    }, 300)

  } catch (err) {
    error.value = err?.data?.message || 'فشل في الإضافة'
  }
}

const resetForm = () => {
  form.titleEn = ''
  form.titleAr = ''
  form.descriptionEn = ''
  form.descriptionAr = ''
  form.newsItemImages = []
  form.newsItemVideos = []
}
</script>
