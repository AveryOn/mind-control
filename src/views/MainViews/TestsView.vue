<template>
    <div 
    class="w-full h-full overflow-hidden flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Тесты</h1>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-hidden" style="border: 1px solid black;">

            <!-- ОКНО ПРИВЕТСТВИЯ -->
            <div 
            class="w-full h-full flex flex-column align-items-center gap-3 justify-content-center"
            v-if="true"
            >
                <h1 class="light-text">Здесь будут отображаться все тесты</h1>
                <div class="w-max">
                    <Button 
                    label="Создать" 
                    icon="pi pi-plus" 
                    text raised 
                    iconPos="top" 
                    @click="router.push({ name: 'createTest' })"
                    />
                </div>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();

</script>

<style scoped>
    
</style>