<!-- components/LogoutButton.vue -->
<template>

  <Icon  @click="handleLogout" name="streamline:logout-1-solid" class="text-3xl cursor-pointer"/>
</template>

<script setup>
const handleLogout = () => {
  // 🗑️ حذف التوكن من localStorage
  localStorage.removeItem('token')
  localStorage.removeItem('authToken')

  // 🔄 إعادة التوجيه لصفحة تسجيل الدخول
  navigateTo('/login')
}
</script>
