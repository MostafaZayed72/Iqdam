<template>
  <div class="relative flex flex-col items-center justify-end min-h-screen bg-gray-100" style="background-image: url('/imgs/backgrounds/about.png'); min-height: 100vh; background-size: cover">
    
    <!-- الصورة -->
    <NuxtImg 
      :src="currentImage" 
      alt="أسعار الاشتراك" 
      class=" top-0 left-0 w-full h-full object-cover"
    />

    <!-- الزر -->
    <button
      @click="navigateTo('/registration')"
      class=" z-10 mb-6 bg-second text-black px-6 py-3 rounded-lg text-lg font-bold hover:bg-opacity-90 transition"
    >
      {{ locale === 'ar' ? 'اشترك الآن' : 'Register Now' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentImage = ref('');

const updateImage = () => {
  const isMobile = window.innerWidth <= 768;

  if (locale.value === 'ar') {
    currentImage.value = isMobile 
      ? '/imgs/الجداول/2.png'    // موبايل عربي
      : '/imgs/الجداول/4.png';  // ديسكتوب عربي
  } else {
    currentImage.value = isMobile 
      ? '/imgs/الجداول/1.png'    // موبايل إنجليزي
      : '/imgs/الجداول/5.png';  // ديسكتوب إنجليزي
  }
};

onMounted(() => {
  updateImage();
  window.addEventListener('resize', updateImage);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateImage);
});

watch(locale, () => {
  updateImage();
});
</script>
