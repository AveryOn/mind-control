import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';

// Необходим для работы questionTestItemComp.vue (Элемента вопроса в тесте)
export default function useQuestionTestItem(props: any, emit: any) {

    // #########################################   DATA   #########################################
    const textField: Ref<any> = ref('');
    const radioField: Ref<any> = ref(null);
    const checkboxAnswers: Ref<any> = ref<{ answer: string | number }[]>([]);
    const hasAnswer = ref(false);
    const radioVariants: Ref<{ answer: string }[]> = ref([]);
    const checkboxVariants: Ref<{ answer: string }[]> = ref([]);


    // #########################################   METHODS   #########################################

    // Обработчик ответа на вопрос
    function handlerAnswer() {
        try {
            // Извлечение существующего черновика ответов на вопросы
            let draftAnswers: { answer: any, questionId: number }[] = JSON.parse(localStorage.getItem(`draft_test_${props.questionData.testId}_in_process`)!);
            draftAnswers = draftAnswers.map((answer) => {
                // Поиск ответа в массиве черновика для его изменения
                if(answer.questionId === props.questionData.id) {
                    // Если тип вопроса checkbox то значение для этого ответа форматируется в JSON т.к это массив
                    if(props.questionData.type === 'checkbox') {
                        answer.answer = JSON.stringify(checkboxAnswers.value);
                        return answer;
                    }
                    if(props.questionData.type === 'radio') {
                        answer.answer = radioField.value;
                        return answer;
                    }
                    answer.answer = textField.value;
                }
                return answer;
            });
            // Обновление черновика в localStorage
            localStorage.setItem(`draft_test_${props.questionData.testId}_in_process`, JSON.stringify(draftAnswers));
            hasAnswer.value = true;
            let readyAnswer: any = { answer: null, questionId: null };
            if(props.questionData.type === 'checkbox') readyAnswer = { answer: checkboxAnswers.value, questionId: props.questionData.id };
            if(props.questionData.type === 'radio') readyAnswer = { answer: radioField.value, questionId: props.questionData.id };
            if(props.questionData.type === 'text') readyAnswer = { answer: textField.value, questionId: props.questionData.id };
            emit('updateAnswer', readyAnswer, );
        } catch (err) {
            console.error('@/composables/testOpen/questionItemComposable.ts: handlerAnswer => ', err);
            throw err;
        }
    }

    // Функция инициирует данные вопроса. Если черновика по текущему вопросу нет, то заполняются исходные данные вопроса
    function initQuestionData() {
        try {
            // ПО умолчанию сначала заполняются исходные данные самого вопроса, а потом данные которые есть в черновике (если они есть)
            if(props.questionData.radioAnswers) {
                radioVariants.value = props.questionData.radioAnswers;
            }
            if(props.questionData.checkboxAnswers) {
                checkboxVariants.value = props.questionData.checkboxAnswers;
            }
            // Если присутствует черновик
            if(props.initialValue) {
                if(props.questionData.type === 'checkbox' && props.questionData.id === props.initialValue.questionId) {
                    checkboxAnswers.value = JSON.parse(props.initialValue.answer);
                    if(!!props.initialValue.answer) hasAnswer.value = true;
                }
                if(props.questionData.type === 'radio' && props.questionData.id === props.initialValue.questionId) {
                    radioField.value = props.initialValue.answer;
                    if(!!props.initialValue.answer) hasAnswer.value = true;
                }
                if(props.questionData.type === 'text' && props.questionData.id === props.initialValue.questionId) {
                    if(props.initialValue.answer) {
                        textField.value = props.initialValue.answer;
                    }
                    else textField.value = '';
                    if(!!props.initialValue.answer) hasAnswer.value = true;
                }
            }
        } catch (err) {
            console.error('@/composables/testOpen/questionItemComposable.ts: initQuestionData => ', err);
            throw err;
        }
    }

    // #########################################   LIFECYCLE HOOKS   #########################################
    onMounted(() => {
        try {
            initQuestionData();
        } catch (err) {
            console.error('@/composables/testOpen/questionItemComposable.ts: onMounted => ', err);
            throw err;
        }
    });

    return {
        // Data
        textField,
        radioField,
        checkboxAnswers,
        hasAnswer,
        radioVariants,
        checkboxVariants,
        // Methods
        handlerAnswer,
    }
}