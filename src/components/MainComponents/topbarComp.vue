<template>
    <div class="topbar w-11 shadow-3 border-round-lg py-1 px-4 flex align-items-center justify-content-center">
        <div class="logo-block mr-auto">
            <img class="logo" src="@/assets/logo.png" alt="logo">
        </div>
        <h2 class="username mr-4 flex align-items-center justify-content-center">
            <span class="mr-2 px-2" style="border-right: 2px solid rgba(168, 168, 168, 0.6);">Alex Somebody</span>
            <i class="pi pi-sign-in cursor-pointer" v-tooltip="'Выйти'" style="font-size: 1.4rem; font-weight: 500"></i>
        </h2>
    </div>
</template>

<script setup lang="ts">

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