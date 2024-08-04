<template>
    <div class="relative question-block w-30rem flex flex-column align-items-center pt-3 pb-5 my-3">
        <Badge class="question-number" :value="formQuestion.number"></Badge>

        <h2 class="mb-3">Введите вопрос</h2>
        <div class="w-full flex flex-column align-items-center">
            <Textarea 
            v-model="formQuestion.question"
            @update:modelValue="handlerUpdateQuestionQuery"
            class="input w-10" 
            rows="1" cols="50" 
            placeholder="Вопрос" 
            style="resize: vertical" 
            />
        </div>

        <h2 class="my-3">Укажите тип ответа</h2>
        <div class="w-full flex flex-column align-items-center">
            <Select 
            class="input w-10" 
            v-model="formQuestion.type" 
            :options="types"
            size="large" 
            placeholder="Группа"
            :optionLabel="'label'"
            :optionValue="'value'"
            @change="(event) => handlerSelectType(event)"
            ></Select>
        </div>

        <!-- ЕСЛИ тип radio -->
        <div v-show="formQuestion.type === 'radio'" class="answers-block w-full">
            <h2 class="mt-3 mb-2">Введите варианты ответа (radio)</h2>
            <div class="w-full flex flex-column align-items-center">
                <div class="w-10 gap-1 flex flex-wrap align-items-center justify-content-center">
                    <Chip 
                    class="cursor-pointer"
                    :label="radioAnswer.answer" 
                    removable v-for="(radioAnswer, index) in radioAnswers"
                    :key="radioAnswer.answer"
                    :class="radioAnswer.isCorrect? 'correct' : ''"
                    @click="() => makeRadioAnswerCorrect(index)"
                    @remove.stop="() => removeRadioAnswer(index)"
                    />
                </div>
                <div class="w-10 mt-2 flex align-items-center gap-2">
                    <InputText class="input w-full" v-model="radioAnswer" type="text" placeholder="Вариант ответа" />
                    <Button
                    class="ml-auto"
                    icon="pi pi-plus" 
                    text raised 
                    @click="appendRadioAnswer"
                    />
                </div>
            </div>
        </div>

        <!-- ЕСЛИ тип checkbox -->
        <div  v-show="formQuestion.type === 'checkbox'" class="answers-block w-full">
            <h2 class="mt-3 mb-2">Введите варианты ответа (checkbox)</h2>
            <div class="w-full flex flex-column align-items-center">
                <div class="w-10 gap-1 flex flex-wrap align-items-center justify-content-center">
                    <Chip 
                    class="cursor-pointer"
                    :label="checkboxAnswer.answer" 
                    removable v-for="(checkboxAnswer, index) in checkboxAnswers"
                    :key="checkboxAnswer.answer"
                    :class="checkboxAnswer.isCorrect? 'correct' : ''"
                    @click="() => makeCheckboxAnswerCorrect(index)"
                    @remove.stop="() => removeCheckboxAnswer(index)"
                    />
                </div>
                <div class="w-10 mt-2 flex align-items-center gap-2">
                    <InputText class="input w-full" v-model="checkboxAnswer" type="text" placeholder="Вариант ответа" />
                    <Button
                    class="ml-auto"
                    icon="pi pi-plus" 
                    text raised 
                    @click="appendCheckboxAnswer"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang=ts>
import { ref, type Ref, defineProps, defineEmits, onMounted } from 'vue';
import { type CheckboxAnswer, type Question, type QuestionTypes, type RadioAnswer } from '@/types/testTypes';
import type { SelectChangeEvent } from 'primevue/select';

const props = defineProps<{
    questionData?: Question;
}>();

const emit = defineEmits({
    updateQuestion: (data: Question) => data,
});

const radioAnswer = ref('');
const radioAnswers: Ref<RadioAnswer[]> = ref([{answer: 'asdf', isCorrect: false}]);
const checkboxAnswer = ref('');
const checkboxAnswers: Ref<CheckboxAnswer[]> = ref([]);
const formQuestion: Ref<Question> = ref({
    number: 1,
    question: '',
    type: 'text' as QuestionTypes,
})
const types: Ref<{label: string, value: QuestionTypes}[]> = ref([
    { label: 'Текст', value: 'text' },
    { label: 'Несколько вариантов', value: 'checkbox' },
    { label: 'Только один варинт', value: 'radio' },
]);


function handlerUpdateQuestionQuery() {
    emit('updateQuestion', {...formQuestion.value, radioAnswers: [...radioAnswers.value], checkboxAnswers: [...checkboxAnswers.value]});
}

function handlerSelectType(event: SelectChangeEvent) {
    emit('updateQuestion', {...formQuestion.value, radioAnswers: [...radioAnswers.value], checkboxAnswers: [...checkboxAnswers.value]});
}

// 
function appendRadioAnswer() {
    if(!radioAnswer.value.length) return;
    let newRadioAnswer: RadioAnswer = { answer: radioAnswer.value, isCorrect: false };
    if(!radioAnswers.value.length) newRadioAnswer.isCorrect = true;
    radioAnswers.value.push(newRadioAnswer);
    emit('updateQuestion', {...formQuestion.value, radioAnswers: [...radioAnswers.value], checkboxAnswers: [...checkboxAnswers.value]});
    radioAnswer.value = '';
}
function removeRadioAnswer(posRadioAnswer: number) {
    let findedAnswer = radioAnswers.value[posRadioAnswer];
    if(findedAnswer.isCorrect === true && posRadioAnswer === 0) {
        if(radioAnswers.value[1]) radioAnswers.value[1].isCorrect = true;
    }
    if(findedAnswer.isCorrect === true && posRadioAnswer !== 0) {
        radioAnswers.value[0].isCorrect = true;
    }
    radioAnswers.value.splice(posRadioAnswer, 1);
    emit('updateQuestion', {...formQuestion.value, radioAnswers: [...radioAnswers.value], checkboxAnswers: [...checkboxAnswers.value]});
}
function makeRadioAnswerCorrect(posAnswer: number) {
    radioAnswers.value = radioAnswers.value!.map((item, index) => {
        if(item.isCorrect === true && index !== posAnswer) {
            item.isCorrect = false;
        }
        if(index === posAnswer) {
            item.isCorrect = true;
        }
        return item;
    });
    emit('updateQuestion', {...formQuestion.value, radioAnswers: [...radioAnswers.value], checkboxAnswers: [...checkboxAnswers.value]});
}
// 
function appendCheckboxAnswer() {
    if(!checkboxAnswer.value.length) return;
    let newCheckboxAnswer: CheckboxAnswer = { answer: checkboxAnswer.value, isCorrect: false };
    if(!checkboxAnswers.value.length) newCheckboxAnswer.isCorrect = true;
    checkboxAnswers.value.push(newCheckboxAnswer);
    emit('updateQuestion', {...formQuestion.value, radioAnswers: [...radioAnswers.value], checkboxAnswers: [...checkboxAnswers.value]});
    checkboxAnswer.value = '';
}
function removeCheckboxAnswer(posCheckboxAnswer: number) {
    let findedAnswer = checkboxAnswers.value[posCheckboxAnswer];
    if(findedAnswer.isCorrect === true && posCheckboxAnswer === 0) {
        if(checkboxAnswers.value[1]) checkboxAnswers.value[1].isCorrect = true;
    }
    if(findedAnswer.isCorrect === true && posCheckboxAnswer !== 0) {
        checkboxAnswers.value[0].isCorrect = true;
    }
    checkboxAnswers.value.splice(posCheckboxAnswer, 1);
    emit('updateQuestion', {...formQuestion.value, radioAnswers: [...radioAnswers.value], checkboxAnswers: [...checkboxAnswers.value]});
}
function makeCheckboxAnswerCorrect(posAnswer: number) {
    checkboxAnswers.value = checkboxAnswers.value!.map((item, index) => {
        if(index === posAnswer) item.isCorrect = !item.isCorrect;
        return item;
    });
    emit('updateQuestion', {...formQuestion.value, radioAnswers: [...radioAnswers.value], checkboxAnswers: [...checkboxAnswers.value]});
}

onMounted(() => {
    if(props.questionData) {
        formQuestion.value = { 
            number: props.questionData.number,
            question: props.questionData.question,
            type: props.questionData.type,
        };
        radioAnswers.value = props.questionData.radioAnswers ?? [];
        checkboxAnswers.value = props.questionData.checkboxAnswers ?? [];
    }
})

</script>

<style scoped>
.question-number {
    position: absolute;
    left: 1rem;
    top: 1rem;
}
.answers-block {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>