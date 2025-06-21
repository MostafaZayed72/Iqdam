<template>
  <div class="p-4 max-w-7xl mx-auto mt-40">
    <!-- التبويبات -->
    <div class="flex border-b mb-6">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        :class="[
          'py-2 px-4 font-bold',
          activeTab === index ? 'border-b-4 border-primary text-primary bg-second rounded-xl' : 'text-gray-500'
        ]"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- المحتوى -->
    <div>
      <div v-if="activeTab === 0">
        <!-- البرامج الترفيهية -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(program, idx) in entertainmentPrograms"
            :key="'entertainment-' + idx"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img :src="program.image" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-xl font-bold mb-2 text-primary">{{ program.title }}</h3>
              <p class="text-gray-600 text-sm">{{ program.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 1">
        <!-- البرامج التعليمية -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(program, idx) in educationalPrograms"
            :key="'educational-' + idx"
            class="card rounded-lg shadow-lg overflow-hidden"
          >
            <img :src="program.image" class="w-full h-48 rounded-xl" />
            <div class="p-4">
              <h3 class="text-xl font-bold mb-2 text-primary">{{ program.title }}</h3>
              <p class=" text-sm">{{ program.description }}</p>
            </div>
          </div>
      </div>
      <h1 class="text-center mx-auto w-full mt-10">{{ $t('Our education is project-based, with monthly projects within each subject, and all subjects integrated into one project. We encourage teamwork, innovation, and personal and social development. There are social skills development courses, programs for values ​​and positive behavior, as well as workshops for time management, problem solving, and leadership.') }}</h1>        </div>

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
    title: t('Home'),
    description: t('entertainment.trip.description'),
    image: '/imgs/entertainment1.jpg'
  },
  {
    title: t('entertainment.games.title'),
    description: t('entertainment.games.description'),
    image: '/imgs/entertainment2.jpg'
  },
  {
    title: t('entertainment.art.title'),
    description: t('entertainment.art.description'),
    image: '/imgs/entertainment3.jpg'
  }
])

// البرامج التعليمية
const educationalPrograms = computed(() => [
  {
    title: t('International program for european students'),
    description: t('Aligning Omani curricula with European standards, special support in languages ​​(Arabic and English), and support units in mathematics and science (in English).'),
    image: 'https://mitests.com/storage/uploads/all/otp2BqvwW47FRrsU1mQ3jKhOvXfSYwp1rBogMwYI.jpg'
  },
  {
    title: t('Learn Arabic for non-native speakers'),
    description: t('Through modern and interactive curricula, realistic communication activities, and life situations, at various levels (beginner - intermediate - advanced). We also offer programs for parents (upon request).'),
    image: 'https://almawsoa.com/wp-content/uploads/2024/02/n7zZcBQ_result-1024x576.webp'
  },
  {
    title: t('Support for basic educational materials'),
    description: t('Mathematics (flexible curricula combining Arabic and English), Physics and Chemistry (equipped laboratories and experimental activities), Geography (interactive project-based lessons), English (developing reading, writing, speaking and listening)'),
    image: 'https://static1.squarespace.com/static/64959c1091617327d9ef78bf/t/654ceefbbd1786097329890c/1699540731776/Squarespace+Homepage+-+2023-11-09T143824.163.png?format=1500w'
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
