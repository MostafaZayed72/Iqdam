<template>
  <div class="p-4 max-w-4xl mx-auto ">
    <!-- التبويبات -->
    <div class="flex border-b mb-6 justify-center space-x-4 rtl:space-x-reverse">
      <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = index; activeItem = null" :class="[
        'py-2 px-4 font-bold',
        activeTab === index
          ? 'border-b-4 border-primary text-primary bg-second rounded-xl'
          : 'text-gray-500'
      ]">
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
    title: t('High scientific efficiency'),
    description: t('The teaching team holds advanced academic qualifications and is committed to continuous self-development in their areas of expertise')
  },
  {
    title: t('Innovative teaching methods'),
    description: t('Teachers use modern teaching strategies based on interaction, motivation, and active learning')
  }
  ,
  {
    title: t('Individual care for students'),
    description: t('The teacher cares for each student individually, and follows up on his academic and behavioral level in a supportive and motivating manner')
  }
  ,
  {
    title: t('Moral and educational values'),
    description: t('Teachers have a sense of responsibility and discipline and believe in their educational mission to build a distinguished, aware generation')
  }
  ,
  {
    title: t('Effective communication with parents'),
    description: t('Teachers maintain a constant and professional communication channel with parents to ensure the integrity of the educational process')
  }
])

const selectionCriteria = computed(() => [
  {
    title: t('Verification of academic qualifications'),
    description: t('Academic credentials and specializations are carefully verified to ensure specialization and competence')
  },
  {
    title: t('Choosing educational competence'),
    description: t('The candidate undergoes assessment tests in teaching methods, classroom management, and dealing with different student styles')
  }
  ,
  {
    title: t('Accurate personal interviews'),
    description: t('We conduct interviews that measure personality, communication style, ethical values, and the ability to positively influence students')
  }
  ,
  {
    title: t('Trial and evaluation period'),
    description: t('The teacher is given a realistic trial period during which his performance in the classroom is evaluated by educational supervisors')
  }
  ,
  {
    title: t('Continuous training and development'),
    description: t('Even after selection, teachers are required to attend regular training workshops and professional development programs')
  }
  ,
  {
    title: t("Alignment with the Academy's vision"),
    description: t("We ensure that the teacher is in line with the Academy's philosophy and educational mission in building an educated and leading generation")
  }
])
</script>
