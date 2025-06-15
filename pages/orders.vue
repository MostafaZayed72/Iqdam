<template>
   <div class="h-screen my-auto flex flex-col justify-center items-center w-full">
    <Loader v-if="loader"/>
    <div class="w-[90%] md:w-[50%] mx-auto my-auto  p-8 dark:bg-gray-300 shadow-lg rounded-lg text-black">
      <h1 class="text-2xl font-bold mb-6 text-center">تقديم طلب جديد</h1>
      <form @submit.prevent="createOrder">
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('Name') }}</label>
          <input v-model="order.FirstName" type="text" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">{{ $t('Last Name') }}</label>
          <input v-model="order.lastName" type="text" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">البريد الإلكتروني:</label>
          <input v-model="order.email" type="email" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">رقم الهاتف:</label>
          <input v-model="order.mobileNo" type="text" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">العنوان:</label>
          <input v-model="order.title" type="text" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">التفاصيل:</label>
          <textarea v-model="order.details" class="w-full px-4 py-2 border rounded-lg" rows="4" required></textarea>
        </div>
  
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
          إرسال الطلب
        </button>
      </form>
    </div>
   </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const loader = ref()
  const router = useRouter();
  const order = ref({
    FirstName: '',
    lastName:'',
    email: '',
    mobileNo: '',
    title: '',
    details: ''
  });
  
  const createOrder = async () => {
    loader.value = true; 
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/Orders/CreateOrder`, order.value);
      alert('تم إرسال الطلب بنجاح!');
      router.push('/'); 
    } catch (error) {
      console.error('خطأ أثناء إرسال الطلب:', error);
      alert('حدث خطأ أثناء إرسال الطلب.');
    } finally{
        loader.value= false
    }
  };
  </script>
  
  <style scoped>
  form label {
    font-weight: bold;
  }
  </style>
  