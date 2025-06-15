<template>
  <div class="p-4">
    <Loader v-if="loader" />
    <h2 class="text-xl mb-4">تعديل الفرع</h2>

    <form @submit.prevent="updateDivision">
      <!-- اختيار القسم -->
      <div class="field">
        <label for="department">القسم</label>
        <Dropdown 
          id="department" 
          v-model="division.departmentId" 
          :options="departments" 
          optionLabel="titleAr" 
          optionValue="id" 
          placeholder="اختر القسم" 
          class="w-full" 
        />
      </div>

      <div class="field">
        <label for="titleAr">العنوان بالعربية</label>
        <InputText id="titleAr" v-model="division.titleAr" placeholder="أدخل العنوان" class="w-full" />
      </div>

      <!-- بقية الحقول كما هي -->
      <div class="field">
        <label for="titleEn">العنوان بالإنجليزية</label>
        <InputText id="titleEn" v-model="division.titleEn" placeholder="Enter Title" class="w-full" />
      </div>

      <!-- الوصف -->
      <div class="field">
        <label for="descriptionAr">الوصف بالعربية</label>
        <Textarea id="descriptionAr" v-model="division.descriptionAr" rows="3" class="w-full" />
      </div>

      <div class="field">
        <label for="descriptionEn">الوصف بالإنجليزية</label>
        <Textarea id="descriptionEn" v-model="division.descriptionEn" rows="3" class="w-full" />
      </div>

      <!-- الصورة -->
      <div class="field">
        <label for="imageUrl">رابط الصورة</label>
        <InputText id="imageUrl" v-model="division.imageUrl" class="w-full" />
      </div>

      <!-- الأزرار -->
      <div class="field flex justify-between mt-6">
        <Button label="تعديل" icon="pi pi-check" type="submit" class="w-1/3" />
        <Button label="حذف" icon="pi pi-trash" @click="deleteDivision" class="w-1/3 p-button-danger" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const loader = ref(false);

// بيانات الفرع
const division = ref({
  id: 0,
  departmentId: null,
  titleAr: '',
  titleEn: '',
  descriptionAr: '',
  descriptionEn: '',
  imageUrl: '',
  icon: ''
});

// الأقسام المتاحة للاختيار
const departments = ref([]);

// جلب بيانات الفرع
const getDivisionById = async () => {
  const id = route.params.id;
  try {
    const response = await axios.get(`${baseUrl}/api/Divisions/GetDivisionById?id=${id}`);
    division.value = response.data;
  } catch (error) {
    console.error('خطأ أثناء جلب بيانات الفرع', error);
  }
};

// جلب الأقسام من API
const getDepartments = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Departments/GetDepartments`);
    departments.value = response.data.data;
  } catch (error) {
    console.error('خطأ أثناء جلب الأقسام', error);
  }
};

// تعديل الفرع
const updateDivision = async () => {
  loader.value = true;
  try {
    await axios.put(`${baseUrl}/api/Divisions/UpdateDivision`, division.value);
    router.push('/admin/divisions'); // العودة لقائمة الفروع
  } catch (error) {
    // التحقق مما إذا كان الخطأ يحتوي على استجابة من الخادم
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = error.response.data.errors;
      // استخراج أول رسالة خطأ من كائن الأخطاء
      const errorMessages = Object.values(errors).flat(); // جمع جميع الرسائل
      alert(errorMessages[0]); // عرض أول رسالة خطأ فقط
    } else {
      // في حالة عدم وجود استجابة أو هيكل خطأ مختلف
      console.error('خطأ أثناء تعديل الفرع', error);
      alert('حدث خطأ غير متوقع');
    }
  } finally {
    loader.value = false;
  }
};

// حذف الفرع
const deleteDivision = async () => {
  const confirmed = confirm('هل أنت متأكد من حذف الفرع؟');
  if (confirmed) {
    try {
      await axios.delete(`${baseUrl}/api/Divisions/DeleteDivision?id=${division.value.id}`);
      router.push('/admin/divisions');
    } catch (error) {
      console.error('خطأ أثناء حذف الفرع', error);
    }
  }
};

// جلب البيانات عند تحميل المكون
onMounted(() => {
  getDivisionById();
  getDepartments();
});

definePageMeta({
  layout: 'admin'
});
</script>
