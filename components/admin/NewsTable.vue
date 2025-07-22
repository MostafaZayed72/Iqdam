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
    <table class="w-full border">
      <thead>
        <tr class="bg-gray-200 text-center">
          <th class="p-2 border">#</th>
          <th class="p-2 border">العنوان (عربي)</th>
          <th class="p-2 border">تاريخ النشر</th>
          <th class="p-2 border">الوسائط</th>
          <th class="p-2 border">إجراءات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(news, index) in newsItems" :key="news.id" class="text-center">
          <td class="border p-2">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
          <td class="border p-2">{{ news.titleAr || '—' }}</td>
          <td class="border p-2">{{ formatDate(news.publishDate) }}</td>
          <td class="border p-2">
            <button @click="viewMedia(news.id)" class="text-blue-600 underline">عرض الوسائط</button>
          </td>
          <td class="border p-2">
            <button @click="deleteNews(news.id)" class="text-red-600 hover:underline">🗑 حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-center items-center mt-4 space-x-4">
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
      <div class="grid grid-cols-3 gap-4">
        <div v-for="item in media" :key="item.id" class="border p-2 rounded">
          <template v-if="item.mediaType === 'Image'">
            <img :src="item.url" class="w-full h-32 object-cover rounded" />
          </template>
          <template v-else>
            <iframe :src="item.url" class="w-full h-32" frameborder="0" allowfullscreen></iframe>
          </template>
          <p class="text-sm mt-1">{{ item.captionAr || 'بدون عنوان' }}</p>
        </div>
      </div>
    </div>
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

const config = useRuntimeConfig()

// جلب الأخبار
const fetchNews = async () => {
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
  hasMore.value = response.items.length === pageSize // لو رجع عدد يساوي الحد، فغالبًا في المزيد
}

// بحث فوري
const onSearch = () => {
  currentPage.value = 1
  fetchNews()
}

// جلب الوسائط الخاصة بالخبر
const viewMedia = async (newsId) => {
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
}

// حذف خبر
const deleteNews = async (id) => {
  if (!confirm('هل أنت متأكد من حذف هذا الخبر؟')) return
  try {
    await $fetch(`/api/NewsItems/Delete?id=${id}`, {
      baseURL: config.public.baseUrl,
      method: 'DELETE',
    })
    fetchNews()
  } catch (err) {
    alert('فشل في الحذف')
  }
}

// Pagination
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

// تنسيق التاريخ
const formatDate = (date) => {
  const d = new Date(date)
  return isNaN(d.getTime()) ? 'غير متوفر' : d.toLocaleDateString()
}

// عرض عام
onMounted(() => {
  fetchNews()
})

// تعريض الدالة علشان تنادى من parent
defineExpose({ fetchNews })
</script>
