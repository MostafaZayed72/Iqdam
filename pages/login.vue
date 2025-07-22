<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-md text-black">
      <h1 class="text-2xl font-bold mb-6">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="email" type="email" class="w-full border p-2 rounded" required />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input v-model="password" type="password" class="w-full border p-2 rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </form>
      <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
const email = ref('');
const password = ref('');
const error = ref('');

const config = useRuntimeConfig();

const handleLogin = async () => {
  error.value = '';

  try {
    const { data, error: fetchError } = await useFetch('/api/identity/login', {
      baseURL: config.public.baseUrl,
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (fetchError.value) {
      error.value = fetchError.value?.data?.message || 'Login failed';
      return;
    }

navigateTo('/admin')
  } catch (err) {
    error.value = 'Unexpected error';
  }
}
</script>
