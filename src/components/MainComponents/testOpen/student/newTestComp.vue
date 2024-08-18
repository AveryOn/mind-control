<template>
    <!-- НОВЫЙ ТЕСТ -->
    <div class="relative h-full overflow-auto flex flex-column align-items-center py-6">
        <div class="meter-block flex justify-content-center">
            <MeterGroup :value="props.meterValue" />
        </div>

        <questionTestItemComp 
        v-for="(question, index) in store.currentTestQuestions" 
        @update-answer="(data) => emit('updateAnswer', data, index)"
        :question-data="question"
        :initial-value="props.draftAnswers[index]"
        :key="question.id"
        />

        <!-- ACTIONS -->
        <div class="mt-5 flex" style="width: 600px;">
            <Dialog v-model:visible="props.isShowConfirmDialog" modal :header="computeHeaderConfirmDialog" :style="{ width: '38rem' }">
                <div class="flex justify-content-end gap-2 pr-2">
                    <Button type="button" label="Отмена" severity="secondary" text raised @click="emit('closeConfirmDialog')"></Button>
                    <Button type="button" label="Да" :loading="props.isLoadingSendTest" text raised @click="emit('confirmSendTest')"></Button>
                </div>
            </Dialog>
            <Button
            class="ml-auto"
            label="Завершить" 
            text 
            raised 
            icon="pi pi-upload"
            icon-pos="right"
            @click="emit('prepareConfirmTest')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import questionTestItemComp from '@/components/MainComponents/testOpen/questionTestItemComp.vue';
import { useMainStore } from '@/stores/mainStore';
import type { Test, TestStudent, TestTeacher } from '@/types/testTypes';
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
    testData: null | Test | TestStudent | TestTeacher;
    meterValue: { label: string, value: number, color: string, icon: string }[];
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


const computeHeaderConfirmDialog = computed(() => {
    if(props.meterValue[0].value < 100) return 'Вы ответили не на все вопросы. Завершить тест?';
    return 'Вы уверены, что хотите завершить тест?';
})


const store = useMainStore();
</script>


<style scoped>
.meter-block {
    bottom: 2rem;
    right: 5rem;
    position: fixed;
    margin: auto;
    height: max-content;
    padding: 0.3rem 1rem;
    z-index: 99;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: var(--shadow);
}
</style>