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
    title: 'أين تقع أكاديمية إقدام ؟',
    description: 'تقع أكاديمية إقدام في سلطنة عمان في ولاية مسقط',
  },
  {
    title: 'ما هو الهدف من برنامج أكاديمية إقدام ؟',
    description: `رفع الكفاءة اللغوية في اللغة العربية
1. من خلال معايشة يومية وممارسة عملية داخل بيئة ناطقة وداعمة لتعلّم اللغة العربية

2. تقوية الطالب أكاديميًا في المواد الأساسية
خاصة في الرياضيات، الفيزياء، الكيمياء، واللغة الإنجليزية ، عبر خطط تدريسية مدروسة 

3. غرس القيم الإيمانية التربوية والسلوكية
من خلال الحلقات القرانية و البرامج التربوية الموجهة لتعزيز الأخلاق، والاحترام، والانضباط، والعمل الجماعي

4. تعزيز الاستقلالية والاعتماد على النفس
عبر نظام الإقامة، يتعلم الطالب ترتيب أموره الشخصية والاعتماد على ذاته في المهام اليومية

5. تنمية المهارات الشخصية والحياتية
مثل مهارات التواصل، القيادة، التفكير النقدي، حل المشكلات، وإدارة الوقت

6. تهيئة الطالب للتفوق الدراسي والتحصيل العالي
من خلال بيئة محفزة، واهتمام فردي، وتقييم مستمر لمستوى الطالب وتطوره.

7. بناء شخصية متوازنة وواثقة
عبر الدمج بين التعليم الأكاديمي، الأنشطة الترفيهية، الرحلات التعليمية، والمواقف الحياتية الواقعية`,
  },
  {
    title: 'كم مدة البرنامج؟',
    description: 'البرنامج ينقسم إلى ثلاثة مستويات ، المستوى الواحد مدته ثلاثة أشهر ينتهي الطالب من مستوى وينتقل إلى مستوى أعلى',
  },
  {
    title: 'هل توفر الأكاديمية الإقامة لأولياء الأمور ؟',
    description: 'نعم ممكن أن توفر الأكاديمية السكن لأولياء الأمور الذين يرغبون بالإقامة في سلطنة عمان مع إمكانية توفير فيزة الدخول لهم لسلطنة عمان',
  },
  {
    title: 'هل يشمل البرنامج الإقامة والطعام؟',
    description: 'نعم، البرنامج يوفر سكنًا داخليًا مريحًا ومتكاملاً مع ثلاث وجبات يوميًا، بالإضافة إلى خدمات النظافة والرقابة المستمرة.',
  },
  {
    title: 'ما هي الفئة العمرية المستهدفة؟',
    description: 'يستهدف البرنامج الطلاب من عمر 13 سنة إلى 19 سنة.',
  },
  {
    title: 'ما المنهج المستخدم في تدريس اللغة العربية؟',
    description: 'يعتمد البرنامج على مناهج عالمية معتمدة لتعليم العربية للناطقين بغيرها، مع دعم بمواد سمعية وبصرية وتطبيقات تفاعلية وأنشطة تواصلية.',
  },
  {
    title: 'هل يحصل الطالب على شهادة بعد نهاية البرنامج؟',
    description: 'نعم، يحصل الطالب على شهادة معتمدة من الأكاديمية توضح المستوى الذي أتمّه وعدد ساعات الدراسة.',
  },
  {
    title: 'هل هناك اختبارات تحديد مستوى؟',
    description: 'نعم، يتم عمل اختبار تحديد مستوى قبل بدء الدراسة، ويعاد الاختبار بعد كل مستوى لقياس التقدم',
  },
  {
    title: 'ما هي الأنشطة غير الصفية التي تُقدم للطلاب؟',
    description: `رحلات تعليمية وثقافية
زيارات ميدانية
أنشطة ترفيهية ورياضية (تعلم السباحة وكرة القدم واللياقة البدنية ..)
لقاءات لغوية مع ناطقين بالعربية`,
  },
  {
    title: 'ما هي الدورات والمواد التي يدرسها الطالب؟',
    description: `المواد الدراسية هي:
اللغة العربية ـ القران الكريم ـ الحديث الشريف ـ السيرة النبوية ـ الفقة ـ اللغة الإنجليزية ـ الرياضيات ـ الفيزياء ـ الكيمياء

الدورات التدريبية هي:
أولاً: تطوير الذات والمهارات الشخصية
1. مهارات التواصل الفعال - لتعلم التحدث بثقة والاستماع الجيد والتعبير عن الذات
2. إدارة الوقت وتنظيم المهام - لبناء روتين ناجح وزيادة الإنتاجية
3. الذكاء العاطفي والتعامل مع الآخرين - لفهم الذات والآخرين وتحسين العلاقات`,
  },
  {
    title: 'هل البرنامج آمن للطلاب الدوليين؟',
    description: 'نعم، الأكاديمية توفر رقابة دائمة وخدمات طبية طارئة، ومشرفين على مدار الساعة لضمان سلامة الطلاب وراحتهم.',
  },
  {
    title: 'هل يمكن للطلاب التواصل مع أهاليهم خلال البرنامج؟',
    description: 'نعم، يمكن للطلاب استخدام الإنترنت المتوفر في السكن والتواصل مع أهاليهم في أي وقت.',
  },
  {
    title: 'هل الأكاديمية تستقبل الطلاب من جميع الدول؟',
    description: 'نعم، الأكاديمية تستقبل الطلاب من مختلف أنحاء العالم، وتوفر لهم الدعم اللغوي والتأقلم مع البيئة.',
  },
  {
    title: 'هل هناك توصيل من المطار إلى الأكاديمية؟',
    description: 'نعم، يمكن تنسيق خدمة الاستقبال من المطار إلى مقر الأكاديمية للطلاب القادمين من الخارج',
  },
  {
    title: 'هل الأكاديمية توفر الفيزا إلى سلطنة عمان؟',
    description: 'نعم توفر الأكاديمية للطلاب المشتركين معها من خارج سلطنة عمان تأشيرة دخول للسلطنة مدتها سنة كاملة يستطيع الطالب الإقامة بها طيلة مدة البرنامج',
  },
  {
    title: 'ما هي وجهات الرحلات المقررة في الأكاديمية؟',
    description: `تنقسم الرحلات في الأكاديمية إلى قسمين:
1. رحلات أسبوعية: للمعالم السياحية والأثرية في سلطنة عمان مثل (الجبل الأخضر ومتحف عمان عبر الزمان وأماكن الفعاليات)
2. رحلات دورية: عند انتهاء كل مستوى دراسي (كل ثلاثة أشهر) خارج سلطنة عمان مثل (مكة المكرمة والمدينة المنورة والإمارات العربية المتحدة ...)`,
  },
  {
    title: 'كم هي تكاليف الدراسة في الأكاديمية؟',
    description: 'حرصًا منا على أن يكون التعليم متاحًا للجميع، صممنا برامجنا برسوم مدروسة تراعي مختلف الأوضاع المادية، لتكون الفرصة متاحة لكل من يطمح إلى التعلم والنمو، دون أن تقف التكاليف عائقًا في طريقه',
  },
]);

</script>
