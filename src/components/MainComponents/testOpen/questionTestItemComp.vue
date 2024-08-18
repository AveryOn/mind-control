<template>
    <article class="question-test relative px-5 py-3">
        <Badge class="no" :value="props.questionData.number"></Badge>
        <h1 class="question-test-title pb-2 mx-2">
            {{ props.questionData.question }}
        </h1>

        <!-- Блок отображается после нажатия на кнопку "Ответить". Здесь выводится ответ -->
        <div class="pt-2" v-show="hasAnswer === true">
            <span>Ваш ответ:</span>
            <div class="block-answer px-5 py-1 mt-2 mx-2" v-if="props.questionData.type === 'text'">{{ textField }}</div>
            <div class="block-answer px-5 py-1 mt-2 mx-2" v-if="props.questionData.type === 'radio'">{{ radioField }}</div>
            <div class="block-answer px-5 py-1 mt-2 mx-2" v-if="props.questionData.type === 'checkbox'">
                <Tag 
                class="ml-2 my-2 shadow-2"
                v-for="answer in checkboxAnswers"
                :key="answer"
                :value="answer"
                ></Tag>
            </div>
        </div>

        <!-- Блок для формы ответа (ОТЛИЧАЕТСЯ В ЗАВИСИМОСТИ ОТ ТИПА ВОПРОСА) -->
        <div class="pt-3" v-show="hasAnswer === false">
            <!-- TEXT -- Ответ -->
            <Textarea v-if="props.questionData.type === 'text'" class="w-full" v-model="textField" placeholder="Ответ" rows="3" />

            <!-- RADIO  --  Ответ -->
            <div v-if="props.questionData.type === 'radio'" class="pt-3 px-5 flex flex-column gap-4">
                <div v-for="variant in radioVariants" :key="variant.answer" class="flex items-center">
                    <RadioButton v-model="radioField" :inputId="variant.answer" name="dynamic" :value="variant.answer" />
                    <label class="ml-2 font-bold" :for="variant.answer">{{ variant.answer }}</label>
                </div>
            </div>

            <!-- CHECKBOX  --  Ответ -->
            <div v-if="props.questionData.type === 'checkbox'" class="flex flex-column pt-3 px-5 gap-4">
                <div v-for="variant of checkboxVariants" :key="variant.answer" class="flex items-center">
                    <Checkbox v-model="checkboxAnswers" :inputId="variant.answer" name="category" :value="variant.answer" />
                    <label class="ml-2 font-bold" :for="variant.answer" >{{ variant.answer }}</label>
                </div>
            </div>
        </div>

        <!-- БЛОК ПЕРИФЕРИИ -->
        <div class="w-full flex justify-content-end mt-3">
            <!-- Кнопка  -  ОТВЕТИТЬ -->
            <Button 
            v-show="!hasAnswer"
            class="" 
            label="Ответить" 
            @click="handlerAnswer"
            text 
            raised 
            icon="pi pi-check" 
            style="color: var(--test-item-color);" 
            />
            <!-- Кнопка  -  ИЗМЕНИТЬ -->
            <Button 
            v-show="hasAnswer"
            class="" 
            label="Изменить" 
            @click="hasAnswer = false"
            text 
            raised 
            severity="warn"
            icon="pi pi-pencil" 
            />
        </div>
    </article>
</template>

<script setup lang="ts">
import type { Question } from '@/types/testTypes';
import type { Ref } from 'vue';
import { defineProps, defineEmits, onMounted, ref } from 'vue';

const props = defineProps<{
    questionData: Question;
    initialValue?: { answer: any, questionId: number },
}>();

const emit = defineEmits({
    updateAnswer: (answer: { answer: any, questionId: number }) => true,
});

const textField: Ref<any> = ref('');
const radioField: Ref<any> = ref(null);
const checkboxAnswers: Ref<any> = ref<{ answer: string | number }[]>([]);
const hasAnswer = ref(false);
const radioVariants: Ref<{ answer: string }[]> = ref([]);
const checkboxVariants: Ref<{ answer: string }[]> = ref([]);


function handlerAnswer() {
    try {
        let draftAnswers: { answer: any, questionId: number }[] = JSON.parse(localStorage.getItem(`draft_test_${props.questionData.testId}_in_process`)!);
        draftAnswers = draftAnswers.map((answer) => {
            if(answer.questionId === props.questionData.id) {
                if(props.questionData.type === 'checkbox') {
                    answer.answer = checkboxAnswers.value;
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
        localStorage.setItem(`draft_test_${props.questionData.testId}_in_process`, JSON.stringify(draftAnswers));
        hasAnswer.value = true;
        let readyAnswer: any = { answer: null, questionId: null };
        if(props.questionData.type === 'checkbox') readyAnswer = { answer: checkboxAnswers.value, questionId: props.questionData.id };
        if(props.questionData.type === 'radio') readyAnswer = { answer: radioField.value, questionId: props.questionData.id };
        if(props.questionData.type === 'text') readyAnswer = { answer: textField.value, questionId: props.questionData.id };
        emit('updateAnswer', readyAnswer, );
    } catch (err) {
        console.error('/src/components/MainComponents/testOpen/questionTestItemComp.vue: handlerAnswer => ', err);
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
                checkboxAnswers.value = props.initialValue.answer;
                if(!!props.initialValue.answer) hasAnswer.value = true;
            }
            if(props.questionData.type === 'radio' && props.questionData.id === props.initialValue.questionId) {
                radioField.value = props.initialValue.answer;
                if(!!props.initialValue.answer) hasAnswer.value = true;
            }
            if(props.questionData.type === 'text' && props.questionData.id === props.initialValue.questionId) {
                textField.value = props.initialValue.answer;
                if(!!props.initialValue.answer) hasAnswer.value = true;
            }
        }
    } catch (err) {
        console.error('/src/components/MainComponents/testOpen/questionTestItemComp.vue: initQuestionData => ', err);
        throw err;
    }
}

onMounted(() => {
    try {
        initQuestionData();
    } catch (err) {
        console.error('/src/components/MainComponents/testOpen/questionTestItemComp.vue: onMounted => ', err);
        throw err;
    }
});

</script>

<style scoped>
.no {
    position: absolute;
    left: 1px;
    top: 1px;
}
.question-test {
    width: 600px;
    height: max-content;
    height: max-content;
    background-color: var(--test-item-bg);
    flex: 0 0 auto;
    box-shadow: var(--shadow);
    border-radius: 5px;
}
.question-test + .question-test {
    margin-top: 2rem;
}
.question-test-title {
    color: var(--test-item-color);
    border-bottom: 2px solid var(--basic-border-color);
}
.block-answer {
    background-color: var(--test-item-answer-text-bg);
    font-weight: bolder;
    font-size: 1.14rem;
    letter-spacing: 1px;
    border-radius: 4px;
}
</style>