<template>
    <div 
    class="relative overflow-auto flex flex-column align-items-center justify-content-start py-6" 
    style="height: 100% !important;"
    >
        <div 
            class="w-full h-full flex flex-column align-items-center gap-3 justify-content-center"
            v-if="!props.questions.length"
            >
                <h1 class="light-text">Начните добавлять вопросы</h1>
                <div class="w-max">
                    <Button 
                    label="Создать" 
                    icon="pi pi-plus" 
                    text raised 
                    iconPos="top"
                    @click="handlerAppendNewQuestion"
                    />
                </div>
        </div>
        <form class="flex w-max h-max" @submit.prevent v-for="question in props.questions" :key="question.number">
            <questionItem 
            @update-question="(data: Question) => emit('updateQuestion', data)"
            :question-data="question"
            />
        </form>
        <Button
        class="mt-auto"
        v-show="props.questions.length"
        label="Добавить" 
        icon="pi pi-plus" 
        text raised 
        @click="handlerAppendNewQuestion"
        />

        <!-- КНОПКА СОЗДАТЬ ТЕСТ -->
        <Button
        class="w-4 mt-5 mb-2"
        v-show="props.questions.length"
        label="Создать тест" 
        icon="pi pi-folder-plus" 
        raised 
        :loading="props.isLoadingCreate"
        @click="emit('confirmCreationTest')"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Question } from '@/types/testTypes';
import questionItem from './questions/questionItem.vue';

const props = defineProps<{
    questions: Question[];
    isLoadingCreate?: boolean;
}>();

const emit = defineEmits({
    appendQuestion: (question: Question) => question,
    updateQuestion: (data: Question) => data,
    confirmCreationTest: () => true,
});

function handlerAppendNewQuestion() {
    let no = 0;
    if(props.questions) {
        no = props.questions.length + 1;
    }
    emit('appendQuestion', { number: no, question: '', type: 'text', });
}

</script>

<style scoped>

</style>