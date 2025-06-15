<template>
  <div class="p-4">
    <Loader v-if="loader" />
    <h2 class="text-xl mb-4">تعديل القسم</h2>

    <!-- نموذج التعديل -->
    <form @submit.prevent="updateDepartment">
      <!-- العنوان العربي -->
      <div class="field">
        <label for="titleAr">العنوان (عربي)</label>
        <InputText id="titleAr" v-model="department.titleAr" placeholder="أدخل العنوان بالعربية" class="w-full" />
      </div>

      <!-- العنوان الإنجليزي -->
      <div class="field mt-3">
        <label for="titleEn">العنوان (إنجليزي)</label>
        <InputText id="titleEn" v-model="department.titleEn" placeholder="أدخل العنوان بالإنجليزية" class="w-full" />
      </div>

      <!-- الوصف العربي -->
      <div class="field mt-3">
        <label for="descriptionAr">الوصف (عربي)</label>
        <Textarea id="descriptionAr" v-model="department.descriptionAr" placeholder="أدخل الوصف بالعربية" rows="3" class="w-full" />
      </div>

      <!-- الوصف الإنجليزي -->
      <div class="field mt-3">
        <label for="descriptionEn">الوصف (إنجليزي)</label>
        <Textarea id="descriptionEn" v-model="department.descriptionEn" placeholder="أدخل الوصف بالإنجليزية" rows="3" class="w-full" />
      </div>

      <!-- رابط الصورة -->
      <div class="field mt-3">
        <label for="imageUrl">رابط الصورة</label>
        <InputText id="imageUrl" v-model="department.imageUrl" placeholder="أدخل رابط الصورة" class="w-full" />
      </div>

      <!-- أزرار التحكم -->
      <div class="field mt-4 flex justify-between">
        <Button label="تعديل" icon="pi pi-check" type="submit" class="w-1/3" />
        <Button label="حذف القسم" icon="pi pi-trash" @click="deleteDepartment" class="w-1/3 p-button-danger" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const loader = ref(false);

// الوصول إلى base URL من .env
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// تعريف البيانات
const department = ref({
  id: 0,
  titleAr: '',
  titleEn: '',
  descriptionAr: '',
  descriptionEn: '',
  imageUrl: ''
});

// دالة لجلب بيانات القسم عند تحميل المكون
const getDepartmentById = async () => {
  loader.value = true;
  const id = route.params.id;
  try {
    const response = await axios.get(`${baseUrl}/api/Departments/GetDepartmentById`, {
      params: { id }
    });
    department.value = response.data;
  } catch (error) {
    console.error('خطأ أثناء جلب بيانات القسم', error);
  } finally {
    loader.value = false;
  }
};

// دالة لتعديل القسم
const updateDepartment = async () => {
  loader.value = true;
  try {
    const response = await axios.put(`${baseUrl}/api/Departments/UpdateDepartment`, department.value);
    console.log('تم تعديل القسم بنجاح', response.data);
    router.push('/admin/departments'); // التوجيه إلى صفحة الأقسام
  } catch (error) {
    // التحقق مما إذا كان الخطأ يحتوي على استجابة من الخادم
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = error.response.data.errors;
      // استخراج أول رسالة خطأ من كائن الأخطاء
      const errorMessages = Object.values(errors).flat(); // جمع جميع الرسائل
      alert(errorMessages[0]); // عرض أول رسالة خطأ فقط
    } else {
      // في حالة عدم وجود استجابة أو هيكل خطأ مختلف
      console.error('خطأ أثناء تعديل القسم', error);
      alert('حدث خطأ غير متوقع');
    }
  } finally {
    loader.value = false;
  }
};

// دالة لحذف القسم
const deleteDepartment = async () => {
  loader.value = true;
  const confirmed = confirm('هل أنت متأكد أنك تريد حذف هذا القسم؟');
  if (confirmed) {
    try {
      const id = department.value.id;
      const response = await axios.delete(`${baseUrl}/api/Departments/DeleteDepartment`, {
        params: { id }
      });
      console.log('تم حذف القسم بنجاح', response.data);
      router.push('/admin/departments');
    } catch (error) {
      console.error('خطأ أثناء حذف القسم', error);
    } finally {
      loader.value = false;
    }
  } else {
    loader.value = false;
  }
};

// تنفيذ دالة جلب بيانات القسم عند تحميل المكون
onMounted(() => {
  getDepartmentById();
});

definePageMeta({
  layout: "admin"
});
</script>

