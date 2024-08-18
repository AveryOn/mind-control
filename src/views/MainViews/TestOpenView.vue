<template>
    <!-- #############################   ДЛЯ УЧЕНИКА  ####################################### -->
    <TestOpenForStudent
    v-if="store.appRole === 'student'"
    :test-data="testData"
    :meter-value="meterValue"
    :is-loading-initial-data="isLoadingInitialData"
    :draft-answers="draftAnswers"
    :is-show-confirm-dialog="isShowConfirmDialog"
    :is-loading-send-test="isLoadingSendTest"
    @update-answer="(data, index) => updateAnswer(data, index)"
    @close-confirm-dialog="isShowConfirmDialog = false"
    @confirm-send-test="confirmSendTest"
    @prepare-confirm-test="prepareConfirmTest"
    ></TestOpenForStudent>

    <!-- #############################   ДЛЯ УЧИТЕЛЯ  ####################################### -->
    <TestOpenForTeacher 
    v-else-if="store.appRole === 'teacher'"
    :test-data="testData"
    @handler-open-result-for-check="(data: any) => handlerOpenResultForCheck(data)"
    >
    </TestOpenForTeacher>

</template>

<script setup lang="ts">
import TestOpenForStudent from '@/components/MainComponents/testOpen/student/testOpenForStudent.vue';
import TestOpenForTeacher from '@/components/MainComponents/testOpen/teacher/testOpenForTeacher.vue';
import useTestOpen from '@/composables/testOpen/testOpenComposable';

const { 
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
} = useTestOpen();

</script>

<style scoped>




</style>