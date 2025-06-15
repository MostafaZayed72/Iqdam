<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">قائمة العيادات</h1>

    <!-- عرض البيانات -->
    <div v-if="clinics.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="clinic in clinics" 
        :key="clinic.id" 
        class="p-4 border rounded-lg shadow hover:shadow-lg transition">
        <h2 class="text-xl font-semibold">{{ clinic.clinicName }}</h2>
        <p class="text-gray-600">العنوان: {{ clinic.address }}</p>
        <p class="text-gray-500 text-sm">التواصل: {{ clinic.contact }}</p>
      </div>
    </div>

    <!-- عند عدم وجود بيانات -->
    <p v-else class="text-center text-gray-500">لا توجد بيانات متاحة حاليا.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// تعريف متغير لتخزين بيانات العيادات
const clinics = ref([])

// جلب البيانات من الـ API
onMounted(async () => {
  try {
    const { data } = await useFetch('https://www.clinicreservation.somee.com/api/Clinic/GetAll')
    clinics.value = data.value || [] // تحديث البيانات بناءً على الاستجابة
  } catch (error) {
    console.error('حدث خطأ أثناء جلب البيانات:', error)
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
