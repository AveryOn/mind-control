<template>
    <div class="topbar w-11 shadow-3 border-round-lg py-1 px-4 mt-1 flex align-items-center justify-content-center">
        <div class="logo-block mr-auto">
            <img class="logo" src="@/assets/logo.png" alt="logo">
        </div>
        <h2 class="username mr-4 flex align-items-center justify-content-center">
            <span class="mr-2 px-2" style="border-right: 2px solid rgba(168, 168, 168, 0.6);">{{ store.userData?.name }}</span>
            <i class="pi pi-sign-in cursor-pointer" @click="handlerLogout" v-tooltip="'Выйти'" style="font-size: 1.4rem; font-weight: 500"></i>
        </h2>
    </div>
</template>

<script setup lang="ts">
import { logoutApi } from '@/api/authApi';
import { useMainStore } from '@/stores/mainStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useMainStore();

async function handlerLogout() {
    try {
        await logoutApi();
        router.push({ name: 'reception' }).then(() => window.location.reload());
        localStorage.removeItem('user_data');
        localStorage.removeItem('token');
    } catch (err) {
        console.error('/src/components/MainComponents/topbarComp.vue: handlerLogout => ', err);
        throw err;
    }
}

</script>

<style scoped>
.topbar {
    background-color: var(--basic-bg-light);
    min-height: 4rem;
    height: max-content;
}
.logo-block {
    width: 70px;
    height: 70px;
}
.logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}
.username {
    color: var(--basic-color-fg); 
}
</style>