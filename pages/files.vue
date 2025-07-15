<template>
  <div class="p-8 mt-48">
    <h1 class="text-2xl font-bold mb-6">📸 المعرض</h1>

    <div v-if="loading" class="text-blue-500">جاري تحميل الملفات...</div>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="item in media" :key="item.id" class="rounded shadow p-2 bg-white">
        <img
          v-if="item.type === 'image'"
          :src="item.url"
          alt="صورة"
          class="w-full rounded"
        />
        <video
          v-else-if="item.type === 'video'"
          controls
          class="w-full rounded"
        >
          <source :src="item.url" />
        </video>
        <p class="text-xs mt-2 break-words text-gray-500">{{ item.url }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const media = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    media.value = await $fetch('/api/media')
  } catch (err) {
    console.error('فشل في تحميل البيانات:', err)
  } finally {
    loading.value = false
  }
})
</script>
