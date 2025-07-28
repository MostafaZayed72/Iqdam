<template>
  <div class="container mx-auto p-4" style="background-image: url('/imgs/2.png'">
    <!-- حقل البحث -->
    <input
      v-model="search"
      @input="onSearch"
      placeholder="بحث عن الأخبار..."
      class="border border-gray-300 rounded px-4 py-2 mb-6 w-full max-w-md"
    />

    <!-- Loader -->
    <Loader v-if="loader" />

    <!-- الأخبار -->
    <div v-else class="grid gap-6 md:grid-cols-2">
      <div
        v-for="item in newsItems"
        :key="item.id"
        class="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        @click="navigateToNews(item.id)"
      >
        <img
          v-if="item.firstImage"
          :src="item.firstImage"
          class="w-full h-60 object-cover"
          alt="News Image"
        />
        <div class="p-4">
          <h3 class="text-lg font-bold mb-2">
            {{ locale === 'ar' ? item.titleAr : item.titleEn }}
          </h3>
          <p class="text-sm text-gray-600 line-clamp-3">
            {{ locale === 'ar' ? item.descriptionAr : item.descriptionEn }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-4 mt-8" v-if="!loader && newsItems.length">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-gray-200 px-4 py-1 rounded disabled:opacity-50 text-black"
      >
        ⬅ السابق
      </button>
      <span class="bg-primary py-2 px-2 rounded-full">صفحة {{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="!hasMore"
        class="bg-gray-200 px-4 py-1 rounded disabled:opacity-50 text-black"
      >
        التالي ➡
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'

const newsItems = ref([])
const currentPage = ref(1)
const pageSize = 6
const search = ref('')
const hasMore = ref(false)
const loader = ref(false)

const { locale } = useI18n()
const router = useRouter()
const config = useRuntimeConfig()

const fetchNews = async () => {
  loader.value = true
  try {
    const query = new URLSearchParams({
      PageNumber: currentPage.value.toString(),
      PageSize: pageSize.toString(),
      Search: search.value
    })

    const res = await $fetch(`/api/NewsItems/GetAllMatching?${query}`, {
      baseURL: config.public.baseUrl,
      method: 'GET'
    })

    // لكل خبر، نجيب أول صورة فقط
    const withImages = await Promise.all(
      res.items.map(async (item) => {
        try {
          const mediaQuery = new URLSearchParams({
            NewsItemId: item.id,
            PageNumber: '1',
            PageSize: '10',
            Search: ''
          })

          const media = await $fetch(`/api/NewsMediaItems/GetAllMatching?${mediaQuery}`, {
            baseURL: config.public.baseUrl,
            method: 'GET'
          })

          const firstImage = media.items.find(m => m.mediaType === 'Image')?.url || null

          return { ...item, firstImage }
        } catch (e) {
          return { ...item, firstImage: null }
        }
      })
    )

    newsItems.value = withImages
    hasMore.value = res.items.length === pageSize
  } catch (err) {
    console.error('Fetch Error:', err)
  } finally {
    loader.value = false
  }
}

// البحث بدالة موقّتة (debounced)
const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1
  fetchNews()
}, 500)

const onSearch = () => {
  debouncedSearch()
}

// التنقل بين الصفحات
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

// عند الضغط على كارت الخبر
const navigateToNews = (id) => {
  router.push(`/news/${id}`)
}

onMounted(fetchNews)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
