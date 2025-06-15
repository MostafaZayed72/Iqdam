<template>
    <div class="relative pt-10">
      <!-- صورة القسم كخلفية -->
      <div
        class="relative h-64 md:h-screen bg-cover bg-center flex items-center justify-center"
        :style="{ backgroundImage: `url(${department.imageUrl})` }"
      >
        <h1 class="text-white text-4xl font-bold bg-gray-600 bg-opacity-50 p-4 rounded-full">
          {{ department.titleAr }}
        </h1>
      </div>
  
      <!-- وصف القسم -->
      <div class="p-8 text-center">
        <p class="text-lg text-gray-700">{{ department.descriptionAr }}</p>
      </div>
  
      <!-- عرض الفروع -->
      <div class="space-y-8 p-8">
        <div
          v-for="(division, index) in divisions"
          :key="division.id"
          class="flex flex-col items-center"
        >
          <!-- عنوان الفرع -->
          <h3 class="text-2xl font-semibold">{{ division.titleAr }}</h3>
  
          <!-- صورة الفرع -->
          <img
            :src="division.imageUrl || 'https://via.placeholder.com/150'"
            :alt="division.titleAr"
            class="w-48 h-48 md:w-[50%] md:h-[400px] object-cover mt-4 mb-4 rounded-xl"
          />
  
          <!-- وصف الفرع -->
          <p class="text-gray-600 text-center">{{ division.descriptionAr }}</p>
  
          <!-- خط فاصل بين الفروع، لكن لا يظهر في آخر عنصر -->
          <hr v-if="index < divisions.length - 1" class="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const department = ref({});
  const divisions = ref([]);
  
  // جلب بيانات القسم
  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/Departments/GetDepartmentById?id=${route.params.id}`);
      department.value = response.data;
    } catch (error) {
      console.error('Error fetching department:', error);
    }
  };
  
  // جلب بيانات الفروع
  const fetchDivisions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/Divisions/GetDivisionsByDepartmentId?DepartmentId=${route.params.id}`);
      divisions.value = response.data.data;
    } catch (error) {
      console.error('Error fetching divisions:', error);
    }
  };
  
  // استدعاء البيانات عند تحميل الكومبوننت
  onMounted(() => {
    fetchDepartment();
    fetchDivisions();
  });
  </script>
  
  <style scoped>
  .bg-cover {
    background-size: cover;
    background-position: center;
  }
  </style>
  