<template>
  <div style="background-image: url('/imgs/backgrounds/تواصل معنا.png'); min-height: 100vh; background-size: cover">
    <div class="p-4 max-w-7xl mx-auto">
      <!-- البرامج الترفيهية -->
      <div class="grid grid-cols-1 gap-6">
        <div 
          v-for="(program, idx) in entertainmentPrograms" 
          :key="'entertainment-' + idx"
          class="card rounded-lg shadow-lg overflow-hidden bg-second"
        >
          <NuxtImg :src="program.image" class="w-full h-48 md:h-[400px]" />
          <div class="p-4">
            <div class="flex items-center justify-center gap-3 mb-2">
              <NuxtImg 
                :src="program.icon"  
                class="w-8 h-8" 
              />
              <h3 class="text-3xl font-bold text-one text-center">{{ program.title }}</h3>
            </div>
            <p class="text-xl font-bold text-center">{{ program.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// البرامج الترفيهية
const entertainmentPrograms = computed(() => [
  {
    title: t('High-quality and purposeful education'),
    description: t('We focus on providing high-quality educational content based on scientific and systematic foundations to achieve the best results for learners. Subjects like Arabic, English, Mathematics, Physics, Chemistry, and Geography are taught using modern interactive methods.'),
    image: '/imgs/features/1.png',
    icon: '/imgs/features/reading-book.png'
  },
  {
    title: t('Qualified teaching staff'),
    description: t('A team of specialized teachers with high competence, using modern teaching and assessment methods to ensure effective learning.'),
    image: '/imgs/features/3.png',
    icon: '/imgs/features/school.png'
  },
  {
    title: t('Modern teaching technologies'),
    description: t('We use interactive and technological tools such as videos, educational platforms, and visual presentations to enhance understanding and facilitate learning.'),
    image: '/imgs/features/5.png',
    icon: '/imgs/features/technology.png'
  },
  {
    title: t('Continuous student support'),
    description: t('We provide a supportive environment that includes academic guidance and psychological support to motivate students and help them achieve success and excellence.'),
    image: '/imgs/features/7.png',
    icon: '/imgs/features/handshake.png'
  },
  {
    title: t('Diverse and customized programs'),
    description: t('We offer educational pathways tailored to individual differences in abilities or goals, with a special focus on developing life and cognitive skills.'),
    image: '/imgs/features/9.png',
    icon: '/imgs/features/training-program.png'
  },
  {
    title: t('Authentic educational values'),
    description: t('We instill positive values such as discipline, perseverance, commitment, and teamwork throughout the educational experience.'),
    image: '/imgs/features/11.png',
    icon: '/imgs/features/kindness.png'
  },
  {
    title: t('Accommodation in a private academy resort'),
    description: t('Providing food, drinks, and accommodation for the student, staying within a fully integrated educational resort offers a unique experience that combines comfort, education, and proper nutrition. It provides a safe and well-equipped environment that helps students focus on their studies and develop their skills in a calm and comfortable atmosphere. The resort includes comfortable, air-conditioned accommodation with healthy and varied meals that meet students’ daily nutritional needs. Clean water and beverages are available throughout the day, along with specialized educational programs aimed at developing academic and behavioral skills. This feature ensures mental and psychological stability for students, positively reflecting on their academic achievement and personal growth.'),
    image: '/imgs/features/77.png',
    icon: '/imgs/features/programs.png'
  }
])
</script>

<style scoped>
.text-one {
  color: #1d4ed8;
}
</style>
