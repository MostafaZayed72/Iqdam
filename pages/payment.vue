<template>
  <section class="h-screen flex items-center justify-center  mt-10">
    <button @click="goToPayment"
      class="bg-one hover:bg-one-dark text-white text-lg font-semibold py-3 px-6 rounded-lg transition">
      {{ t('Go to payment') }}
    </button>
  </section>
</template>

<script setup>
const { t } = useI18n()

const goToPayment = () => {
  window.open('https://fato.me/v/U8ZOUXX', '_blank')
}
</script>

<style scoped>
.bg-one {
  background-color: #1d4ed8;
}

.bg-one-dark {
  background-color: #1e40af;
}
</style>
