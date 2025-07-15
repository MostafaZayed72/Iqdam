<template>
  <div class="p-8 mt-48">
    <h1 class="text-2xl font-bold mb-4">📸 المعرض</h1>

    <div v-if="loading" class="text-blue-500">جارٍ تحميل الصور والفيديوهات...</div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" v-else>
      <div v-for="item in media" :key="item.url">
        <img v-if="item.type === 'image'" :src="item.url" class="rounded shadow" />
        <video v-else-if="item.type === 'video'" controls class="rounded shadow w-full">
          <source :src="item.url" />
        </video>
        <p class="text-sm text-gray-600 mt-1 truncate">{{ item.url }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true)
const media = ref([])

onMounted(async () => {
  loading.value = true
  media.value = await $fetch('/api/media')
  loading.value = false
})
</script>
