<template>
    <div class="w-full h-full overflow-hidden flex flex-column align-items-stretch">
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Тесты <span class="nest-piece">></span> {{ testData?.title }}</h1>


        <!-- НОВЫЙ ТЕСТ -->
        <div v-if="!testData?.result" class="relative h-full overflow-auto flex flex-column align-items-center py-6">
            <div class="meter-block flex justify-content-center">
                <MeterGroup :value="meterValue" />
            </div>

            <questionTestItemComp 
            v-for="(question, index) in questions" 
            @update-answer="(data) => updateAnswer(data, index)"
            :question-data="question"
            :initial-value="draftAnswers[index]"
            :key="question.id"
            />

            <!-- ACTIONS -->
            <div class="mt-5 flex" style="width: 600px;">
                <Dialog v-model:visible="isShowConfirmDialog" modal :header="computeHeaderConfirmDialog" :style="{ width: '38rem' }">
                    <div class="flex justify-content-end gap-2 pr-2">
                        <Button type="button" label="Отмена" severity="secondary" text raised @click="isShowConfirmDialog = false"></Button>
                        <Button type="button" label="Да" :loading="isLoadingSendTest" text raised @click="confirmSendTest"></Button>
                    </div>
                </Dialog>
                <Button
                class="ml-auto"
                label="Завершить" 
                text 
                raised 
                icon="pi pi-upload"
                icon-pos="right"
                @click="prepareConfirmTest"
                />
            </div>
        </div>

        <!-- НЕ ПРОВЕРЕННЫЙ ТЕСТ -->
        <div v-if="testData?.result && testData?.result?.isChecked !== true" class="relative h-full overflow-auto flex flex-column justify-content-center align-items-center py-6">
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

        <!-- ПРОВЕРЕННЫЙ ТЕСТ -->
        <div v-if="testData?.result?.isChecked === true" class="relative h-full overflow-auto flex flex-column justify-content-center align-items-center py-6">
            <div class="notice-nochecked-block w-20rem py-4 px-3 flex flex-column justify-content-center align-items-center">
                <span v-if="testData?.result?.isSuccess === true" class="flex flex-column align-items-center">
                    <i class="notice-nochecked-icon pi pi-check-circle"></i>
                    <h1 class="notice-nochecked-title font-light pb-3">Тест пройден</h1>
                </span>
                <span v-if="testData?.result?.isSuccess === false" class="flex flex-column align-items-center">
                    <i class="notice-nochecked-icon failed pi pi-info-circle mb-2"></i>
                    <h1 class="notice-nochecked-title font-light pb-3">Тест провален</h1>
                </span>
                <div class="flex flex-column align-content-center pt-3 px-3">
                    <span class="font-light text-center">Для того чтобы увидеть результаты теста перейдите в раздел статистики</span>
                    <Button
                    class="w-max mt-3 mx-auto"
                    label="Статистика" 
                    text 
                    raised 
                    size="small"
                    icon="pi pi-chart-bar"
                    @click="router.push({ name: 'statistics' })"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import type { Question, Test } from '@/types/testTypes';
import { onBeforeUnmount, onMounted, ref, type Ref, computed } from 'vue';
import questionTestItemComp from '@/components/MainComponents/testOpen/questionTestItemComp.vue';
import { useRoute, useRouter } from 'vue-router';

const store = useMainStore();
const route = useRoute();
const router = useRouter();

const isLoadingSendTest = ref(false);
const isShowConfirmDialog = ref(false);
const meterValue = ref([{ label: 'Выполнено', value: 55, color: 'var(--meter-basic-filled)' }]);
const testData: Ref<null | Test> = ref(null);
const questions: Ref<Question[]> = ref<Question[]>([]);
const draftAnswers: Ref<{answer: any, questionId: number}[]> = ref([]);

function initDraftTestInProcess() {
    try {
        let draftTestInProcess: any = localStorage.getItem(`draft_test_${testData.value?.id}_in_process`);
        if(!draftTestInProcess) {
            draftTestInProcess = [];
            questions.value.forEach((question) => {
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
        const total = questions.value.length;
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

const computeHeaderConfirmDialog = computed(() => {
    if(meterValue.value[0].value < 100) return 'Вы ответили не на все вопросы. Завершить тест?';
    return 'Вы уверены, что хотите завершить тест?';
})

onMounted(() => {
    if(store.opennedTest) {
        testData.value = store.opennedTest;
    } else {
        // ЗАПРОС НА СЕРВЕР
        store.tests.forEach((test) => {
            if(test.id === +route.params.testId) {
                testData.value = test;
                store.opennedTest = test;
            }
        });
    }
    questions.value = store.currentTestQuestions;
    draftAnswers.value = initDraftTestInProcess();
    meterValue.value[0].value = computeFilledPercent(countFilledState());
});
onBeforeUnmount(() => {
    store.opennedTest = null;
});

</script>

<style scoped>
.meter-block {
    bottom: 2rem;
    right: 5rem;
    position: fixed;
    margin: auto;
    height: max-content;
    padding: 0.3rem 1rem;
    z-index: 99;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: var(--shadow);
}
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