<template>
    <div class="relative h-full overflow-auto flex flex-column justify-content-center align-items-center py-6">
        <div class="notice-nochecked-block w-20rem py-4 px-3 flex flex-column justify-content-center align-items-center">
            <span v-if="props.testData?.result?.isSuccess === true" class="flex flex-column align-items-center">
                <i class="notice-nochecked-icon pi pi-check-circle"></i>
                <h1 class="notice-nochecked-title font-light pb-3">Тест пройден</h1>
            </span>
            <span v-if="props.testData?.result?.isSuccess === false" class="flex flex-column align-items-center">
                <i class="notice-nochecked-icon failed pi pi-info-circle mb-2"></i>
                <h1 class="notice-nochecked-title font-light pb-3">Тест провален</h1>
            </span>
            <div class="flex flex-column align-content-center pt-3 px-3">
                <span class="font-light text-center">Для того чтобы увидеть результаты теста перейдите в раздел статистики</span>
                <div class="flex gap-3">
                    <!-- КНОПКА Статистика -->
                    <Button
                    class="w-max mt-3 mx-auto"
                    label="Статистика" 
                    text 
                    raised
                    size="small"
                    icon="pi pi-chart-bar"
                    @click="router.push({ name: 'statistics', query: { 'open_statistic_test_id': props.testData?.id, 'open_result_id': props.testData?.result?.id } })"
                    />
                    <!-- КНОПКА Пройти заново -->
                    <Button
                    class="w-max mt-3 mx-auto"
                    label="Пройти заново" 
                    text 
                    raised
                    size="small"
                    icon="pi pi-play"
                    @click="handlerOpenReplayTest"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Test, TestStudent, TestTeacher } from '@/types/testTypes';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
    testData: null | Test | TestStudent | TestTeacher;
}>();

// Обработчик открытия страницы повторного прохождения теста
function handlerOpenReplayTest() {
    try {
        router.push({ query: { replay: 'true' } });
    } catch (err) {
        console.error('/src/components/MainComponents/testOpen/student/signCheckComp.vue:  handlerOpenReplayTest => ', err);
        throw err;
    }
}



</script>

<style scoped>
.notice-nochecked-block {
    background-color: var(--dialog-bg);
    box-shadow: var(--shadow);
    border-radius: 5px;
}
.notice-nochecked-icon {
    font-size: 4rem;
    color: var(--success-color);
}
.notice-nochecked-icon.failed {
    color: var(--required-color);
}
.notice-nochecked-icon.nocheck {
    color: var(--warn-color);
}
.notice-nochecked-title {
    border-bottom: 2px solid var(--basic-border-color);
}
</style>