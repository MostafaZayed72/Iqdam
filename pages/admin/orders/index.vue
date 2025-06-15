<template>
    <div class="p-4">
      <!-- مربع البحث -->
      <div class="flex justify-end mb-4">
        <InputText v-model="filters['global'].value" placeholder="بحث..." class="p-inputtext-sm" />
      </div>
  
      <!-- الجدول -->
      <DataTable
        :value="orders"
        v-model:filters="filters"
        responsiveLayout="scroll"
        removableSort
        paginator
        :rows="10"
      >
        <!-- ترتيب الأعمدة كما هو مطلوب -->
        <Column field="user.firstName" header="الإسم" sortable></Column>
        <Column field="user.lastName" header="اللقب" sortable></Column>
        <Column field="user.email" header="البريد الإلكتروني" sortable></Column>
        <Column field="user.mobileNo" header="رقم الجوال" sortable></Column>
        <Column field="title" header="العنوان" sortable></Column>
        <Column field="details" header="التفاصيل" sortable></Column>
        <Column field="totalAmount" header="المبلغ الإجمالي" sortable></Column>
        <Column field="remainingAmount" header="المبلغ المتبقي" sortable></Column>
        <Column field="employeesCount" header="عدد الموظفين" sortable></Column>
  
        <!-- عمود الحالة (قبل الأخير) -->
        <Column field="status" header="الحالة" sortable>
          <template #body="slotProps">
            {{ getStatusText(slotProps.data.status) }}
          </template>
        </Column>
  
        <!-- عمود التعديل (الأخير) -->
        <Column header="الإجراء" class="text-center">
          <template #body="{ data }">
            <Button 
              label="تعديل" 
              icon="pi pi-pencil" 
              class="bg-yellow"
              @click="editOrder(data.id)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FilterMatchMode } from '@primevue/core/api';
import { useRouter } from 'vue-router';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const orders = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const router = useRouter(); // تعريف الراوتر

// دالة لجلب البيانات
const fetchOrders = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/Orders/GetOrders`);
    orders.value = response.data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

// دالة لتحويل حالة الطلب إلى نص
const getStatusText = (status) => {
  const statusMap = {
    1: 'Pending',
    2: 'In Progress',
    3: 'Completed',
    4: 'Approved',
    5: 'Rejected',
  };
  return statusMap[status] || 'Unknown';
};

// دالة التعديل - توجيه المستخدم إلى صفحة تعديل الطلب
const editOrder = (id) => {
  router.push(`/admin/orders/${id}`);
};

onMounted(() => {
  fetchOrders();
});
definePageMeta({
    layout: "admin"
  });

</script>

  
  <style scoped>
  .p-4 {
    padding: 1rem;
  }
  .p-button-warning {
    background-color: #f59e0b; /* لون أصفر */
    border: none;
  }
  </style>
  