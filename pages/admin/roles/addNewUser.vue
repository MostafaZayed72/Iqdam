<template>
    <div class="h-screen flex justify-center items-center ">
      <div class="w-[90%] md:w-[50%] p-8  shadow-lg rounded-lg">
        <h1 class="text-2xl font-bold mb-6 text-center">إنشاء مستخدم جديد</h1>
        <form @submit.prevent="registerUser">
          <!-- الاسم الأول -->
          <div class="mb-4">
            <label class="block text-gray-700">الاسم الأول:</label>
            <input
              v-model="user.firstName"
              type="text"
              placeholder="أدخل الاسم الأول"
              class="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
  
          <!-- الاسم الأخير -->
          <div class="mb-4">
            <label class="block text-gray-700">الاسم الأخير:</label>
            <input
              v-model="user.lastName"
              type="text"
              placeholder="أدخل الاسم الأخير"
              class="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
  
          <!-- رقم الهاتف -->
          <div class="mb-4">
            <label class="block text-gray-700">رقم الهاتف:</label>
            <input
              v-model="user.mobileNo"
              type="text"
              placeholder="أدخل رقم الهاتف"
              class="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
  
          <!-- البريد الإلكتروني -->
          <div class="mb-4">
            <label class="block text-gray-700">البريد الإلكتروني:</label>
            <input
              v-model="user.email"
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              class="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
  
          <!-- كلمة المرور -->
          <div class="mb-4">
            <label class="block text-gray-700">كلمة المرور:</label>
            <input
              v-model="user.password"
              type="password"
              placeholder="أدخل كلمة المرور"
              class="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
  
          <!-- تأكيد كلمة المرور -->
          <div class="mb-4">
            <label class="block text-gray-700">تأكيد كلمة المرور:</label>
            <input
              v-model="user.confirmPassword"
              type="password"
              placeholder="أعد إدخال كلمة المرور"
              class="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
  
          <!-- اختيار الدور -->
          <div class="mb-4">
            <label class="block text-gray-700">الدور:</label>
            <select
              v-model="user.roleId"
              class="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="" disabled>اختر الدور</option>
              <option value="1">أدمن</option>
              <option value="2">مشرف</option>
            </select>
          </div>
  
          <!-- زر الإرسال -->
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            إنشاء المستخدم
          </button>
        </form>
      </div>
    </div>
  </template>
  
  
  <script setup>
import { ref } from "vue";
import axios from "axios";

const user = ref({
  firstName: "",
  lastName: "",
  mobileNo: "",
  email: "",
  password: "",
  confirmPassword: "",
  roleId: "",
});

const registerUser = async () => {
  try {
    // إرسال الطلب إلى الخادم
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/Users/Register`,
      user.value
    );
    alert("تم إنشاء المستخدم بنجاح!");
    navigateTo('/')
    console.log(response.data);
  } catch (error) {
    // تحقق من وجود رد يحتوي على بيانات الخطأ
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      // إذا كانت هناك أخطاء ضمن حقل "errors"
      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors)
          .flat()
          .join("\n"); // دمج الأخطاء في سلسلة نصوص مع فاصلة جديدة
        alert(`حدثت الأخطاء التالية:\n${errorMessages}`);
      } else if (errorData.title) {
        // إذا كان هناك رسالة في الحقل "title"
        alert(errorData.title);
      } else {
        alert("حدث خطأ غير متوقع. الرجاء المحاولة لاحقًا.");
      }
    } else {
      alert("فشل الاتصال بالخادم. الرجاء التحقق من اتصالك بالإنترنت.");
    }
    console.error("خطأ أثناء إنشاء المستخدم:", error);
  }
};

definePageMeta({
  layout: "admin"
});

</script>

  <style scoped>
  form label {
    font-weight: bold;
  }
  </style>
  