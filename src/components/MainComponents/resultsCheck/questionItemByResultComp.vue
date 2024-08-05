<template>
    <article class="question-test relative px-5 py-3" >
        <Badge class="no" :value="props.questionData.number"></Badge>
        <h1 class="question-test-title pb-2 mx-2">
            {{ props.questionData.question }}
        </h1>

        <!-- Блок отображается после нажатия на кнопку "Ответить". Здесь выводится ответ -->
        <div class="pt-2" v-show="!!props.answerData.answer">
            <span>Ответ:</span>
            <div class="block-answer px-5 py-1 mt-2 mx-2">{{ props.answerData}}</div>
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
import { defineProps } from 'vue';

const props = defineProps<{
    questionData: Question;
    answerData: Answer;
}>();

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