<template>
    <article 
    class="checked-test flex flex-column align-items-center justify-content-around shadow-1 py-2" 
    :class="'failed'"                    
    @click="emit('openStatisticsTest', props.testData)"
    >
        <!-- Название теста -->
        <h3 class="text-lg font-medium">{{ props.testData.title }}</h3>
        
        <!-- Инфор о кол-ве вопросов -->
        <div class="info-qs-block flex align-items-center py-1 px-2 border-round-sm" v-tooltip.right="'количество вопросов'">
            <span class=" mr-2">
                <i class="pi pi-list" style="font-size: 1.7rem;"></i> 
            </span> 
            <span class="qs-count">{{ props.testData.questions.length }}</span>
        </div>

        <!-- Название теста -->
        <h3 class="text-lg font-medium" v-tooltip.right="'верные ответы'">1 / {{ props.testData.questions.length }}</h3>
    </article>
</template>

<script setup lang="ts">
import type { Test } from '@/types/testTypes';
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    testData: Test;
}>();

const emit = defineEmits({
    openStatisticsTest: (testData: Test) => true,
});

</script>

<style scoped>
.checked-test {
    width: 160px !important;
    height: 160px !important;
    display: inline-block;
    flex: 0 0 auto;
    background-color: var(--basic-bg);
    transition: all .7s ease;
    cursor: pointer;
    border-radius: var(--statistic-checked-test-radius);
    color: var(--statistic-checked-test-fg);
}
.checked-test.success {
    background-color: var(--statistic-checked-test-success-bg);
}
.checked-test.success:hover {
    background-color: var(--statistic-checked-test-success-hover-bg);
    transition: all .7s ease;
}
.checked-test.failed {
    background-color: var(--statistic-checked-test-failed-bg);
}

.checked-test.failed:hover {
    background-color: var(--statistic-checked-test-failed-hover-bg);
    transition: all .7s ease;
}
.checked-test + .checked-test {
    margin-left: .8rem;
}

.info-qs-block {
    background-color: var(--basic-bg);
    font-size: var(--test-item-meta-size);
    width: max-content;
}
.qs-count {
    font-size: 1.7rem;
    font-weight: 500;
}
</style>