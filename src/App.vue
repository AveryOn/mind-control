<template>
    <span v-if="isLoadingData" class="stub-loading-app fixed right-0 bottom-0 left-0 top-0 flex align-items-center justify-content-center">
        <i class="loading-icon pi pi-verified" style="font-size: 5rem; color: var(--warn-color);"></i>
    </span>
    <div class="app" v-else>
        <RouterView/>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { checkAccess } from "./api/authApi";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isLoadingData = ref(true);

// Перенаправление на страницу логин
function redirectToLogin() {
    if(route.name !== 'login') {
        router.replace({ name: 'login' });
    }
}

// Перенаправление на главную страницу 
function redirectToMain() {
    if(route.name === 'login' || route.name === 'logup') {
        router.push({ name: 'main' });
    }
}

onBeforeMount(async () => {
    // Проверка доступа к системе
    checkAccess()
        .then((response) => {
            if (response.meta?.status !== 200) {
                redirectToLogin();
            } 
            else if (response.meta?.status === 200) {
                redirectToMain();
            }
        })
        .catch(() => redirectToLogin())
        .finally(() => {
            setTimeout(() => {
                isLoadingData.value = false;
            }, 500);
        });
})
onMounted(() => {
    document.documentElement.classList = 'theme-light';    
});
</script>

<style scoped>
.app {
    width: 100vw;
    height: 100vh;
    z-index: 0;
    background-color: var(--basic-bg);
    color: var(--basic-fg);
}
</style>