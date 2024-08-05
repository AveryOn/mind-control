<template>
    <article class="question-test relative px-5 py-3" >
        <Badge class="no" :value="props.questionData.number"></Badge>
        <h1 class="question-test-title pb-2 mx-2">
            {{ props.questionData.question }}
        </h1>

        <!-- ВАРИАНТЫ ОТВЕТА -->
        <div v-if="props.questionData.type !== 'text'" class="">
            <span class="">Варианты ответа:<span class="sign-qua-answers ml-3">({{ computeSignForVariantsAnswer }})</span></span>
            <div class="w-full flex flex-column align-items-start pt-3 px-3">
                <!-- CheckBox -->
                <Tag 
                class="mb-2" 
                v-if="props.questionData.type === 'checkbox'" 
                v-for="(answer, index) in props.questionData.checkboxAnswers" 
                :value="`${index+1 + ')'}  ${answer.answer}`"
                :key="answer.answer"
                ></Tag>
                <!-- Radio -->
                <Tag 
                class="mb-2" 
                v-if="props.questionData.type === 'radio'" 
                v-for="(answer, index) in props.questionData.radioAnswers"
                :value="`${index+1 + ')'}  ${answer.answer}`" 
                :key="answer.answer"
                ></Tag>
            </div>
        </div>

        <!-- Блок отображается после нажатия на кнопку "Ответить". Здесь выводится ответ -->
        <div class="pt-2">
            <span>Ответ:</span>
            <div v-if="props.questionData.type === 'checkbox'" class="w-full flex flex-column align-items-start pt-3 px-3">
                <Tag class="mb-2" v-if="props.questionData.type === 'checkbox'" :value="answer.answer" v-for="answer in checkboxAnswers"></Tag>
            </div>
            <div v-else class="block-answer px-5 py-1 mt-2 mx-2">{{ props.answerData.answer ?? '-' }}</div>
        </div>

        <!-- БЛОК ПЕРИФЕРИИ -->
        <div class="w-full flex justify-content-end mt-3">
            <!-- Кнопка  -  ВЕРНО -->
            <Button 
            label="Верно" 
            text 
            raised 
            icon="pi pi-check" 
            style="color: var(--test-item-color);" 
            />
            <!-- Кнопка  -  ИЗМЕНИТЬ -->
            <Button 
            label="Не верно" 
            text 
            raised 
            severity="warn" 
            icon="pi pi-times" 
            />
        </div>
    </article>
</template>

<script setup lang="ts">
import type { Answer, Question } from '@/types/testTypes';
import { defineProps, computed, onMounted, type Ref, ref } from 'vue';

const props = defineProps<{
    questionData: Question;
    answerData: Answer;
}>();


const checkboxAnswers: Ref<Answer | null> = ref(null);

const computeSignForVariantsAnswer = computed(() => {
    try {
        if(props.questionData.type === 'checkbox') return 'Несколько вариантов';
        if(props.questionData.type === 'radio') return 'Один вариант';
    } catch (err) {
        console.error('/src/components/MainComponents/resultsCheck/questionItemByResultComp.vue: computed[computeSignForVariantsAnswer] => ', err);
        throw err;
    }
});

function parseJsonAnswer(data: any) {
    try {
        if(data) {
            if(typeof data === 'string') {
                return JSON.parse(data);
            }
        }
        return null;
    } catch (err) {
        console.error('/src/components/MainComponents/resultsCheck/questionItemByResultComp.vue: parseJsonAnswer => ', err);
        throw err;
    }
}

onMounted(() => {
    try {
        if(props.questionData.type === 'checkbox') {
            checkboxAnswers.value = parseJsonAnswer(props.answerData.answer);
        }
    } catch (err) {
        console.error('/src/components/MainComponents/resultsCheck/questionItemByResultComp.vue: onMounted[parseJsonAnswer] => ', err);
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

.sign-qua-answers {
    color: rgba(128, 128, 128, 0.727);
    font-style: italic;
}
</style>