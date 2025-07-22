<template>
  <div>
    <!-- حقل البحث -->
    <input
      v-model="search"
      @input="onSearch"
      placeholder="بحث..."
      class="border p-2 mb-4 rounded w-full max-w-md"
    />

    <!-- جدول الأخبار -->
    <div class="overflow-x-auto">
      <table class="w-max min-w-[1000px] border">
        <thead>
          <tr class="bg-gray-200 text-center text-black">
            <th class="p-2 border">#</th>
            <th class="p-2 border">العنوان (عربي)</th>
            <th class="p-2 border">العنوان (إنجليزي)</th>
            <th class="p-2 border">الوصف (عربي)</th>
            <th class="p-2 border">الوصف (إنجليزي)</th>
            <th class="p-2 border">تاريخ النشر</th>
            <th class="p-2 border">الوسائط</th>
            <th class="p-2 border">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(news, index) in newsItems" :key="news.id" class="text-center">
            <td class="border p-2">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="border p-2">{{ news.titleAr || '—' }}</td>
            <td class="border p-2">{{ news.titleEn || '—' }}</td>
            <td class="border p-2">{{ news.descriptionAr || '—' }}</td>
            <td class="border p-2">{{ news.descriptionEn || '—' }}</td>
            <td class="border p-2">{{ formatDate(news.publishDate) }}</td>
            <td class="border p-2">
              <button @click="viewMedia(news.id)" class="text-blue-600 underline">عرض الوسائط</button>
            </td>
            <td class="border p-2">
              <button @click="startEdit(news)" class="text-yellow-600 hover:underline">✏ تعديل</button>
              <button @click="deleteNews(news.id)" class="text-red-600 hover:underline ml-2">🗑 حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center mt-4 space-x-4 w-max min-w-[1000px]">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50">
        ⬅ السابق
      </button>
      <span>صفحة {{ currentPage }}</span>
      <button @click="nextPage" :disabled="!hasMore" class="px-4 py-1 rounded bg-gray-200 disabled:opacity-50">
        التالي ➡
      </button>
    </div>

    <!-- الوسائط -->
    <div v-if="media.length" class="mt-6">
      <h3 class="font-bold mb-2">الصور والفيديوهات:</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="item in media" :key="item.id" class="border p-2 rounded-xl">
         <template v-if="item.mediaType === 'Image'">
  <img :src="item.url" class="w-full h-64 object-cover rounded-xl" />
</template>
<template v-else>
  <iframe
    :src="getYoutubeEmbedUrl(item.url)"
    class="w-full h-64 rounded-xl"
    frameborder="0"
    allowfullscreen
  ></iframe>
</template>

          <p class="text-sm mt-1">{{ item.captionAr || 'بدون عنوان' }}</p>
          <button @click="deleteMedia(item.id)" class="text-red-600 text-sm underline mt-1">🗑 حذف</button>
        </div>
      </div>

      <div class="flex gap-4 mt-6">
        <button @click="openAddImageDialog" class="bg-green-600 text-white px-4 py-1 rounded">➕ إضافة صورة</button>
        <button @click="openAddVideoDialog" class="bg-blue-600 text-white px-4 py-1 rounded">➕ إضافة فيديو</button>
      </div>
    </div>

    <!-- Dialog إضافة صورة -->
    <div v-if="showAddImage" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 class="text-lg font-bold mb-4">إضافة صورة</h2>
        <input type="file" accept="image/*" @change="onFileChange" class="mb-2" />
        <input v-model="newImage.captionAr" placeholder="عنوان (عربي)" class="mb-2 border p-2 rounded w-full" />
        <input v-model="newImage.captionEn" placeholder="عنوان (إنجليزي)" class="mb-2 border p-2 rounded w-full" />
        <div class="flex justify-end gap-2 mt-4">
          <button @click="showAddImage = false" class="bg-gray-300 px-4 py-1 rounded">إلغاء</button>
          <button @click="submitImage" class="bg-green-600 text-white px-4 py-1 rounded">💾 حفظ</button>
        </div>
      </div>
    </div>

    <!-- Dialog إضافة فيديو -->
    <div v-if="showAddVideo" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 class="text-lg font-bold mb-4">إضافة فيديو</h2>
        <input v-model="newVideo.url" placeholder="رابط YouTube" class="mb-2 border p-2 rounded w-full" />
        <input v-model="newVideo.captionAr" placeholder="عنوان (عربي)" class="mb-2 border p-2 rounded w-full" />
        <input v-model="newVideo.captionEn" placeholder="عنوان (إنجليزي)" class="mb-2 border p-2 rounded w-full" />
        <div class="flex justify-end gap-2 mt-4">
          <button @click="showAddVideo = false" class="bg-gray-300 px-4 py-1 rounded">إلغاء</button>
          <button @click="submitVideo" class="bg-blue-600 text-white px-4 py-1 rounded">💾 حفظ</button>
        </div>
      </div>
    </div>

    <Loader v-if="loader" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const newsItems = ref([])
const media = ref([])
const search = ref('')
const currentPage = ref(1)
const pageSize = 5
const hasMore = ref(false)
const loader = ref(false)
const selectedNewsId = ref(null)
const showAddImage = ref(false)
const showAddVideo = ref(false)

const newImage = ref({ file: null, captionAr: '', captionEn: '' })
const newVideo = ref({ url: '', captionAr: '', captionEn: '' })

const config = useRuntimeConfig()

const fetchNews = async () => {
  loader.value = true
  try {
    const query = new URLSearchParams({
      PageNumber: currentPage.value.toString(),
      PageSize: pageSize.toString(),
      Search: search.value
    })
    const response = await $fetch(`/api/NewsItems/GetAllMatching?${query}`, {
      baseURL: config.public.baseUrl,
      method: 'GET'
    })
    newsItems.value = response.items
    hasMore.value = response.items.length === pageSize
  } finally {
    loader.value = false
  }
}

const onSearch = () => {
  currentPage.value = 1
  fetchNews()
}

const viewMedia = async (newsId) => {
  selectedNewsId.value = newsId
  loader.value = true
  try {
    const query = new URLSearchParams({
      NewsItemId: newsId,
      PageNumber: '1',
      PageSize: '20',
      Search: ''
    })
    const response = await $fetch(`/api/NewsMediaItems/GetAllMatching?${query}`, {
      baseURL: config.public.baseUrl,
      method: 'GET'
    })
    media.value = response.items
  } finally {
    loader.value = false
  }
}

const deleteNews = async (id) => {
  if (!confirm('هل أنت متأكد من حذف هذا الخبر؟')) return
  loader.value = true
  try {
    await $fetch('/api/NewsItems/Delete', {
      baseURL: config.public.baseUrl,
      method: 'DELETE',
      body: { id }
    })
    fetchNews()
  } finally {
    loader.value = false
  }
}

const deleteMedia = async (id) => {
  loader.value = true
  try {
    await $fetch('/api/NewsMediaItems/Delete', {
      baseURL: config.public.baseUrl,
      method: 'DELETE',
      body: { id }
    })
    viewMedia(selectedNewsId.value)
  } finally {
    loader.value = false
  }
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) newImage.value.file = file
}

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', config.public.CLOUDINARY_UPLOAD_PRESET)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.public.CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  })
  if (!response.ok) throw new Error('فشل رفع الصورة')
  const data = await response.json()
  return data.secure_url
}

const submitImage = async () => {
  if (!newImage.value.file) return alert('اختر صورة أولاً')
  loader.value = true
  try {
    const imageUrl = await uploadImageToCloudinary(newImage.value.file)
    await $fetch('/api/NewsMediaItems/Add', {
      baseURL: config.public.baseUrl,
      method: 'POST',
      body: {
        newsItemId: selectedNewsId.value,
        newsItemImages: [
          {
            url: imageUrl,
            captionAr: newImage.value.captionAr,
            captionEn: newImage.value.captionEn
          }
        ],
        newsItemVideos: []
      }
    })
    showAddImage.value = false
    viewMedia(selectedNewsId.value)
  } finally {
    loader.value = false
  }
}

const submitVideo = async () => {
  if (!newVideo.value.url) return alert('ادخل رابط الفيديو')
  loader.value = true
  try {
    await $fetch('/api/NewsMediaItems/Add', {
      baseURL: config.public.baseUrl,
      method: 'POST',
      body: {
        newsItemId: selectedNewsId.value,
        newsItemImages: [],
        newsItemVideos: [
          {
            url: newVideo.value.url,
            captionAr: newVideo.value.captionAr,
            captionEn: newVideo.value.captionEn
          }
        ]
      }
    })
    showAddVideo.value = false
    viewMedia(selectedNewsId.value)
  } finally {
    loader.value = false
  }
}

const openAddImageDialog = () => {
  showAddImage.value = true
  newImage.value = { file: null, captionAr: '', captionEn: '' }
}

const openAddVideoDialog = () => {
  showAddVideo.value = true
  newVideo.value = { url: '', captionAr: '', captionEn: '' }
}

const nextPage = () => {
  currentPage.value++
  fetchNews()
}
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchNews()
  }
}
const getYoutubeEmbedUrl = (url) => {
  if (!url) return ''
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

const formatDate = (date) => {
  const d = new Date(date)
  return isNaN(d.getTime()) ? 'غير متوفر' : d.toLocaleDateString()
}

onMounted(() => {
  fetchNews()
})
</script>

<style scoped>
input, textarea {
  direction: rtl;
}
</style>
