<template>
    <div>
      <Loader v-if="loader" />
      <!-- زر إضافة فرع جديد -->
      <Button label="إضافة فرع جديد" icon="pi pi-plus" @click="showDialog = true" class="mb-4 bg-primary" />
  
      <!-- نافذة حوار لإضافة فرع جديد -->
      <Dialog header="إضافة فرع جديد" :visible="showDialog" @hide="resetForm" :modal="true" :closable="false" :style="$i18n.locale === 'ar' ? 'direction: rtl' : ''">
        <template #header>
          <div class="flex justify-between items-center">
            <span>إضافة فرع جديد</span>
            <Button icon="pi pi-times" class="p-button-rounded p-button-text" @click="closeDialog" />
          </div>
        </template>
  
        <form @submit.prevent="addDivision">
          <div class="p-fluid">
            <!-- اختيار القسم -->
            <div class="field">
              <label for="department">القسم</label>
              <Dropdown id="department" v-model="division.departmentId" :options="departments" optionLabel="titleAr" optionValue="id" placeholder="اختر القسم" class="w-full" />
            </div>
  
            <!-- العنوان العربي -->
            <div class="field">
              <label for="titleAr">العنوان (عربي)</label>
              <InputText id="titleAr" v-model="division.titleAr" placeholder="أدخل العنوان بالعربية" class="w-full" />
            </div>
  
            <!-- العنوان الإنجليزي -->
            <div class="field mt-3">
              <label for="titleEn">العنوان (إنجليزي)</label>
              <InputText id="titleEn" v-model="division.titleEn" placeholder="أدخل العنوان بالإنجليزية" class="w-full" />
            </div>
  
            <!-- الوصف العربي -->
            <div class="field mt-3">
              <label for="descriptionAr">الوصف (عربي)</label>
              <Textarea id="descriptionAr" v-model="division.descriptionAr" placeholder="أدخل الوصف بالعربية" rows="3" class="w-full" />
            </div>
  
            <!-- الوصف الإنجليزي -->
            <div class="field mt-3">
              <label for="descriptionEn">الوصف (إنجليزي)</label>
              <Textarea id="descriptionEn" v-model="division.descriptionEn" placeholder="أدخل الوصف بالإنجليزية" rows="3" class="w-full" />
            </div>
  
            <!-- رابط الصورة -->
            <div class="field mt-3">
              <label for="imageUrl">رابط الصورة</label>
              <InputText id="imageUrl" v-model="division.imageUrl" placeholder="أدخل رابط الصورة" class="w-full" />
            </div>
  
            <!-- الأيقونة -->
            <div class="field mt-3">
              <label for="icon">الأيقونة</label>
              <InputText id="icon" v-model="division.icon" placeholder="أدخل الأيقونة" class="w-full" />
            </div>
  
            <div class="field mt-4 flex justify-center gap-4">
              <Button label="إغلاق" class="bg-red-darken-4 w-1/2" @click="closeDialog" />
              <Button label="إضافة" type="submit" class="w-1/2" />
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Dropdown from 'primevue/dropdown';
  import InputText from 'primevue/inputtext';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import axios from 'axios';
  
  const loader = ref(false);
  const showDialog = ref(false);
  
  // بيانات الفروع
  const division = ref({
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
  
  // جلب الأقسام من الـ API
  const getDepartments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/Departments/GetDepartments`);
      departments.value = response.data.data;
    } catch (error) {
      console.error('خطأ أثناء جلب الأقسام', error);
    }
  };

  import { EventBus } from '@/eventBus';

  // دالة لإضافة فرع جديد
  const addDivision = async () => {
    loader.value = true;
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/Divisions/AddDivision`, division.value);
      console.log('تم إضافة الفرع بنجاح');
      closeDialog();
      resetForm();
      EventBus.emit('refreshDivisions');
      // قد تحتاج لاستدعاء حدث أو وظيفة لجلب البيانات المحدثة
    } catch (error) {
      console.error('خطأ أثناء إضافة الفرع', error);
    } finally {
      loader.value = false;
    }
  };
  
  // دالة لإعادة تعيين النموذج
  const resetForm = () => {
    division.value = {
      departmentId: null,
      titleAr: '',
      titleEn: '',
      descriptionAr: '',
      descriptionEn: '',
      imageUrl: '',
      icon: ''
    };
  };
  
  // دالة لإغلاق نافذة الحوار
  const closeDialog = () => {
    showDialog.value = false;
    resetForm();
  };
  
  // تنفيذ الدالة لجلب الأقسام عند تحميل المكون
  onMounted(() => {
    getDepartments();
  });
  
  </script>
  
