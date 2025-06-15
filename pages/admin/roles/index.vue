<template>
  <div class="container mx-auto">
    <Button label="إضافة مستخدم جديد" icon="pi pi-plus" @click="navigateTo('/admin/roles/addNewUser')" class="mb-4 bg-primary" />
    <DataTable :value="users" :paginator="true" :rows="10" :totalRecords="totalCount">
      <Column field="firstName" header="First Name" />
      <Column field="lastName" header="Last Name" />
      <Column field="email" header="Email" />
      <Column field="mobileNo" header="Mobile No" />
      <Column field="roleName" header="Role" />
      <Column header="Actions">
        <template #body="slotProps">
          <Button 
            label="تعديل" 
            icon="pi pi-pencil" 
            class="bg-yellow"
            @click="navigateTo(`/admin/roles/${slotProps.data.id}`)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCookie } from '#app';

import  DataTable  from 'primevue/datatable';
import  Column  from 'primevue/column';
import { RouterLink } from 'vue-router';

const users = ref([]);
const totalCount = ref(0);

const fetchUsers = async () => {
  const token = useCookie('auth_token').value;
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Users/GetAllUsers`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  users.value = data.data;
  totalCount.value = data.totalCount;
};

onMounted(fetchUsers);
definePageMeta({
  layout: "admin"
});

</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
