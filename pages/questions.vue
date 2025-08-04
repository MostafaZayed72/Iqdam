<template>
 <div style="background-image: url('/imgs/backgrounds/vision.png'); min-height: 100vh; background-size: cover"
>
   <div class="p-4 max-w-4xl mx-auto">
    <h1 class="text-center mt-4 mb-10 text-3xl bg-second py-2 rounded-full text-one">
      {{ $t('Important questions') }}
    </h1>

    <AccordionList :items="selectionCriteria" v-model="activeItem" />
  </div>
 </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const activeItem = ref(null);

const selectionCriteria = computed(() => [
  {
    title: t("Where is Iqdam Academy located?"),
    description: t("Iqdam Academy is located in the Sultanate of Oman, in the Muscat Governorate."),
  },
  {
    title: t("What is the goal of the Iqdam Academy program?"),
    description: t(`Enhancing Arabic language proficiency:
1. Immersive daily practice within an Arabic-speaking environment

2. Strengthening academic performance in core subjects (Mathematics, Physics, Chemistry, English) through structured teaching plans

3. Instilling moral and behavioral values via Quranic sessions and educational programs that promote ethics, respect, discipline, and teamwork

4. Encouraging independence and self‑reliance through residential living, teaching students to manage daily personal tasks autonomously

5. Developing personal and life skills: communication, leadership, critical thinking, problem‑solving, and time management

6. Preparing students for academic excellence with an encouraging environment, individual attention, and ongoing progress evaluation

7. Building a balanced and confident personality by combining academics, recreational activities, educational trips, and real‑life scenarios`),
  },
  {
    title: t("How long is the program?"),
    description: t("The program is divided into three levels, each lasting three months. Upon successful completion of one level, the student progresses to the next."),
  },
  {
    title: t("Does the academy provide accommodation for parents?"),
    description: t("Yes, the academy can provide housing for parents wishing to stay in Oman, and may assist with visa arrangements for them."),
  },
  {
    title: t("Does the program include accommodation and meals?"),
    description: t("Yes, the program includes secure internal accommodation with three meals per day, plus housekeeping and continuous supervision."),
  },
  {
    title: t("What age group is targeted?"),
    description: t("The program is designed for students aged 13 to 19."),
  },
  {
    title: t("What curriculum is used for teaching Arabic?"),
    description: t("The program uses internationally recognized curricula for Arabic as a second language, enhanced with audio‑visual materials, interactive apps, and communicative activities."),
  },
  {
    title: t("Does the student receive a certificate upon program completion?"),
    description: t("Yes, students receive an accredited certificate from the academy specifying their completed level and number of study hours."),
  },
  {
    title: t("Are placement tests conducted?"),
    description: t("Yes, a placement test is given before starting the program, and retaken after each level to track progress."),
  },
  {
    title: t("What extracurricular activities are offered?"),
    description: t("Includes educational and cultural trips, field visits, sports and recreational activities like swimming, football, fitness, and language‑cultural meetings with Arabic speakers."),
  },
  {
    title: t("What courses and subjects does the student study?"),
    description: t(`Academic subjects:
Arabic – Quran – Prophetic Hadith – Seerah – Islamic Jurisprudence – English – Mathematics – Physics – Chemistry

Training courses:
• Personal development: effective communication, time management, and task organization
• Emotional intelligence and interpersonal skills for better self‑awareness and relationships`),
  },
  {
    title: t("Is the program safe for international students?"),
    description: t("Yes, the academy provides 24‑hour supervision, emergency medical services, and continuous monitoring to ensure student well‑being."),
  },
  {
    title: t("Can students keep in touch with their families during the program?"),
    description: t("Yes, students can use the internet provided in the residence to contact their families at any time."),
  },
  {
    title: t("Does the academy accept students from all countries?"),
    description: t("Yes, the academy welcomes students from around the world and offers linguistic and cultural support to help them adapt."),
  },
  {
    title: t("Is airport pickup available?"),
    description: t("Yes, airport pickup can be arranged from the airport to the academy premises for international arrivals."),
  },
  {
    title: t("Does the academy provide a visa to Oman?"),
    description: t("Yes, the academy issues a one‑year entry visa for students from outside Oman, valid for the full duration of the program."),
  },
  {
    title: t("What trip destinations are planned by the academy?"),
    description: t(`The academy organizes:
1. Weekly in‑country trips to Omani attractions like the Green Mountain, Oman Through Time Museum, and event sites
2. Periodic trips after each level outside Oman to places like Mecca, Medina, and the UAE.`),
  },
  {
    title: t("What are the program costs?"),
    description: t("We strive to make our programs affordable for all. Fees are carefully structured to accommodate various financial situations so that education remains accessible without being a burden."),
  }
]);


</script>
