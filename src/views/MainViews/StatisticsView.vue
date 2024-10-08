<template>
    <div 
    class="w-full h-full overflow-auto flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Статистика</h1>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 py-4" style="width: 98%;">

            <!-- БЛОК ОБЩЕЙ ИНФОРМАЦИИ -->
            <div class="general-info-block w-max flex align-items-start justify-content-start gap-4">
                <!-- ОБЩЕЕ КОЛ_ВО ТЕСТОВ -->
                <div class="statistic-block flex align-items-center">
                    <h1 class="font-medium">Всего тестов:</h1>
                    <span class="statistic-block-num-value ml-3">NaN</span>
                </div>

                <!-- КОЛ_ВО ВЫПОЛНЕННЫХ ТЕСТОВ -->
                <div class="statistic-block flex align-items-center">
                    <h1 class="font-medium">Выполненных тестов:</h1>
                    <span class="statistic-block-num-value ml-3">NaN</span>
                </div>

                <!-- КОЛ_ВО ТЕСТОВ КОТОРЫЕ ОЖИДАЮТ ПРОВЕРКИ -->
                <div class="statistic-block flex align-items-center">
                    <h1 class="font-medium">Ожидают проверки:</h1>
                    <span class="statistic-block-num-value ml-3">NaN</span>
                </div>
                <pieComp />
            </div>

            <!-- БЛОК СПИСКА ВЫПОЛНЕННЫХ ПРОВЕРЕННЫХ ТЕСТОВ  -->
            <div class="list-block w-full mt-3">
                <h1 class="font-medium text-3xl mb-2">Вывести статистику по тесту</h1>
                <div class="checked-tests-block statistic-block pt-3 pb-2 px-3">
                    <!-- Спиннер загрузки данных -->
                    <ProgressSpinner 
                    v-if="isLoadingListTests" 
                    style="width: 30px; height: 30px" 
                    strokeWidth="4" 
                    fill="transparent"
                    animationDuration=".5s" 
                    aria-label="Custom ProgressSpinner" 
                    />
                    <h2 v-else-if="!testList.length && !isLoadingListTests" class="light-text text-lg w-max mx-auto mb-2" v-show="!testList.length">Здесь будут отображаться тесты, которые вы выполнили</h2>
                    <testCheckedItemComp
                    v-else-if="testList.length && !isLoadingListTests"
                    v-show="testList.length"
                    v-for="test in testList" 
                    @open-statistics-test="(testData: Test | TestTeacher) => openStatisticsTest(testData)"
                    :test-data="test"
                    :key="test.id"
                    />
                </div>
            </div>

            <!-- Блок информации по результатам запрошенного теста -->
            <resultsBlockComp 
            v-if="isShowResultsForTest" 
            :test-name="testName"
            :is-loading-data="isLoadingListResults"
            @open-result="handlerOpenResult"
            />

            <!-- Блок данных открытого результата -->
            <openResultComp 
            v-else-if="isShowOpenResult" 
            :is-loading-data="isLoadingOpenResult"
            />

            <!-- БЛОК ОБЩЕЙ СТАТИСТИКИ ЗА КАКОЕ-ТО ВРЕМЯ -->
            <div class="w-full my-4">
                <h1 class="font-medium text-3xl mb-4">Общая статистика</h1>
                <barComp />
            </div>

        </section>
    </div>
</template>

<script setup lang="ts">
import resultsBlockComp from '@/components/MainComponents/statistics/studentStatistics/resultsBlockComp.vue';
import openResultComp from '@/components/MainComponents/statistics/studentStatistics/openResultComp.vue';
import { useMainStore } from '@/stores/mainStore';
import testCheckedItemComp from '@/components/MainComponents/statistics/testCheckedItemComp.vue';
import pieComp from '@/components/MainComponents/statistics/pieComp.vue';
import barComp from '@/components/MainComponents/statistics/barComp.vue';
import type { Test, TestTeacher } from '@/types/testTypes';
import { onMounted, reactive, ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TestsView from './TestsView.vue';
import { getTestsStudent } from '@/api/testsApi';
import { getResultByIdStd, getResultsStd } from '@/api/resultsApi';

// #############################################   COMPOSABLES   #############################################
const store = useMainStore();
const route = useRoute();
const router = useRouter();


// #############################################   DATA   #############################################
const testName: Ref<string | null> = ref<string | null>(null);
const isShowResultsForTest = ref(false);
const isShowOpenResult = ref(false);
const isLoadingOpenResult = ref(false);
const isLoadingListResults = ref(false);
const isLoadingListTests = ref(false);
const testList: Ref<TestTeacher[]> = ref<TestTeacher[]>([]);
const paginationTests = reactive({
    page: 1,
    perPage: 15,
});
const paginationResults = reactive({
    page: 1,
    perPage: 15,
});


// #############################################   METHODS   #############################################
// Открыть результаты теста
function openStatisticsTest(testData: Test | TestTeacher) {
    try {
        router.push({ query: { 'open_statistic_test_id': testData.id } });
        isShowResultsForTest.value = true;
    } catch (err) {
        console.error('views/MainViews/StatisticsView.vue: openStatisticsTest => ', err);
        throw err;
    }
}

// Обработчик открытия результата
async function handlerOpenResult(resultId: number) {
    try {
        isLoadingOpenResult.value = true;
        // Установка query-параметра
        router.push({ query: { ...route.query, 'open_result_id': resultId } });
        isShowResultsForTest.value = false;
        isShowOpenResult.value = true;
        const testId: any = route.query['open_statistic_test_id'];
        if(testId && +testId === +testId) {
            const { data: { result }, meta } = await getResultByIdStd({ resultId, testId: +testId });
            store.openResultStudent = result;
        }
    } catch (err) {
        console.error('views/MainViews/StatisticsView.vue: handlerOpenResult => ', err);
        throw err;
    } finally {
        isLoadingOpenResult.value = false;
    }
}

// Получение списка результов текущего теста
async function handlerFetchResults(testId: number) {
    try {
        isLoadingListResults.value = true;
        const { data: { results } , meta } = await getResultsStd({ testId, page: paginationResults.page, perPage: paginationResults.perPage });
        store.statisticsResultsStudents = results;
        testList.value.forEach((test) => {
            if(test.id === testId) testName.value = test.title;
        })
    } catch (err) {
        console.error('views/MainViews/StatisticsView.vue: handlerFetchResults => ', err);
        throw err;
    } finally {
        isLoadingListResults.value = false;
    }
}

// Получение списка тестов
async function handlerFetchListTests() {
    try {
        isLoadingListTests.value = true;
        const { data: { tests }, meta } = await getTestsStudent(paginationTests.page, paginationTests.perPage, true);
        testList.value = tests;
    } catch (err) {
        console.error('views/MainViews/StatisticsView.vue: handlerFetchListTests => ', err);
        throw err;
    } finally {
        isLoadingListTests.value = false;
    }
}

// #############################################   WATCH   #############################################
// Наблюдение за изменением параметра запроса open_result_id
watch(() => route.query['open_result_id'], (newId, oldId) => {
    // Если при изменении open_result_id он существует то открываем результат
    if(!!newId) {
        if(newId !== oldId) {
            isShowResultsForTest.value = false;
            isShowOpenResult.value = true;
        }
    } 
    // Если при изменении open_result_id он НЕ существует
    else {
        // Если существует open_statistic_test_id то открывает список результатов открытого теста
        if(!!route.query['open_statistic_test_id']) {
            isShowResultsForTest.value = true;
            isShowOpenResult.value = false;
        }
        else {
            isShowResultsForTest.value = false;
            isShowOpenResult.value = false;
        }
    }
});

// Наблюдение за изменением параметра запроса open_statistic_test_id
watch(() => route.query['open_statistic_test_id'], async (newId, oldId) => {
    // Если при изменении open_statistic_test_id его НЕ существует то скрываем все блоки касаемые информации теста
    if(!newId) {
        if(newId !== oldId) {
            isShowResultsForTest.value = false;
            isShowOpenResult.value = false;
        }
    }
    // Если при изменении open_statistic_test_id он существует, то открываем блок результатов данного теста
    else if(!!newId) {
        isShowResultsForTest.value = true;
        await handlerFetchResults(+newId);
    }
});


// #############################################   LIFECYCLE HOOKS   #############################################
onMounted(async () => {
    // Инициализация данных (STUDENT)
    if(store.appRole === 'student') {
        try {
            // Получение списка тестов (STUDENT)
            await handlerFetchListTests();
        } catch (err) {
            console.error('views/MainViews/StatisticsView.vue: onMounted[handlerFetchListTests] => ', err);
            throw err;
        }
    
        // Если при загрузке есть query-параметр open_statistic_test_id то выполняем запрос результатов по тесту
        if(route.query['open_statistic_test_id'] && !route.query['open_result_id']) {
            isShowResultsForTest.value = true;
            // Получение списка результатов по ID теста
            try {
                await handlerFetchResults(+route.query['open_statistic_test_id']);
            } catch (err) {
                console.error('views/MainViews/StatisticsView.vue: onMounted[handlerFetchResults] => ', err);
                throw err;
            }
        } 
    
        // Если и open_statistic_test_id И open_result_id существуют, то открывается окно с данными результата
        else if (route.query['open_statistic_test_id'] && route.query['open_result_id']) {
            isShowOpenResult.value = true;
            try {
                // Получение данных результата с сервера по его ID
                await handlerOpenResult(+route.query['open_result_id']);
            } catch (err) {
                console.error('views/MainViews/StatisticsView.vue: onMounted[handlerOpenResult] => ', err);
                throw err;
            }
        } 
        // Если нет query-параметров отключаются все окна касаемые статистики теста
        else {
            isShowResultsForTest.value = false;
            isShowOpenResult.value = false;
        }
    }
});

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