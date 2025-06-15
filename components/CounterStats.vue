<script setup>
import { ref, onMounted } from 'vue';

// القيم الأولية للعدادات
const visitorsCount = ref(0);
const customersCount = ref(0);
const moneyCount = ref(0);

// الأرقام النهائية التي نريد الوصول إليها
const targetVisitors = 12345;
const targetCustomers = 987;
const targetMoney = 1000520;

// مدة الأنيميشن (ثواني)
const duration = 3;

const startCounter = (target, countRef) => {
  const startTime = Date.now();

  const animateCounter = () => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    if (elapsedTime < duration) {
      countRef.value = Math.floor((target * elapsedTime) / duration);
      requestAnimationFrame(animateCounter);
    } else {
      countRef.value = target;
    }
  };

  animateCounter();
};

onMounted(() => {
  startCounter(targetVisitors, visitorsCount);
  startCounter(targetCustomers, customersCount);
  startCounter(targetMoney, moneyCount);
});
</script>

<template>
  <div class="flex flex-col md:flex-row justify-center items-center gap-8"  >
    <!-- دائرة الزوار -->
    <div class="stat-item border-2 border-gray-400 md:py-8   w-[70%]  md:w-fit md:px-4 text-center rounded">
      <div class="stat-content text-white ">
        <div class="md:text-2xl font-bold">+{{ visitorsCount }}</div>
        <div class="text-gray-400">{{ $t('Completed Mega Projects') }}</div>
      </div>
    </div>

    <!-- دائرة العملاء -->
    <div class="stat-item border-2 border-gray-400 md:py-8   w-[70%]  md:w-fit md:px-10 text-center rounded">
      <div class="stat-content text-white ">
        <div class="md:text-2xl font-bold">+{{ customersCount }}</div>
        <div class="text-gray-400">{{ $t('Years of Experience') }}</div>
      </div>
    </div>
    <!-- دائرة العملاء -->
    <div class="stat-item border-2 border-gray-400 md:py-8   w-[70%]  md:w-fit md:px-4 text-center rounded">
      <div class="stat-content text-white ">
        <div class="md:text-2xl font-bold">+{{ moneyCount }}</div>
        <div class="text-gray-400">{{ $t('Billion SARActive Projects Value') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* تصميم الدوائر */

</style>
