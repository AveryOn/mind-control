<template>
    <div class="relative h-full overflow-hidden flex flex-column align-items-center justify-content-center py-4">
        <form class="flex flex-column align-items-center" @submit.prevent>
            <h2 class="light-text mb-4">Краткое описание теста (о чем он?)</h2>
            <div class="flex align-items-center gap-2 p-1">
                <Textarea 
                class="input" 
                rows="5" 
                cols="50" 
                placeholder="Описание" 
                style="resize: vertical"
                v-model="testSummary"
                @update:model-value="(value) => handlerUpdateTestSummary(value)"
                />
                <Button 
                class="mt-auto"
                icon="pi pi-check" 
                text 
                raised 
                size="large" 
                aria-label="Save"
                @click="handlerSaveTestSummary"
                />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted, nextTick } from 'vue';

const props = defineProps<{
    initialTestSummary?: string | null;
}>();

const emit = defineEmits({
    updateTestSummary: (value: string) => value,
    nextStep: () => true,
});

const testSummary = ref('');

function handlerUpdateTestSummary(value: string | undefined) {
    try {
        if(!value) return void emit('updateTestSummary', ' ');
        return void emit('updateTestSummary', value);
    } catch (err) {
        console.error('components/MainComponents/createTest/summaryTestForm.vue: handlerUpdateTestSummary => ', err);
        throw err;
    }
}

function handlerSaveTestSummary() {
    try {
        handlerUpdateTestSummary(testSummary.value);
        emit('nextStep');
    } catch (err) {
        console.error('components/MainComponents/createTest/summaryTestForm.vue: handlerSaveTestSummary => ', err);
        throw err;
    }
}

onMounted(async() => {
    await nextTick()
    if(props.initialTestSummary) {
        testSummary.value = props.initialTestSummary;
    }
});
</script>

<style scoped>
    
</style>