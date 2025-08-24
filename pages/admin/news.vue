<template>
  <div class="p-6">
   
 <div class="flex mb-4 justify-between">
 <AdminAddNewsDialog @newsAdded="handleNewsAdded" />    <LogoutButton />
    </div>
    <hr class="my-6" />
    <AdminNewsTable ref="newsTable" />
  </div>
</template>

<script setup>

const newsTable = ref()

const handleNewsAdded = () => {
  newsTable.value?.fetchNews()
}
</script>
