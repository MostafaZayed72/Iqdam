<template>
    <div class="p-6">
      <h2 class="text-2xl mb-4">تعديل الطلب</h2>
  
      <form @submit.prevent="updateOrder" class="space-y-4">
        <!-- عنوان الطلب -->
        <div>
          <label class="block text-gray-700 mb-1">عنوان الطلب</label>
          <input v-model="order.title" disabled class="p-inputtext w-full" />
        </div>
  
        <!-- القسم (Dropdown) -->
        <div >
          <label class="block text-gray-700 mb-1">القسم</label>
          <select v-model="order.departmentId" class="p-inputtext w-full cursor-pointer">
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.titleAr }}
            </option>
          </select>
        </div>
  
        <!-- الحالة -->
        <div >
          <label class="block text-gray-700 mb-1 ">الحالة</label>
          <select v-model="order.status" class="p-inputtext w-full cursor-pointer">
            <option :value="1">قيد الانتظار</option>
            <option :value="2">قيد التنفيذ</option>
            <option :value="3">مكتمل</option>
            <option :value="4">معتمد</option>
            <option :value="5">مرفوض</option>
          </select>
        </div>
  
        <!-- المبلغ الإجمالي -->
        <div>
          <label class="block text-gray-700 mb-1">المبلغ الإجمالي</label>
          <input type="number" v-model="order.totalAmount" class="p-inputtext w-full" />
        </div>
  
        <!-- المبلغ المتبقي -->
        <div>
          <label class="block text-gray-700 mb-1">المبلغ المتبقي</label>
          <input type="number" v-model="order.remainingAmount" class="p-inputtext w-full" />
        </div>
  
        <!-- عدد الموظفين -->
        <div>
          <label class="block text-gray-700 mb-1">عدد الموظفين</label>
          <input type="number" v-model="order.employeesCount" class="p-inputtext w-full" />
        </div>
  
        <!-- المعدات -->
        <div>
          <label class="block text-gray-700 mb-1">المعدات</label>
          <input type="text" v-model="order.equipment" class="p-inputtext w-full" />
        </div>
  
        <!-- الملاحظات -->
        <div>
          <label class="block text-gray-700 mb-1">الملاحظات</label>
          <textarea v-model="order.notes" class="p-inputtextarea w-full"></textarea>
        </div>
  
        <!-- زر الحفظ -->
        <div class="flex justify-end">
          <Button label="حفظ التغييرات" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg" />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  const order = ref({
    id: 0,
    departmentId: null,
    status: 1,
    totalAmount: 0,
    remainingAmount: 0,
    employeesCount: 0,
    equipment: '',
    notes: '',
  });
  
  const departments = ref([]);
  
  // جلب بيانات الطلب
  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/Orders/GetOrderById?id=${router.currentRoute.value.params.id}`
      );
      order.value = response.data;
    } catch (error) {
      console.error('خطأ أثناء جلب بيانات الطلب', error);
    }
  };
  
  // جلب قائمة الأقسام
  const getDepartments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/Departments/GetDepartments`);
      departments.value = response.data.data;
    } catch (error) {
      console.error('خطأ أثناء جلب الأقسام', error);
    }
  };
  
  // تحديث بيانات الطلب
  const updateOrder = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/Orders/FollowOrder`, {
        id: order.value.id,
        departmentId: order.value.departmentId,
        status: order.value.status,
        totalAmount: order.value.totalAmount,
        remainingAmount: order.value.remainingAmount,
        employeesCount: order.value.employeesCount,
        equipment: order.value.equipment,
        notes: order.value.notes,
      });
      alert('تم تحديث الطلب بنجاح!');
      router.push('/admin/orders'); // التوجيه إلى صفحة الطلبات بعد التحديث
    } catch (error) {
      console.error('خطأ أثناء تحديث بيانات الطلب', error);
    }
  };
  
  // جلب البيانات عند تحميل المكون
  onMounted(() => {
    getOrder();
    getDepartments();
  });
  </script>
  
  <style scoped>
  .p-inputtext,
  .p-inputtextarea {
    @apply border border-gray-300 rounded-lg p-2;
  }
  </style>
  