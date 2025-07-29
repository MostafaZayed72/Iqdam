<template>
  <div class="p-6 max-w-4xl mx-auto text-center space-y-6">
    <!-- النص التعريفي -->
    <h1 class="text-3xl font-bold mb-4">{{ $t('About us') }}</h1>
    <p class="text-lg leading-relaxed">{{ $t('Iqdam Educational Academy is a comprehensive institution dedicated to developing students academically and morally through exceptional educational programs in Arabic, English, Mathematics, Physics, and Chemistry. The academy offers a full daily boarding system for students, including healthy nutrition and proper rest. It also places great emphasis on recreational activities and educational trips that enrich the spirit and expand experiences. The academy is committed to character building through programs that nurture ethics and behavior, promoting values of self-reliance and discipline. Its mission is to enhance students’ abilities and personal skills, enabling them to become impactful and active members of their communities.') }}</p>

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
    ? 'https://www.youtube.com/embed/3EWtH2NoSW0'
    : 'https://www.youtube.com/embed/QrKr-0yg50g'
})
</script>
