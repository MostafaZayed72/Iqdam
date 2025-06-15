<template>
    <div class="h-screen my-auto mx-auto flex flex-col justify-center items-center">
        <h1 class="my-auto mx-auto text-center font-bold text-3xl">
            {{ $t('Welcome to dashboard') }}
        </h1>
    </div>
</template>

<script setup>
definePageMeta({
  layout: "admin"
});

</script>