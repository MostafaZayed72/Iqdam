<template>
  <div class="p-4 max-w-4xl mx-auto mt-40">
    <!-- التبويبات -->
    <div class="flex border-b mb-6 justify-center space-x-4 rtl:space-x-reverse">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index; activeItem = null"
        :class="[
          'py-2 px-4 font-bold',
          activeTab === index
            ? 'border-b-4 border-primary text-primary bg-second rounded-xl'
            : 'text-gray-500'
        ]"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- محتوى التبويبات -->
    <div>
      <div v-if="activeTab === 0">
        <AccordionList :items="teacherAdvantages" v-model="activeItem" />
      </div>

      <div v-else-if="activeTab === 1">
        <AccordionList :items="selectionCriteria" v-model="activeItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AccordionList from '@/components/AccordionList.vue' // تأكد من المسار حسب المشروع

const { t } = useI18n()

const activeTab = ref(0)
const activeItem = ref(null)

const tabs = computed(() => [
  { name: t('Teachers Advantages') },
  { name: t('How We Select Teachers?') }
])

const teacherAdvantages = computed(() => [
  {
    title: t('Educational and teaching experience'),
    description: t('Teachers have extensive field experience in dealing with different educational levels and student needs')
  },
  {
    title: t('Experienced'),
    description: t('They have years of experience in interactive and modern teaching methods.')
  },
  {
    title: t('Passionate and Friendly'),
    description: t('We prioritize hiring educators who are passionate and create a safe learning environment.')
  }
])

const selectionCriteria = computed(() => [
  {
    title: t('Screening and Evaluation'),
    description: t('We evaluate teachers through interviews, tests, and real classroom simulations.')
  },
  {
    title: t('Continuous Training'),
    description: t('Teachers receive ongoing training and development in pedagogy and technology.')
  },
  {
    title: t('Feedback Driven'),
    description: t('We assess teacher performance through regular student and parent feedback.')
  }
])
</script>
