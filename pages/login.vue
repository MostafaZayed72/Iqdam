<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// بيانات تسجيل الدخول
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

// وظيفة تسجيل الدخول
const login = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }

    const data = await response.json();

    // تخزين الـ token في localStorage
    localStorage.setItem('token', data.token);

    // تحويل المستخدم إلى صفحة /admin
    router.push('/admin');
  } catch (error) {
    errorMessage.value = error.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen ">
    <div class="w-full max-w-md p-8  rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      
      <!-- نموذج تسجيل الدخول -->
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <div v-if="errorMessage" class="mb-4 text-sm text-red-600">{{ errorMessage }}</div>

        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>
