<template>
  <div :class="{ 'dark': isDarkMode }" :style="{ direction: locale === 'ar' ? 'rtl' : 'ltr' }" class="">

    <!-- Navbar -->
    <div class="mb-0 px-4 flex justify-between items-center w-full  py-1  z-50 backdrop-blur-sm bg-white/30 dark:bg-black/30"  :style="{ 
    backgroundImage: isDarkMode 
      ? 'url(/imgs/backgrounds/header.png)' 
      : 'url(/imgs/backgrounds/headerr.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }"
  >
      <div class="flex items-center gap-4">
        <!-- Burger Icon for Small Screens -->
        <Icon @click="toggleSidebar" name="iconamoon:menu-burger-horizontal" class="lg:hidden text-3xl cursor-pointer" />

        <!-- Logo -->
<div>
          <NuxtImg src="/imgs/logo.png" class="w-10 h-10 cursor-pointer bg-white" alt="" style="border-radius: 50%;" @click="navigateTo('/')" />

</div>        <!-- Video Logo -->
<!-- <video
  src="/imgs/second-logoo.mp4"
  autoplay
  muted
  loop
  playsinline
  class="h-12 w-full rounded-md object-contain"
/> -->

      </div>


      <div class="links lg:flex items-center gap-4 hidden">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          class="px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-primary"
          :to="link.to"
          active-class="text-one dark:text-second"
          exact-active-class="text-one dark:text-second  underline">
          {{ $t(link.label) }}
        </NuxtLink>
      </div>

      <!-- Controls -->
      <div class="flex items-center">
        <LanguageSwitcher />
        <DarkModeToggle @click="toggleDarkMode" />
      </div>
    </div>

    <!-- Sidebar Menu for Small Screens -->
    <transition name="slide">
<div
  v-if="isSidebarOpen"
  :class="['lg:hidden', 'fixed', 'top-4', locale === 'ar' ? 'right-4' : 'left-4', 'z-50', 'bg-white/50', 'backdrop-blur-md', 'rounded-xl', 'p-4', 'shadow-lg', 'w-fit', 'max-w-[90%]']">

        <div class="flex justify-start">
          <Icon @click="toggleSidebar" name="iconamoon:menu-burger-horizontal" class="text-3xl cursor-pointer" />
        </div>

        <div class="flex flex-col mt-4">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            @click="handleLinkClick"
            class="flex items-center gap-2 px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-black  hover:text-primary"
            :to="link.to"
            active-class="text-secondary"
            exact-active-class="text-secondary underline">
            <Icon :name="link.icon" />
            {{ $t(link.label) }}
          </NuxtLink>
        </div>
      </div>
    </transition>
    <Loader v-if="loading" />
    <main class="">
      <slot />
    </main>
            <FloatingActions class="z-100" style="z-index: 100;"/>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';

const { locale } = useI18n();
const loading = ref(true);
const router = useRouter();

const isDarkMode = ref(false);
const isSidebarOpen = ref(false);
const token = useLocalStorage('token', null);
const userID = ref();
const roles = ref();

const navLinks = [
  { to: '/', label: 'Home', icon: 'material-symbols:family-home' },
    { to: '/about-us', label: 'About us', icon: 'solar:user-speak-bold-duotone' },
  { to: '/features', label: 'Features', icon: 'fluent:branch-fork-32-filled' },
  { to: '/programs', label: 'Programs', icon: 'material-symbols:barcode-reader-outline' },
  { to: '/contact', label: 'Contact us', icon: 'ic:outline-connect-without-contact' },
  { to: '/teachers', label: 'Teachers', icon: 'noto:man-teacher-light-skin-tone' },
    { to: '/registration', label: 'Registration', icon: 'ic:twotone-app-registration' },
  { to: '/news', label: 'News', icon: 'material-symbols:breaking-news' },
];

onMounted(() => {
  const savedColorMode = localStorage.getItem('colorMode');
  if (savedColorMode === 'dark' || savedColorMode === 'light') {
    isDarkMode.value = savedColorMode === 'dark';
    document.body.classList.toggle('dark', isDarkMode.value);
  }

  checkToken();
  loading.value = false;
  userID.value = localStorage.getItem("userID");
  roles.value = localStorage.getItem("roles");
  window.addEventListener('storage', handleStorageChange);
  document.addEventListener('click', closeDropdownOnClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorageChange);
  document.removeEventListener('click', closeDropdownOnClickOutside);
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('colorMode', isDarkMode.value ? 'dark' : 'light');
  document.body.classList.toggle('dark', isDarkMode.value);
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLinkClick = () => {
  isSidebarOpen.value = false;
};

const checkToken = () => {
  if (!token.value) token.value = localStorage.getItem('token');
};

const handleStorageChange = (event) => {
  if (event.key === 'token') token.value = event.newValue;
};

router.beforeEach((to, from, next) => {
  loading.value = true;
  next();
});

router.afterEach(() => {
  loading.value = false;
});

const closeDropdownOnClickOutside = (event) => {
  const dropdown = document.querySelector('.relative');
  if (dropdown && !dropdown.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};
</script>

<style scoped>
body.dark {
  background-color: #1e1e1e;
  color: white;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.text-secondary {
  color: #ffb703 !important;
}
</style>
