<template>
    <!-- #############################   ДЛЯ УЧЕНИКА  ####################################### -->
    <TestOpenForStudent
    v-if="store.appRole === 'student'"
    :test-data="testData"
    :meter-value="meterValue"
    :is-loading-initial-data="isLoadingInitialData"
    :draft-answers="draftAnswers"
    :is-show-confirm-dialog="isShowConfirmDialog"
    :is-loading-send-test="isLoadingSendTest"
    @update-answer="(data, index) => updateAnswer(data, index)"
    @close-confirm-dialog="isShowConfirmDialog = false"
    @confirm-send-test="confirmSendTest"
    @prepare-confirm-test="prepareConfirmTest"
    ></TestOpenForStudent>

    <!-- #############################   ДЛЯ УЧИТЕЛЯ  ####################################### -->
    <div v-else-if="store.appRole === 'teacher'" class="w-full h-full overflow-hidden flex flex-column align-items-stretch">
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">
            Тесты <span class="nest-piece">></span> 
            {{ testData?.title }} <span class="nest-piece">></span> Результаты
        </h1>
        <section class="h-full overflow-auto px-5 pb-4 pt-3">
            <div class="w-full h-max shadow-3" style="border-radius: var(--datatable-border-radius)">
                <DataTable 
                class="border-round-lg"
                :value="store.resultsTestForTeacher" 
                tableStyle="min-width: 50rem"
                :size="'small'"
                :selectionMode="'single'"
                :showGridlines="true"
                @row-click="(event) => handlerOpenResultForCheck(event.data)"
                >
                    <Column class="px-5 text-center" field="id" header="ID результата" style="width: 5%"></Column>
                    <Column class="text-center" field="userId" header="ID ученика" style="width: 5%"></Column>
                    <Column class="text-center" field="testId" header="ID теста" style="width: 5%"></Column>
                    <Column class="text-center" field="isSuccess" header="Тест пройден" style="width: 8%">
                        <template #body="{ data }">
                            <span v-if="data.isChecked === false"><i class="warn-fg pi pi-hourglass font-bold" style="font-size: 1.2rem"></i></span>
                            <span v-else-if="data.isSuccess"><i class="success-fg pi pi-verified" style="font-size: 1.2rem"></i></span>
                            <span v-else-if="!data.isSuccess"><i class="failed-fg pi pi-times" style="font-size: 1.2rem"></i></span>
                        </template>
                    </Column>
                    <Column class="text-center" field="successCount" header="Кол-во правильных ответов" style="width: 10%">
                        <template #body="{ data }">
                            <span v-if="data.successCount">
                                <Tag class="relative" style="min-width: 2rem;">
                                    <template #default>
                                        {{ data.successCount }}
                                        <span class="absolute ml-2 font-medium" style="color: gray; right: -2.5rem;">из {{ data.questionsCount }}</span>
                                    </template>
                                </Tag>
                            </span>
                        </template>
                    </Column>
                    <Column class="text-center" field="isChecked" header="Проверено" style="width: 10%">
                        <template #body="{ data }">
                            <span v-if="data.isChecked === true"><i class="success-fg pi pi-check" style="font-size: 1.2rem"></i></span>
                            <span v-else-if="data.isChecked === false"><i class="failed-fg pi pi-times" style="font-size: 1.2rem"></i></span>
                        </template>
                    </Column>
                    <Column class="text-center" field="checkDate" header="Дата проверки" style="width: 10%">
                        <template #body="{ data }">
                            <span v-if="data.checkDate">{{ formattedDateByTemplate(data.checkDate) }}</span>
                            <span v-else class="font-bold text-xl">-</span>
                        </template>
                    </Column>
                    <Column class="text-center" field="duration" header="Время выполнения" style="width: 10%">
                        <template #body="{ data }">
                            <span>{{ computeMinutesByMs(data.duration) }} мин.</span>
                        </template>
                    </Column>
                    <Column class="text-center" field="createdAt" header="Дата выполнения" style="width: 10%">
                        <template #body="{ data }">
                            <span>{{ formattedDateByTemplate(data.createdAt) }}</span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import type { Result, Test, TestStudent, TestTeacher } from '@/types/testTypes';
import { onBeforeUnmount, onMounted, ref, type Ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { computeMinutesByMs, formattedDateByTemplate } from '@/utils/timeUtils';
import { getQuestionsStudent } from '@/api/questionsApi';
import { getTestByIdStudent } from '@/api/testsApi';
import TestOpenForStudent from '@/components/MainComponents/testOpen/student/testOpenForStudent.vue';

const store = useMainStore();
const route = useRoute();
const router = useRouter();

const isLoadingSendTest = ref(false);
const isLoadingInitialData = ref(false);
const isShowConfirmDialog = ref(false);
const meterValue = ref([{ label: 'Выполнено', value: 0, color: 'var(--meter-basic-filled)', icon: '' }]);
const testData: Ref<null | Test | TestStudent | TestTeacher> = ref(null);
const draftAnswers: Ref<{answer: any, questionId: number}[]> = ref([]);

function initDraftTestInProcess() {
    try {
        let draftTestInProcess: any = localStorage.getItem(`draft_test_${testData.value?.id}_in_process`);
        if(!draftTestInProcess) {
            draftTestInProcess = [];
            store.currentTestQuestions.forEach((question) => {
                draftTestInProcess.push({ answer: null, questionId: question.id });
            });
            localStorage.setItem(`draft_test_${testData.value?.id}_in_process`, JSON.stringify(draftTestInProcess));
            return draftTestInProcess;
        }
        draftTestInProcess = JSON.parse(draftTestInProcess);
        return draftTestInProcess;
    } catch (err) {
        console.error('/src/views/MainViews/TestOpenView.vue: initDraftTestInProcess => ', err);
        throw err;
    }
}

function prepareConfirmTest() {
    try {
        isShowConfirmDialog.value = true;

    } catch (err) {
        console.error('/src/views/MainViews/TestOpenView.vue: prepareConfirmTest => ', err);
        throw err;
    }
}

function confirmSendTest() {
    try {
        isLoadingSendTest.value = true;
        
    } catch (err) {
        console.error('/src/views/MainViews/TestOpenView.vue: confirmSendTest => ', err);
        throw err;
    } finally {
        isLoadingSendTest.value = false;
    }
}

function computeFilledPercent(currentFilledCount: number) {
    try {
        const total = store.currentTestQuestions.length;
        let filledPerc =  Math.ceil(currentFilledCount / (total / 100));
        return filledPerc
    } catch (err) {
        console.error('/src/views/MainViews/TestOpenView.vue: computeFilledPercent => ', err);
        throw err;
    }
}

function countFilledState() {
    try {
        let countFilled = 0;
        draftAnswers.value.forEach((answer) => {
            if(!!answer.answer) countFilled++;
        });
        return countFilled;
    } catch (err) {
        console.error('/src/views/MainViews/TestOpenView.vue: countFilledState => ', err);
        throw err;
    }
}

function updateAnswer({ answer, questionId }: { answer: any, questionId: number }, index: number) {
    try {
        draftAnswers.value[index] = { answer: answer, questionId: questionId };
        meterValue.value[0].value = computeFilledPercent(countFilledState());
    } catch (err) {
        console.error('/src/views/MainViews/TestOpenView.vue: updateAnswer => ', err);
        throw err;
    }
}


function handlerOpenResultForCheck(data: Result) {
    try {
        router.push({ name: 'checkResult', params: { testId: data.testId, resultId: data.id } });
    } catch (err) {
        console.error('/src/views/MainViews/TestOpenView.vue: handlerOpenResultForCheck => ', err);
        throw err;
    }
}

onMounted(async () => {
    // ЗАПРОС НА СЕРВЕР (STUDENT)
    if(store.appRole === 'student') {
    // Получение текущего теста по его ID и загрузка вопросов для текущего теста
    try {
        isLoadingInitialData.value = true;
        const { data: { test }, meta } = await getTestByIdStudent(+route.params.testId)
        testData.value = test;
        store.opennedTest = test;
        const { data: { questions } } = await getQuestionsStudent(+route.params.testId);
        store.currentTestQuestions = questions;
        draftAnswers.value = initDraftTestInProcess();
        meterValue.value[0].value = computeFilledPercent(countFilledState()) ?? 0;
    } catch (err) {
        console.error('/src/views/MainViews/TestOpenView.vue: onMounted => ', err);
        throw err;
    } finally {
        isLoadingInitialData.value = false;
    }
    } 
    // ЗАПРОС НА СЕРВЕР (TEACHER)
    // else if (store.appRole === 'teacher') {
    //     if(store.opennedTestForCheck) {
    //         testData.value = store.opennedTestForCheck;
    //     } else {
    //         store.tests.forEach((test) => {
    //             if(test.id === +route.params.testId) {
    //                 testData.value = test;
    //                 store.opennedTestForCheck = test;
    //             }
    //         });
    //     }
    // }
});
onBeforeUnmount(() => {
    store.opennedTest = null;
});


</script>

<style scoped>




</style>