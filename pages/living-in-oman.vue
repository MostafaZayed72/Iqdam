<template>
  <div style="background-image: url('/imgs/backgrounds/vision.png'); min-height: 100vh; background-size: cover">
    <div class="p-4 max-w-4xl mx-auto">
      <h1 class="text-center mt-4 mb-10 text-3xl bg-second py-2 rounded-full text-one">
        {{ $t('The importance of living in Oman') }}
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
    title: t('importance_title'),
    description: t('importance_description')
  }
]);

</script>
