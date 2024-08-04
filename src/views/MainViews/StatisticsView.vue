<template>
    <div 
    class="w-full h-full overflow-auto flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Статистика</h1>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 py-4" style="width: 98%; border: 1px solid black;">

            <!-- БЛОК ОБЩЕЙ ИНФОРМАЦИИ -->
            <div class="general-info-block w-max flex align-items-start justify-content-start gap-4">
                <!-- ОБЩЕЕ КОЛ_ВО ТЕСТОВ -->
                <div class="statistic-block flex align-items-center">
                    <h1 class="font-medium">Всего тестов:</h1>
                    <span class="statistic-block-num-value ml-3">15</span>
                </div>

                <!-- КОЛ_ВО ВЫПОЛНЕННЫХ ТЕСТОВ -->
                <div class="statistic-block flex align-items-center">
                    <h1 class="font-medium">Выполненных тестов:</h1>
                    <span class="statistic-block-num-value ml-3">5</span>
                </div>

                <!-- КОЛ_ВО ТЕСТОВ КОТОРЫЕ ОЖИДАЮТ ПРОВЕРКИ -->
                <div class="statistic-block flex align-items-center">
                    <h1 class="font-medium">Ожидают проверки:</h1>
                    <span class="statistic-block-num-value ml-3">2</span>
                </div>
                <pieComp />
            </div>

            <!-- БЛОК СПИСКА ВЫПОЛНЕННЫХ ПРОВЕРЕННЫХ ТЕСТОВ  -->
            <div class="list-block w-full mt-3">
                <h1 class="font-medium text-3xl">Вывести статистику по тесту</h1>
                <div class="checked-tests-block statistic-block pt-3 pb-2 px-3">
                    <testCheckedItemComp
                    v-for="test in testList" 
                    @open-statistics-test="(testData: Test) => openStatisticsTest(testData)"
                    :test-data="test"
                    :key="test"
                    />
                </div>
            </div>

            <!-- БЛОК ОБЩЕЙ СТАТИСТИКИ ЗА КАКОЕ-ТО ВРЕМЯ -->
            <div class="w-full my-4">
                <h1 class="font-medium text-3xl mb-4">Общая статистика</h1>
                <barComp />
            </div>

        </section>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import testCheckedItemComp from '@/components/MainComponents/statistics/testCheckedItemComp.vue';
import pieComp from '@/components/MainComponents/statistics/pieComp.vue';
import barComp from '@/components/MainComponents/statistics/barComp.vue';
import type { Test } from '@/types/testTypes';
import { ref, type Ref } from 'vue';

const store = useMainStore();

const testList: Ref<Test[]> = ref<Test[]>([
    { 
        id: 1,
        title: 'Tested Test',
        summary: 'Something Tested Summary',
        group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
        participants: [{ id: 1, createdAt: '124124', login: 'alex@123', name: 'Alex Some', updatedAt: '123124' }],
        questions: [{number: 1, question: 'How many time?', type: 'text'}],
    },
    { 
        id: 2,
        title: 'Second Test',
        summary: 'Something Second Summary',
        group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
        participants: [{ id: 1, createdAt: '124124', login: 'alex@123', name: 'Alex Some', updatedAt: '123124' }],
        questions: [{number: 1, question: 'How many time?', type: 'text'}],
    },
    { 
        id: 3,
        title: 'Third Test',
        summary: 'Something Third Summary',
        group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
        participants: [{ id: 1, createdAt: '124124', login: 'alex@123', name: 'Alex Some', updatedAt: '123124' }],
        questions: [{number: 1, question: 'How many time?', type: 'text'}],
    },

]);

function openStatisticsTest(testData: Test) {
    try {
        // 
    } catch (err) {
        console.error('views/MainViews/StatisticsView.vue: openStatisticsTest => ', err);
        throw err;
    }
}

</script>

<style scoped>
.general-info-block {
    border-bottom: 2px solid var(--statistic-separator-color);
    padding-bottom: 1rem;
}
.checked-tests-block {
    width: 100%; 
    overflow-x: auto; 
    white-space: nowrap; 
    display: flex;
}
.list-block {
    border-bottom: 2px solid var(--statistic-separator-color);
    padding-bottom: 2rem;
}

</style>