<template>
  <div>
    <h1 class="text-white text-center text-3xl font-bold ">{{ $t('Our Departments') }}</h1>
    <div class="flex justify-center items-center gap-8 flex-wrap mt-10">
      <!-- المربعات للأقسام -->
      <div 
        v-for="(section, index) in sections" 
        :key="section.id" 
        :class="sections.length === 2 ? 'col-span-2 md:col-span-1' : ''"
        class="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer w-full max-w-xs"
        @click="navigateToDepartment(section.id)"
      >
        <img :src="section.imageUrl" :alt="section.titleAr" class="w-full h-48 object-cover">
        <div class="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
          <p class=" text-lg opacity-0 group-hover:opacity-100 transition duration-300 text-center  text-primary bg-second rounded-full py-2 px-4 font-bold">
            {{ $t('Go to department') }}
          </p>
        </div>
        <div class="p-4 text-center bg-primary">
          <h3 class="text-lg font-semibold">{{ section.titleAr }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const sections = ref([]);
const router = useRouter();

// جلب البيانات من API
const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/Departments/GetDepartments`);
    sections.value = response.data.data; // تخزين البيانات في المتغير
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
};

// التوجيه عند الضغط على المربع
const navigateToDepartment = (id) => {
  router.push(`/departments/${id}`);
};

// استدعاء الدالة عند تحميل الكومبوننت
onMounted(fetchDepartments);
</script>

<style scoped>
.group:hover .group-hover\:bg-opacity-80 {
  background-color: rgba(0, 0, 0, 0.8);
}

/* تأكد من أن النص يظهر عند الـ hover */
.group:hover .group-hover\:opacity-100 {
  opacity: 1 !important;
}
</style>
