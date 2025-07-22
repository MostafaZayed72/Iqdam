<template>
  <div class="p-6">
    <AdminAddNewsDialog @newsAdded="handleNewsAdded" />
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
