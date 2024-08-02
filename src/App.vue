<template>
    <div class="app">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

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