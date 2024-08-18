<template>
    <div class="w-full h-full overflow-hidden flex flex-column align-items-stretch">
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">
            Тесты <span class="nest-piece">></span> 
            {{ props.testData?.title }}
        </h1>

        <!-- НОВЫЙ ТЕСТ -->
        <NewTestComp 
        v-if="!props.testData?.result"
        :test-data="props.testData"
        :meter-value="props.meterValue"
        :is-loading-initial-data="props.isLoadingInitialData"
        :draft-answers="props.draftAnswers"
        :is-show-confirm-dialog="props.isShowConfirmDialog"
        :is-loading-send-test="props.isLoadingSendTest"
        @update-answer="(data, index) => emit('updateAnswer', data, index)"
        @close-confirm-dialog="emit('closeConfirmDialog')"
        @confirm-send-test="emit('confirmSendTest')"
        @prepare-confirm-test="emit('prepareConfirmTest')"
        ></NewTestComp>

        <!-- НЕ ПРОВЕРЕННЫЙ ТЕСТ -->
        <signNocheckComp 
        v-if="props.testData?.result && props.testData?.result?.isChecked !== true"
        ></signNocheckComp>

        <!-- ПРОВЕРЕННЫЙ ТЕСТ -->
        <signCheckComp
        v-if="props.testData?.result?.isChecked === true"
        :test-data="props.testData"
        ></signCheckComp>

    </div>
</template>

<script setup lang="ts">
import NewTestComp from '@/components/MainComponents/testOpen/student/newTestComp.vue';
import signNocheckComp from '@/components/MainComponents/testOpen/student/signNocheckComp.vue';
import signCheckComp from '@/components/MainComponents/testOpen/student/signCheckComp.vue';
import type { Test, TestStudent, TestTeacher } from '@/types/testTypes';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    testData: null | Test | TestStudent | TestTeacher;
    meterValue: { label: string, value: number, color: string, icon: string }[];
    isLoadingInitialData: boolean;
    draftAnswers: { answer: any, questionId: number }[];
    isShowConfirmDialog: boolean;
    isLoadingSendTest: boolean;
}>();

const emit = defineEmits({
    updateAnswer: (answer: { answer: any, questionId: number }, index: number) => true,
    closeConfirmDialog: () => true,
    confirmSendTest: () => true,
    prepareConfirmTest: () => true,
});


</script>

<style scoped>

</style>