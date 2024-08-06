<template>
    <div class="relative h-full overflow-hidden flex flex-column align-items-center justify-content-center">
        <form class="flex flex-column align-items-center" @submit.prevent>
            <h2 class="light-text mb-4">Придумайте название для теста <span class="required-text">*</span></h2>
            <div class="flex align-items-center gap-2 p-1">
                <InputText 
                class="input" 
                type="text" 
                size="large" 
                placeholder="Название" 
                v-model="testName"
                @update:model-value="(value) => handlerUpdateTestName(value)"
                />
                <Button 
                icon="pi pi-check" 
                text 
                raised 
                size="large" 
                aria-label="Save" 
                @click="handlerSaveTestName"
                :disabled="!testName.length"
                />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted, nextTick } from 'vue';

const props = defineProps<{
    initialTestName?: string | null;
}>();

const emit = defineEmits({
    updateTestName: (value: string) => value,
    nextStep: () => true,
});

const testName = ref('');

function handlerUpdateTestName(value: string | undefined) {
    try {
        if(!value) return void emit('updateTestName', ' ');
        return void emit('updateTestName', value);
    } catch (err) {
        console.error('components/MainComponents/createTest/nameTestForm.vue: handlerUpdateTestName => ', err);
        throw err;
    }
}

function handlerSaveTestName() {
    try {
        handlerUpdateTestName(testName.value);
        emit('nextStep');
    } catch (err) {
        console.error('components/MainComponents/createTest/nameTestForm.vue: handlerSaveTestName => ', err);
        throw err;
    }
}

onMounted(async() => {
    await nextTick()
    if(props.initialTestName) {
        testName.value = props.initialTestName;
    }
})

</script>

<style scoped>
    
</style>