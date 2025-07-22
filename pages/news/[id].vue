<template>
  <div class="p-4 max-w-6xl mx-auto">
    <Loader v-if="loader" />

    <div v-if="newsItem" class="mb-8">
      <button @click="goBack" class="mb-4 text-blue-600 hover:underline">← {{ $t('back') }}</button>
      <h1 class="text-2xl font-bold mb-2">
        {{ locale === 'ar' ? newsItem.titleAr : newsItem.titleEn }}
      </h1>
      <p class="text-gray-600 mb-4">
        {{ locale === 'ar' ? newsItem.descriptionAr : newsItem.descriptionEn }}
      </p>

      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="media in mediaList"
          :key="media.id"
          class="group bg-white shadow rounded-xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="relative">
            <template v-if="media.mediaType === 'Image'">
              <img
                :src="media.url"
                @click="openImage(media.url)"
                class="w-full h-64 object-cover cursor-pointer"
              />
            </template>
            <template v-else>
              <iframe
                :src="formatYouTubeUrl(media.url)"
                class="w-full h-64"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </template>
          </div>
          <div class="p-2 text-sm">
            {{ locale === 'ar' ? media.captionAr : media.captionEn }}
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div
      v-if="lightboxImage"
      class="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
    >
      <div class="relative max-w-4xl w-full">
    <button
  @click="lightboxImage = null"
  class="absolute top-4 right-2 bg-red hover:bg-red-700 text-white text-xl font-bold px-3 py-1 rounded-full z-10"
>
  ✕
</button>

        <img
          :src="lightboxImage"
          class="w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const config = useRuntimeConfig()

const newsItem = ref(null)
const mediaList = ref([])
const loader = ref(true)

const lightboxImage = ref(null)
const openImage = (url) => {
  lightboxImage.value = url
}

const goBack = () => {
  router.push('/news')
}

// تنسيق روابط يوتيوب
const formatYouTubeUrl = (url) => {
  try {
    const videoId = new URL(url).searchParams.get('v')
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  } catch {
    return url
  }
}

const fetchNewsItem = async () => {
  loader.value = true
  try {
    const id = route.params.id

    const allNews = await $fetch(`/api/NewsItems/GetAllMatching?PageNumber=1&PageSize=1000`, {
      baseURL: config.public.baseUrl,
      method: 'GET'
    })
    newsItem.value = allNews.items.find((item) => item.id === id)

    const query = new URLSearchParams({
      NewsItemId: id,
      PageNumber: '1',
      PageSize: '100',
      Search: ''
    })

    const mediaRes = await $fetch(`/api/NewsMediaItems/GetAllMatching?${query}`, {
      baseURL: config.public.baseUrl,
      method: 'GET'
    })
    mediaList.value = mediaRes.items
  } catch (err) {
    console.error(err)
  } finally {
    loader.value = false
  }
}

onMounted(() => {
  fetchNewsItem()
})
</script>
