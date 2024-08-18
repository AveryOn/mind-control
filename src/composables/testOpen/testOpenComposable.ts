import { useMainStore } from '@/stores/mainStore';
import type { Result, Test, TestStudent, TestTeacher } from '@/types/testTypes';
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getQuestionsStudent } from '@/api/questionsApi';
import { getTestByIdStudent } from '@/api/testsApi';

// Необходим для работы компонента открытого теста (Ученик / Учитель / Админ) 
export default function useTestOpen() {
    // #########################################   COMPOSABLES   #########################################
    const store = useMainStore();
    const route = useRoute();
    const router = useRouter();

    // #########################################   DATA   #########################################
    const isLoadingSendTest = ref(false);
    const isLoadingInitialData = ref(false);
    const isShowConfirmDialog = ref(false);
    const meterValue = ref([{ label: 'Выполнено', value: 0, color: 'var(--meter-basic-filled)', icon: '' }]);
    const testData: Ref<null | Test | TestStudent | TestTeacher> = ref(null);
    const draftAnswers: Ref<{answer: any, questionId: number}[]> = ref([]);

    // #########################################   METHODS   #########################################
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

    // Открыть диалоговое окно для подтверждения создания результата теста (Ученик)
    function prepareConfirmTest() {
        try {
            isShowConfirmDialog.value = true;
            console.log('prepareConfirmTest');
        } catch (err) {
            console.error(`${import.meta.url}: prepareConfirmTest => `, err);
            throw err;
        }
    }

    // Подтвердить создания результата теста (Ученик)
    function confirmSendTest() {
        try {
            isLoadingSendTest.value = true;
            console.log('confirmSendTest');
        } catch (err) {
            console.error(`${import.meta.url}: confirmSendTest => `, err);
            throw err;
        } finally {
            isLoadingSendTest.value = false;
            isShowConfirmDialog.value = false;
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


    // #########################################   LIFECYCLE HOOKS   #########################################
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

    return {
        // Data
        store,
        isLoadingSendTest,
        isLoadingInitialData,
        isShowConfirmDialog,
        meterValue,
        testData,
        draftAnswers,
        // Methods
        prepareConfirmTest,
        confirmSendTest,
        updateAnswer,
        handlerOpenResultForCheck,
    }
}