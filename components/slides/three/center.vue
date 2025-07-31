<template>
  <div>
    <NuxtImg 
      :src="currentImage" 
      class="w-full h-screen" 
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, onMounted, onUnmounted, watch } from 'vue';

const { locale } = useI18n();
const currentImage = ref('');

const updateImage = () => {
  const isSmallScreen = window.innerWidth <= 768;

  if (locale.value === 'ar') {
    currentImage.value = isSmallScreen 
      ? '/imgs/home/visionmoar.png'   // عربي + شاشة صغيرة
      : '/imgs/home/vision.png'; // عربي + شاشة كبيرة
  } else {
    currentImage.value = isSmallScreen 
      ? '/imgs/home/visionmoen.png'   // إنجليزي + شاشة صغيرة
      : '/imgs/home/visionen.png'; // إنجليزي + شاشة كبيرة
  }
};

onMounted(() => {
  updateImage();
  window.addEventListener('resize', updateImage);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateImage);
});

// 👇 هنا نراقب تغيير اللغة
watch(locale, () => {
  updateImage();
});
</script>
