<template>
  <div class="p-8 mt-48">
    <h1 class="text-2xl font-bold mb-4">📤 رفع صورة أو فيديو</h1>

    <input type="file" @change="handleUpload" accept="image/*,video/*" />

    <div v-if="uploading" class="mt-2 text-blue-600">جاري الرفع...</div>

    <div v-if="fileUrl" class="mt-4">
      <div v-if="isImage(fileUrl)">
        <NuxtImg :src="fileUrl" class="max-w-sm rounded shadow" />
      </div>
      <div v-else-if="isVideo(fileUrl)">
        <video controls class="max-w-sm rounded shadow">
          <source :src="fileUrl" />
        </video>
      </div>
      <p class="mt-2 text-gray-700 break-words text-sm">📎 {{ fileUrl }}</p>
    </div>
  </div>
</template>

<script setup>
const uploading = ref(false)
const fileUrl = ref('')

const config = useRuntimeConfig()
const cloudName = config.public.CLOUDINARY_CLOUD_NAME
const uploadPreset = config.public.CLOUDINARY_UPLOAD_PRESET

const handleUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploading.value = true

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    fileUrl.value = data.secure_url

    if (data.secure_url) {
      await $fetch('/api/media', {
        method: 'POST',
        body: {
          url: data.secure_url,
          type: data.resource_type // 'image' أو 'video'
        }
      })
    }
  } catch (err) {
    console.error('رفع فشل:', err)
  } finally {
    uploading.value = false
  }
}

const isImage = (url) => /\.(jpe?g|png|gif|bmp|webp)$/i.test(url)
const isVideo = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url)
</script>
