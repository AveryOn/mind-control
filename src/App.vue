<template>
    <div class="app">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import { checkAccess } from "./api/authApi";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

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
    checkAccess()
        .then((response) => {
            if (response.meta?.status !== 200) {
                redirectToLogin();
            } 
            else if (response.meta?.status === 200) {
                redirectToMain();
            }
        })
        .catch(() => redirectToLogin());
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