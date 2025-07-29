<template>
  <div class="py-12 px-4 min-h-screen mt-48">
    <!-- عنوان الصفحة -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-yellow-600 bg-yellow-100 inline-block px-6 py-2 rounded-lg shadow">
        {{$t('Parent services')}}
      </h1>
    </div>

    <!-- شبكة البطاقات -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
      <!-- بطاقة 1 -->
      <div class="bg-second rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
        <img src="https://cdn-icons-png.flaticon.com/512/2972/2972203.png" class="w-20 mx-auto mb-4" alt="تقارير دورية" />
        <h2 class="text-xl font-semibold mb-2">{{$t('Periodic reports and academic follow-up')}}</h2>
        <p class="text-gray-600 font-bold">{{$t('Submit detailed reports on academic performance on a regular basis.')}}</p>
      </div>

      <!-- بطاقة 2 -->
      <div class="bg-second rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
        <img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" class="w-20 mx-auto mb-4" alt="مقابلات مع المعلمين" />
        <h2 class="text-xl font-semibold mb-2">{{$t('Personal interviews with teachers')}}</h2>
        <p class="text-gray-600 font-bold">{{$t('Providing the opportunity to meet directly with teachers to follow up on children.')}}</p>
      </div>

      <!-- بطاقة 3 -->
      <div class="bg-second rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
        <img src="https://cdn-icons-png.flaticon.com/512/927/927567.png" class="w-20 mx-auto mb-4" alt="ترجمة المناهج" />
        <h2 class="text-xl font-semibold mb-2">{{$t('Translation of curricula and lessons')}}</h2>
        <p class="text-gray-600 font-bold">{{$t('Translate educational content when needed to ensure full understanding.')}}</p>
      </div>

      <!-- بطاقة 4 -->
      <div class="bg-second rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
        <img src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png" class="w-20 mx-auto mb-4" alt="دعم نفسي" />
        <h2 class="text-xl font-semibold mb-2">{{$t('Psychological and social support for children')}}</h2>
        <p class="text-gray-600 font-bold">{{$t('Providing psychosocial support sessions to promote mental health.')}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// لا حاجة لمنطق حاليًا
</script>
