<template>
  <div :class="{ 'dark': isDarkMode }"
    :style="{ direction: locale === 'ar' ? 'rtl' : 'ltr'}" class="relative" >

    <div class="mb-0 px-4   flex justify-between items-center   fixed w-full top-0 z-10  bg-">
      <div class="flex items-center gap-4 py-2">
        <Icon @click="toggleSidebar" name="iconamoon:menu-burger-horizontal"
          class="md:hidden text-xl  cursor-pointer " />
        <img src="/imgs/logo.png" class="w-40 h-40 cursor-pointer " alt="" style="border-radius: 50%;"
          @click="navigateTo('/')">
      </div>

      <!-- الروابط في الشاشات الكبيرة -->
      <div class="links md:flex items-center gap-4 hidden ">
        <NuxtLink
          class=" px-4 py-2 rounded-lg delayed cursor-pointer font-bold bg-primary  hover:text-primary"
          to="/" active-class=" text-primary" exact-active-class=" text-orange-accent-2 underline">
          {{ $t('Home') }}
        </NuxtLink>

       
        <NuxtLink
          class=" px-4 py-2 rounded-lg delayed cursor-pointer font-bold bg-primary  hover:text-primary"
          to="/features" active-class=" text-primary" exact-active-class=" text-orange-accent-2 underline">
          {{ $t('Features') }}
        </NuxtLink>



        <NuxtLink
          class=" px-4 py-2 rounded-lg delayed cursor-pointer font-bold bg-primary  hover:text-primary"
          to="/programs" active-class=" text-primary" exact-active-class=" text-orange-accent-2 underline">
          {{ $t('Programs') }}
        </NuxtLink>

        <NuxtLink
          class=" px-4 py-2 rounded-lg delayed cursor-pointer font-bold bg-primary  hover:text-primary"
          to="/registration" active-class=" text-primary" exact-active-class=" text-orange-accent-2 underline">
          {{ $t('Registration') }}
        </NuxtLink>
        <NuxtLink
          class=" px-4 py-2 rounded-lg delayed cursor-pointer font-bold bg-primary  hover:text-primary"
          to="/contact" active-class=" text-primary" exact-active-class=" text-orange-accent-2 underline">
          {{ $t('Contact us') }}
        </NuxtLink>






      </div>
      <div class="flex items-center ">


        <LanguageSwitcher />

        <DarkModeToggle @click="toggleDarkMode" />
        <!-- <FloatingActions /> -->
      </div>
    </div>

    <!-- Burger Menu Transition for Small Screens -->
    <transition name="slide">
      
      <div v-if="isSidebarOpen" class="md:hidden border-t-2 border-grey-darken-2 h-screen fixed  z-10 bg-primary">
        <div class="flex items-center gap-4">
        <Icon @click="toggleSidebar" name="iconamoon:menu-burger-horizontal"
          class="md:hidden text-xl  cursor-pointer  mx-7 mt-4" />
        
      </div>
        <div class="flex flex-col p-4">
          <NuxtLink
            class="flex items-center gap-2  px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-slate-50 hover:text-primary"
            to="/" active-class=" text-primary" exact-active-class=" text-primary underline">
            <Icon name="material-symbols:family-home" />

            {{ $t('Home') }}
          </NuxtLink>


   
          <NuxtLink
            class="flex items-center gap-2  px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-slate-50 hover:text-primary"
            to="/features" active-class=" text-primary" exact-active-class=" text-primary underline">

            <Icon name="fluent:branch-fork-32-filled" />

            {{ $t('Features') }}

          </NuxtLink>
          <NuxtLink
            class="flex items-center gap-2  px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-slate-50 hover:text-primary"
            to="/programs" active-class=" text-primary" exact-active-class=" text-primary underline">

            <Icon name="material-symbols:barcode-reader-outline" />

            {{ $t('Programs') }}

          </NuxtLink>

          <NuxtLink
            class="flex items-center gap-2  px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-slate-50 hover:text-primary"
            to="/registration" active-class=" text-primary" exact-active-class=" text-primary underline">

            <Icon name="ic:twotone-app-registration" />

            {{ $t('Registration') }}

          </NuxtLink>
          <NuxtLink
            class="flex items-center gap-2  px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-slate-50 hover:text-primary"
            to="/contact" active-class=" text-primary" exact-active-class=" text-primary underline">

            <Icon name="ic:outline-connect-without-contact" />

            {{ $t('Contact us') }}

          </NuxtLink>





        </div>
      </div>
    </transition>

    <Loader v-if="loading" />
    <main class="p-0 ">
      <slot />

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core'; // استيراد useLocalStorage

const { locale } = useI18n();
const loading = ref(true);
const router = useRouter();


const isDarkMode = ref(false);

// استرجاع وضعية اللون المحفوظة
onMounted(() => {
  const savedColorMode = localStorage.getItem('colorMode');
  if (savedColorMode === 'dark' || savedColorMode === 'light') {
    isDarkMode.value = savedColorMode === 'dark';
    document.body.classList.toggle('dark', isDarkMode.value);
  }
});

// تحديد صورة الخلفية بناءً على وضعية الوضع الداكن
const backgroundImage = computed(() => {
  return isDarkMode.value
    ? 'url(/imgs/dark.jpg)'  // صورة الخلفية في الوضع الداكن
    : 'url(/imgs/light.jpg)'; // صورة الخلفية في الوضع العادي
});

// دالة لتبديل الوضع الداكن
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('colorMode', isDarkMode.value ? 'dark' : 'light');
  document.body.classList.toggle('dark', isDarkMode.value);
};

const token = useLocalStorage('token', null); // "token" هو اسم المفتاح و "null" هو القيمة الافتراضية
const userID = ref()
const roles = ref()
// دالة التحقق من التوكن
const checkToken = () => {
  if (!token.value) {
    // إذا لم يكن هناك توكن في الـ localStorage، يتم تعيين القيمة الافتراضية
    token.value = localStorage.getItem('token');
  }
};


// مراقبة التوكن وتحديث حالة token بناءً عليه
watch(token, (newToken) => {
  if (newToken) {
    // إذا كان هناك توكن، يمكنك تنفيذ عمليات معينة
    console.log("تم تسجيل الدخول");
  } else {
    // إذا لم يكن هناك توكن، تنفيذ عمليات أخرى مثل توجيه المستخدم إلى صفحة التسجيل
    console.log("تم تسجيل الخروج");
  }
});

// إضافة مستمع لحدث storage في متصفح
const handleStorageChange = (event) => {
  if (event.key === 'token') {
    // عند تغيير قيمة التوكن في localStorage
    token.value = event.newValue;
  }
};

onMounted(() => {
  checkToken();
  loading.value = false;
  userID.value = localStorage.getItem("userID")
  roles.value = localStorage.getItem("roles")

  // الاستماع إلى تغييرات localStorage
  window.addEventListener('storage', handleStorageChange);
});

onBeforeUnmount(() => {
  // إزالة مستمع الحدث عند إلغاء تحميل الصفحة
  window.removeEventListener('storage', handleStorageChange);
});

// التحكم في حالة الـ loading عند التنقل بين الصفحات
router.beforeEach((to, from, next) => {
  loading.value = true;
  next();
});

router.afterEach(() => {
  loading.value = false;
});

const isSidebarOpen = ref(false);
const isDropdownOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// إغلاق القائمة عند النقر خارجها
const closeDropdownOnClickOutside = (event) => {
  const dropdown = document.querySelector('.relative');
  const toggleButton = event.target.closest('h1'); // عنصر النقر لفتح القائمة
  if (dropdown && !dropdown.contains(event.target) && !toggleButton) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdownOnClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside);
});

const route = useRoute();

// للتحقق إذا كان الرابط الحالي يحتوي على كلمة "signup" وتعيين الـ active
const isSignupActive = computed(() => route.path.endsWith('signup'));

// للتحقق إذا كان أي مسار يحتوي على "signup"
const isSignupSectionActive = computed(() => {
  return route.path.includes('signup');
});

// للتحقق إذا كان الرابط الحالي هو "yourNurse"
const isYourNurseActive = computed(() => route.path.startsWith('/yourNurse'));
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

.slide-enter-to,
.slide-leave {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter {
  opacity: 0;
  transform: translateX(-20px);
}

.dark .p-menubar .p-menubar-root-list {
  color: white;
}

.p-menuitem {
  color: black;
}

.dark .p-menuitem {
  color: white;
}

.p-menubar {
  color: white;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.z-10 {
  z-index: 10;
}

.bg-white {
  background-color: white;
}

.text-black {
  color: black;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.rounded {
  border-radius: 0.25rem;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.w-full {
  width: 100%;
}

.mt-2 {
  margin-top: 0.5rem;
}

.right-0 {
  right: 0;
}
</style>
