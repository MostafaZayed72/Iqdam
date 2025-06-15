<template>
  <div class="p-4">
    <Loader v-if="loader" />
    <h2 class="text-xl mb-4">قائمة الفروع</h2>

    <DataTable :value="divisions" paginator rows="10" :totalRecords="totalCount" class="p-datatable-responsive">
      <!-- عمود اسم القسم -->
      <Column class="text-center" header="القسم">
        <template #body="{ data }">
          {{ departments[data.departmentId] || 'غير محدد' }}
        </template>
      </Column>

      <!-- عمود العنوان العربي -->
      <Column class="text-center" field="titleAr" header="العنوان بالعربية" />
      <!-- عمود العنوان الإنجليزي -->
      <Column class="text-center" field="titleEn" header="العنوان بالإنجليزية" />

      <!-- عمود الوصف العربي -->
      <Column class="text-center" field="descriptionAr" header="الوصف بالعربية" />
      <!-- عمود الوصف الإنجليزي -->
      <Column class="text-center" field="descriptionEn" header="الوصف بالإنجليزية" />

      <!-- عمود صورة -->
      <Column class="text-center" header="رابط الصورة">
        <template #body="{ data }">
          <img v-if="data.imageUrl" :src="data.imageUrl" alt="Image" class="w-20 h-20 rounded-xl object-cover mx-auto" />
          <span v-else>لا توجد صورة</span>
        </template>
      </Column>

      <!-- عمود زر التعديل -->
      <Column header="الإجراء" class="text-center">
        <template #body="{ data }">
          <Button 
            label="تعديل" 
            icon="pi pi-pencil" 
            class="bg-yellow"
            @click="editDivision(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const divisions = ref([])      // لتخزين بيانات الفروع
const departments = ref({})    // لتخزين أسماء الأقسام
const totalCount = ref(0)
const loader = ref(false)

const router = useRouter()

// دالة لجلب بيانات الأقسام
const getDepartments = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Departments/GetDepartments`)
    // تحويل الأقسام إلى كائن لتسهيل الاستخدام
    departments.value = response.data.data.reduce((acc, dept) => {
      acc[dept.id] = dept.titleAr  // استخدم العنوان الإنجليزي بـ dept.titleEn إذا لزم الأمر
      return acc
    }, {})
  } catch (error) {
    console.error('خطأ أثناء جلب بيانات الأقسام', error)
  }
}

// دالة لجلب بيانات الفروع
const getDivisions = async () => {
  loader.value = true
  try {
    const response = await axios.get(`${baseUrl}/api/Divisions/GetAllDivisions`)
    divisions.value = response.data.data
    totalCount.value = response.data.totalCount
  } catch (error) {
    console.error('خطأ أثناء جلب بيانات الفروع', error)
  } finally {
    loader.value = false
  }
}

// دالة التعديل (توجيه المستخدم لصفحة التعديل)
const editDivision = (id) => {
  router.push(`/admin/divisions/${id}`)
}

// تنفيذ الدوال عند تحميل المكون
onMounted(async () => {
  await getDepartments()  // جلب بيانات الأقسام أولًا
  await getDivisions()    // جلب بيانات الفروع بعد الأقسام
})
import { EventBus } from '@/eventBus';
onMounted(() => {
  EventBus.on('refreshDivisions', getDivisions);
});

</script>
