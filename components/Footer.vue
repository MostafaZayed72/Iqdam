<template>
    <footer class="text-white bg-primary w-full py-8">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- القسم الأول: شعار الموقع -->
            <div class="flex flex-col items-center md:items-start">
                <img src="/imgs/logo.png" alt="Site Logo" class="h-20 w-20 rounded-full mb-4" />
                <p class="text-sm md:text-base text-center md:text-left">
                    &copy; {{ new Date().getFullYear() }} {{ $t('All rights reserved to Shams.') }}
                </p>
            </div>

            <!-- القسم الثاني: الروابط -->
            <div class="flex flex-col   mx-auto">
                <h2 class="text-lg font-bold mb-4">{{ $t('Quick Links') }}</h2>
                <ul class="space-y-2">
                    <li>
                        <nuxt-link to="/contact" class="hover:underline hover:text-green-300">
                            {{ $t('Contact Us') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/about" class="hover:underline hover:text-green-300">
                            {{ $t('About Us') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/privacy-policy" class="hover:underline hover:text-green-300">
                            {{ $t('Privacy Policy') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/join-us" class="hover:underline hover:text-green-300">
                            {{ $t('Join Us') }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>

            <!-- القسم الثالث: معلومات التواصل -->
            <div class="flex flex-col items-center md:items-start">
                <h2 class="text-lg font-bold mb-4">{{ $t('Contact Information') }}</h2>
                <p>
                    {{ $t('Mail Us') }}:
                    <a href="mailto:support@example.com" class="underline text-green-300 hover:text-green-400">
                        M.abdu.abass@gmail.com
                    </a>
                </p>
                <p class="mt-2">
                    {{ $t('Phone') }}: 
                    <a href="tel:+123456789" class="underline text-green-300 hover:text-green-400">
                        +966508282809
                    </a>
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
