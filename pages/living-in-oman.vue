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
    title: 'أهمية الإقامة والأمان في سلطنة عمان',
    description: `1. بيئة آمنة ومستقرة
عُمان تُعد من أكثر الدول أمانًا واستقرارًا سياسيًا في المنطقة، مما يوفر بيئة مطمئنة للطلاب وأسرهم.

2. نظام تعليمي متطور
تتميز المؤسسات التعليمية في عُمان بجودة التعليم واعتماد مناهج حديثة تتماشى مع المعايير الدولية.

3. تنوع ثقافي وتسامح ديني
يعيش في السلطنة مجتمع متعدد الجنسيات يتميز بالتسامح والاحترام، مما يعزز من تجربة التعلم والانفتاح الثقافي.

4. تكاليف معيشة معتدلة
مقارنةً بدول الخليج الأخرى، توفر عُمان مستوى معيشة جيد بتكاليف مناسبة للطلاب والعائلات.

5. لغة عربية رسمية وإنجليزية واسعة الانتشار
تُعد السلطنة بيئة مثالية لتعلّم اللغة العربية، مع استخدام واسع للغة الإنجليزية في التعليم والمجتمع.

6. موقع جغرافي استراتيجي
موقع عُمان يجعلها بوابة مهمة للمنطقة، وتتيح سهولة الوصول إلى أسواق ودول متعددة.`
  }
]);
</script>
