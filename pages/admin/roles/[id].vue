<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Edit User</h1>

    <div v-if="loading" class="mb-4">
      <p>Loading...</p>
    </div>

    <div v-if="errorMessage" class="mb-4 text-red-600">
      <p>{{ errorMessage }}</p>
    </div>

    <form @submit.prevent="updateUser" class="space-y-4">
      <!-- First Name -->
      <div class="field">
        <label for="firstName" class="block text-sm font-medium mb-1">First Name</label>
        <InputText v-model="user.firstName" id="firstName" placeholder="Enter First Name"
          class="w-full border-2 border-indigo-700 focus:ring-2 focus:ring-indigo-500" />
      </div>

      <!-- Last Name -->
      <div class="field">
        <label for="lastName" class="block text-sm font-medium mb-1">Last Name</label>
        <InputText v-model="user.lastName" id="lastName" placeholder="Enter Last Name"
          class="w-full border-2 border-indigo-700 focus:ring-2 focus:ring-indigo-500" />
      </div>

      <!-- Email -->
      <div class="field">
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <InputText v-model="user.email" id="email" type="email" placeholder="Enter Email"
          class="w-full border-2 border-indigo-700 focus:ring-2 focus:ring-indigo-500" />
      </div>

      <!-- Mobile Number -->
      <div class="field">
        <label for="mobileNo" class="block text-sm font-medium mb-1">Mobile Number</label>
        <InputText v-model="user.mobileNo" id="mobileNo" placeholder="Enter Mobile Number"
          class="w-full border-2 border-indigo-700 focus:ring-2 focus:ring-indigo-500" />
      </div>

      <!-- Role Dropdown -->
      <div class="field">
        <label for="role" class="block text-sm font-medium mb-1">Role</label>
        <Dropdown v-model="user.roleId" id="role" :options="roles" optionLabel="label" optionValue="value"
          placeholder="Select Role"
          class="w-full border-2 border-indigo-700 bg-indigo-100 focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div class="field flex justify-between mt-6">
        <Button label="Save Changes" icon="pi pi-check" type="submit" class="w-full p-button-one" :disabled="loading" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const router = useRouter();

// بيانات المستخدم
const user = reactive({
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  mobileNo: '',
  roleId: 1, // default to Admin
});

// رسالة خطأ وحالة تحميل
const loading = ref(false);
const errorMessage = ref('');

// قائمة الأدوار
const roles = [
  { label: 'Admin', value: 1 },
  { label: 'Supervisor', value: 2 },
];

// جلب بيانات المستخدم
const fetchUserData = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/Users/GetUserById?id=${router.currentRoute.value.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }

    const contentType = response.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('The response is not in JSON format');
    }

    const data = await response.json();
    Object.assign(user, data);
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred while fetching user data.';
  } finally {
    loading.value = false;
  }
};

// تحديث بيانات المستخدم
const updateUser = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Users/Update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNo: user.mobileNo,
        roleId: user.roleId, // إرسال roleId
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({}));
      throw new Error(errorResponse.message || 'Failed to update user data.');
    }

    alert('User data updated successfully.');
    navigateTo('/admin/roles')
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred while updating user data.';
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: "admin"
});
// جلب البيانات عند التحميل
fetchUserData();
</script>
