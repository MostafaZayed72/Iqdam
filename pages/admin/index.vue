<template>
  <div class="min-h-screen flex flex-col items-center justify-center space-y-6"
    style="background-image: url('/imgs/backgrounds/صفحة التسجيل.png'); min-height: 100vh; background-size: cover">
    <h1 class="text-2xl font-bold mb-6 bg-yellow-300 rounded-full px-10 py-1 text-black">لوحة التحكم</h1>

    <button @click="goToNews" class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
      إدارة الأخبار
    </button>

    <button @click="goToRegistration"
      class="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
      إدارة التسجيلات
    </button>
  </div>
</template>

<script setup>
const goToNews = () => {
  navigateTo('/admin/news')
}

const goToRegistration = () => {
  navigateTo('/admin/regestration')
}
</script>
