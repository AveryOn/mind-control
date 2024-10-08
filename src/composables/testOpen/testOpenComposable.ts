import { useMainStore } from '@/stores/mainStore';
import type { Result, Test, TestStudent, TestTeacher } from '@/types/testTypes';
import { onBeforeUnmount, onMounted, reactive, ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getQuestionsStudent } from '@/api/questionsApi';
import { getTestByIdStudent, getTestByIdTeacher } from '@/api/testsApi';
import { createResultStudent, getResultsTchr } from '@/api/resultsApi';
import { nextTick } from 'vue';
import { computeFilledPercent } from '@/utils/computed';


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
    const durationComplete: Ref<number> = ref(0);
    const pagination = reactive({
        page: 1,
        perPage: 20,
    });

    // #########################################   METHODS   #########################################
    function initDraftTestInProcess() {
        try {
            if(store.opennedTest && (!store.opennedTest?.result || route.query['replay'] === 'true')) {
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
            }
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

    // Подтвердить создание результата теста (Ученик)
    async function confirmSendTest() {
        try {
            isLoadingSendTest.value = true;
            draftAnswers.value = draftAnswers.value.map((answ) => {
                if(Array.isArray(answ.answer)) return { ...answ, answer: JSON.stringify(answ.answer) }
                return answ;
            });
            if(testData.value && store.userData) {
                // Отправка запроса на создание
                const { data, meta } = await createResultStudent({ 
                    answers: draftAnswers.value, 
                    duration: durationComplete.value, 
                    testId: testData.value.id, 
                });
            }
            // Очистка черновика
            localStorage.removeItem(`draft_test_${+route.params.testId}_in_process`);
            router.push({ name: 'tests' }).then(() => window.location.reload());
        } catch (err) { 
            console.error(`${import.meta.url}: confirmSendTest => `, err);
            throw err;
        } finally { 
            isLoadingSendTest.value = false; 
            isShowConfirmDialog.value = false; 
        }
    }

    // вычислить количество ответов на данный момент (Нужно для вычисления процента выполненности теста на момент выполнения)
    function countFilledState() {
        try {
            let countFilled = 0;
            draftAnswers.value?.forEach((answer) => {
                if(!!answer.answer) countFilled++;
            });
            return countFilled;
        } catch (err) {
            console.error('/src/views/MainViews/TestOpenView.vue: countFilledState => ', err);
            throw err;
        }
    }

    // 
    function updateAnswer({ answer, questionId }: { answer: any, questionId: number }, index: number) {
        try {
            
            draftAnswers.value[index] = { answer: answer, questionId: questionId };
            // Обновление прогрессбара выполненности теста
            meterValue.value[0].value = computeFilledPercent(countFilledState(), store.currentTestQuestions.length);
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

    // Обращение к серверу для получения полезных данных и их инициализация в компоненте (STUDENT)
    async function mountedInitDataStd() {
        // Получение текущего теста по его ID и загрузка вопросов для текущего теста (Ученик)
        try {
            isLoadingInitialData.value = true;
            const { data: { test }, meta } = await getTestByIdStudent(+route.params.testId)
            testData.value = test;
            store.opennedTest = test;
            if(!test.result || route.query['replay'] === 'true') {
                const { data: { questions } } = await getQuestionsStudent(+route.params.testId);
                store.currentTestQuestions = questions;
                draftAnswers.value = initDraftTestInProcess();
                meterValue.value[0].value = computeFilledPercent(countFilledState(), store.currentTestQuestions.length) ?? 0;
            }
        } catch (err) {
            console.error('/src/views/MainViews/TestOpenView.vue: mountedInitData => ', err);
            throw err;
        } finally {
            isLoadingInitialData.value = false;
        }
    }

    // Обращение к серверу для получения полезных данных и их инициализация в компоненте (ADMIN | TEACHER)
    async function mountedInitDataTchr() {
        // Получение результатов для текущего теста (Учитель)
        try {
            isLoadingInitialData.value = true;
            // Получение теста
            const { data: { test } } = await getTestByIdTeacher(+route.params.testId);
            testData.value = test;
            store.opennedTest = test;
            // Получение результатов теста   
            const { data: { results }, meta } = await getResultsTchr({ testId: testData.value?.id, page: pagination.page, perPage: pagination.perPage });
            store.resultsTestForTeacher = results;
        } catch (err) {
            console.error('/src/views/MainViews/TestOpenView.vue: mountedInitDataTchr => ', err);
            throw err;
        } finally {
            isLoadingInitialData.value = false;
        }
    }

    // #########################################   WATCH   #########################################
    // Инициализация данных для Ученика если страница открывается с query-параметром reply (STUDENT)
    watch(() => route.query['replay'], async (newValue) => {
        if(newValue === 'true' && store.appRole === 'student') {
            await mountedInitDataStd();
        }
    });

    // #########################################   LIFECYCLE HOOKS   #########################################
    onMounted(async () => {
        await nextTick()
        // Обращение к серверу для получения полезных данных и их инициализация в компоненте (STUDENT)
        if(store.appRole === 'student') {
            // Получение текущего теста по его ID и загрузка вопросов для текущего теста (STUDENT)
            await mountedInitDataStd();
        } 
        // Обращение к серверу для получения полезных данных и их инициализация в компоненте (ADMIN | TEACHER)
        else if (store.appRole === 'teacher') {
            await mountedInitDataTchr();
        }
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