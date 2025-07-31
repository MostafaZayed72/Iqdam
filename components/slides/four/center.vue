<template>
  <div>
<NuxtImg src="/imgs/home/parent.png" class="w-full h-screen" v-if="locale === 'ar'"/>
<NuxtImg src="/imgs/home/parenten.png" class="w-full" v-else/>
  </div>
</template>


<script setup>
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

</script>
