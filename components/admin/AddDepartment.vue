<template>
  <div>
    <Loader v-if="loader" />
    <!-- زر إضافة قسم جديد -->
    <Button label="إضافة قسم جديد" icon="pi pi-plus" @click="showDialog = true" class="mb-4 bg-primary"/>

    <!-- نافذة حوار لإضافة قسم جديد -->
    <Dialog header="إضافة قسم جديد" :visible="showDialog" @hide="resetForm" :modal="true" :closable="false" :style="$i18n.locale === 'ar' ? 'direction: rtl' : ''">
      <!-- زر إغلاق في أعلى النافذة -->
      <template #header>
        <div class="flex justify-between items-center">
          <span>إضافة قسم جديد</span>
          <Button icon="pi pi-times" class="p-button-rounded p-button-text" @click="closeDialog" />
        </div>
      </template>

      <form @submit.prevent="addDepartment">
        <div class="p-fluid">
          <div class="field">
            <label for="titleAr">العنوان (بالعربية)</label>
            <InputText id="titleAr" v-model="department.titleAr" placeholder="أدخل العنوان بالعربية" class="w-full"/>
          </div>

          <div class="field">
            <label for="titleEn">العنوان (بالإنجليزية)</label>
            <InputText id="titleEn" v-model="department.titleEn" placeholder="أدخل العنوان بالإنجليزية" class="w-full"/>
          </div>

          <div class="field">
            <label for="descriptionAr">الوصف (بالعربية)</label>
            <Textarea id="descriptionAr" v-model="department.descriptionAr" placeholder="أدخل الوصف بالعربية" class="w-full"/>
          </div>

          <div class="field">
            <label for="descriptionEn">الوصف (بالإنجليزية)</label>
            <Textarea id="descriptionEn" v-model="department.descriptionEn" placeholder="أدخل الوصف بالإنجليزية" class="w-full"/>
          </div>

          <div class="field">
            <label for="imageUrl">رابط الصورة</label>
            <InputText id="imageUrl" v-model="department.imageUrl" placeholder="أدخل رابط الصورة" class="w-full"/>
          </div>

          <div class="field mt-4 flex justify-center gap-4">
            <Button label="إغلاق" class="bg-red-darken-4 w-1/2" @click="closeDialog" />
            <Button label="إضافة" type="submit" class="w-1/2"/>
          </div>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import axios from 'axios'

const loader = ref(false)
// الوصول إلى base URL من .env
const baseUrl = import.meta.env.VITE_API_BASE_URL

// حالة نافذة الحوار
const showDialog = ref(false)

// نموذج البيانات لإضافة قسم
const department = ref({
  titleAr: '',
  titleEn: '',
  descriptionAr: '',
  descriptionEn: '',
  imageUrl: ''
})

import { EventBus } from '@/eventBus';

// دالة لإرسال البيانات إلى الـ API
const addDepartment = async () => {
  loader.value = true
  try {
    const response = await axios.post(`${baseUrl}/api/Departments/AddDepartment`, department.value)
    console.log('القسم تم إضافته بنجاح', response.data)
    showDialog.value = false
    resetForm()
    EventBus.emit('refreshDepartments');

  } catch (error) {
    console.error('خطأ أثناء إضافة القسم', error)
  } finally {
    loader.value = false
  }
}

// دالة لإعادة تعيين النموذج بعد الإرسال أو إغلاق الحوار
const resetForm = () => {
  department.value = {
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
    imageUrl: ''
  }
}

// دالة لإغلاق نافذة الحوار
const closeDialog = () => {
  showDialog.value = false
  resetForm()
}
</script>

