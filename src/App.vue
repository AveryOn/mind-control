<template>
    <div>
        Hello App
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
    document.documentElement.classList = 'theme-light';    
});
</script>

<style scoped>

</style>