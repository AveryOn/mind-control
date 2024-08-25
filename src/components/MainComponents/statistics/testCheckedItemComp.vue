<template>
    <article 
    class="checked-test flex flex-column align-items-center justify-content-around py-2"
    :class="computeClassTest"
    @click="emit('openStatisticsTest', props.testData)"
    >
        <!-- Название теста -->
        <h3 class="text-lg font-medium mt-2">{{ props.testData.title }}</h3>
        
        <!-- Инфор о кол-ве вопросов -->
        <div class="info-qs-block flex align-items-center py-1 px-2 my-auto border-round-sm" v-tooltip.right="'количество вопросов'">
            <span class=" mr-2">
                <i class="pi pi-list" style="font-size: 1.7rem;"></i> 
            </span> 
            <span class="qs-count">{{ props.testData.questionsCount }}</span>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { Test } from '@/types/testTypes';
import { defineProps, defineEmits, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
    testData: Test;
}>();

const emit = defineEmits({
    openStatisticsTest: (testData: Test) => true,
});

// Вычисление классов для карточки теста
const computeClassTest = computed(() => {
    const classList = { openned: false };
    if(route.query['open_statistic_test_id']) {
        if(+route.query['open_statistic_test_id'] === props.testData.id) {
            classList.openned = true;
        }
    }
    return classList;
})

</script>

<style scoped>
.checked-test {
    width: 160px !important;
    height: 160px !important;
    display: inline-block;
    flex: 0 0 auto;
    background-color: var(--basic-bg);
    transition: all .4s ease;
    cursor: pointer;
    border-radius: var(--statistic-checked-test-radius);
    color: var(--statistic-checked-test-fg);
    background-color: rgb(228, 228, 228);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
.checked-test:hover {
    box-shadow: none;
    transition: all .4s ease;
}
.checked-test + .checked-test {
    margin-left: .8rem;
}

.checked-test.openned {
    box-shadow: none;
    transition: all .4s ease;
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