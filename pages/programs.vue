<template>
 <div style="background-image: url('/imgs/2.png'); min-height: 100vh; background-size: cover">
   <div class="p-4 max-w-7xl mx-auto"  >
    <!-- التبويبات -->
    <div class="flex border-b mb-6">
      <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = index" :class="[
        'py-2 px-4 font-bold',
        activeTab === index ? 'border-b-4 border-primary text-primary bg-second rounded-xl' : 'text-gray-500'
      ]">
        {{ tab.name }}
      </button>
    </div>

    <!-- المحتوى -->
    <div>
      <div v-if="activeTab === 0">
        <!-- البرامج الترفيهية -->
        <div class="grid grid-cols-1  gap-6">
          <div v-for="(program, idx) in entertainmentPrograms" :key="'entertainment-' + idx"
            class="card rounded-lg shadow-lg overflow-hidden bg-white">
            <img :src="program.image" class="w-full h-48 md:h-[400px] " />
            <div class="p-4">
              <h3 class="text-3xl font-bold mb-2 text-primary">{{ program.title }}</h3>
              <p class="text-xl">{{ program.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 1">
        <!-- البرامج التعليمية -->
        <div class="grid grid-cols-1  gap-6">
          <div v-for="(program, idx) in educationalPrograms" :key="'educational-' + idx"
            class="card rounded-lg shadow-lg overflow-hidden bg-white">
            <img :src="program.image" class="w-full h-48 md:h-[400px] " />
            <div class="p-4">
              <h3 class="text-3xl font-bold mb-2 text-primary text-center">{{ program.title }}</h3>
              <p class=" text-xl font-bold text-center">{{ program.description }}</p>
            </div>
          </div>
        </div>
        <h1  class="text-center text-blue-950 mx-auto w-full mt-10 text-xl font-bold bg-second p-2 rounded-xl">{{ $t('Our education is project-based, with monthly projects within each subject, and all subjects integrated into one project.We encourage teamwork, innovation, and personal and social development.There are social skills development courses, programs for values ​​and positive behavior, as well as workshops for time management, problem solving, and leadership.') }}</h1>
      </div>

    </div>
  </div>
 </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeTab = ref(0)

// التبويبات
const tabs = computed(() => [
  { name: t('Entertainment programs') },
  { name: t('Educational programs') }
])

// البرامج الترفيهية
const entertainmentPrograms = computed(() => [
  {
    title: t('Educational and recreational trips'),
    description: t('The Academy organizes educational and recreational trips to cultural and natural sites within the Sultanate of Oman to enhance real-life learning'),
    image: 'https://tripsegypt.net/storage/6614/conversions/rixos-seagate-sharm-ultra-all-inclusive-webp.webp'
  },
  {
    title: t('Artistic and theatrical activities'),
    description: t('Workshops for drawing, theater, and Arabic calligraphy develop creativity and reveal students talents in a fun environment'),
    image: 'https://static.sayidaty.net/styles/1375_scale/public/2024-10/383534.jpg?VersionId=BEu3tFxdzLPnMZqp2_lWK5toc1m97xI.'
  },
  {
    title: t('Sporting events and competitions'),
    description: t('Organizing internal and external tournaments in various sports (football, tennis, tug of war) to enhance sportsmanship and teamwork'),
    image: 'https://copew.uobaghdad.edu.iq/wp-content/uploads/sites/23/2023/08/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A9-scaled.jpg'
  },
  {
    title: t('Skill and hobby clubs'),
    description: t('Reading, programming, chess, and robotics clubs develop mental skills and break the study routine'),
    image: 'https://static.sayidaty.net/styles/1375_scale/public/2024-01/313989.jpg'
  },
  {
    title: t('Open days and student exhibitions'),
    description: t('Organizing open recreational days where students projects are displayed, with interactive activities for parents and students together'),
    image: 'https://national.alhussan.edu.sa/userfiles/Open%20day%20(13)_912801767.jpg'
  }
])

// البرامج التعليمية
const educationalPrograms = computed(() => [
  {
    title: t('International program for european students'),
    description: t('Aligning Omani curricula with European standards, special support in languages ​​(Arabic and English), and support units in mathematics and science (in English).'),
    image: '/programs/international-program.png'
  },
  {
    title: t('Learn Arabic for non-native speakers'),
    description: t('Through modern and interactive curricula, realistic communication activities, and life situations, at various levels (beginner - intermediate - advanced). We also offer programs for parents (upon request).'),
    image: '/programs/تعلم اللغة العربية لغير الناطقين بها.png'
  },
  {
    title: t('Support for basic educational materials'),
    description: t('Mathematics (flexible curricula combining Arabic and English), Physics and Chemistry (equipped laboratories and experimental activities), Geography (interactive project-based lessons), English (developing reading, writing, speaking and listening)'),
    image: '/programs/دعم المواد التعليمية الأساسية.png'
  }
])
</script>


<style scoped>
.border-primary {
  border-color: #1d4ed8;
}

.text-primary {
  color: #1d4ed8;
}
</style>
