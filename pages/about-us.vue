<template>
  <div class="p-6 max-w-4xl mx-auto text-center space-y-6">
    <!-- النص التعريفي -->
    <h1 class="text-3xl font-bold mb-4">{{ $t('about.title') }}</h1>
    <p class="text-lg leading-relaxed">{{ $t('about.description') }}</p>

    <!-- الفيديو -->
    <div class="mt-8">
      <iframe
        :src="videoUrl"
        class="w-full h-64 rounded-xl shadow-lg"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

// رابط فيديو مختلف لكل لغة
const videoUrl = computed(() => {
  return locale.value === 'ar'
    ? 'https://www.youtube.com/embed/p5ikRj2Tw-E'
    : 'https://www.youtube.com/embed/L5SvYGrji10'
})
</script>
