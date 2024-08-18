<template>
    <div class="relative h-full overflow-auto flex flex-column justify-content-center align-items-center py-6">
        <div class="notice-nochecked-block min-w-20rem w-max py-4 px-4 flex flex-column justify-content-center align-items-center">
            <span class="flex flex-column align-items-center">
                <i class="notice-nochecked-icon nocheck pi pi-hourglass mt-1 mb-3"></i>
                <h1 class="notice-nochecked-title font-light pb-3">Тест ожидает проверки</h1>
            </span>
            <div class="flex flex-column align-content-center pt-3 px-3">
                <span class="font-light text-center"></span>
                <Button
                class="w-max mt-3"
                label="Назад"
                text 
                raised 
                size="small"
                icon="pi pi-arrow-left"
                @click="router.go(-1)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<style scoped>
    
</style>