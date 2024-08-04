<template>
    <div class="test-list-item w-full px-3 shadow-2 border-round-sm">
        <div class="px-3 mr-auto flex align-items-center">
            <i class="test-play-icon pi pi-play mr-2"></i> 
            <h2 class="test-item-title text-xl">{{ props.testData.title }}</h2>
        </div>

        <!-- ИНФО о Кол-ве выполнивших тест участниках -->
        <span class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-check-circle" style="font-size: var(--test-item-meta-size);"></i> 
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'выполнило'">1 / {{ props.testData.questions.length }}</span> 
        </span>
        
        <!-- ИНФО об Кол-ве вопросов -->
        <span class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-list-check" style="font-size: var(--test-item-meta-size);"></i> 
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'кол-во вопросов'">{{ props.testData.questions.length }}</span> 
        </span>

        <!-- ИНФО об участниках -->
        <span class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-users" style="font-size: var(--test-item-meta-size);"></i>
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'кол-во участников'">{{ props.testData.participants.length }}</span> 
        </span>

        <!-- ИНФО об участниках -->
        <span class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-bookmark" style="font-size: var(--test-item-meta-size);"></i>
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'группа'">{{ props.testData.group.title }}</span> 
        </span>
        
    </div>
</template>

<script setup lang="ts">
import type { Test } from '@/types/testTypes';
import { defineProps } from 'vue';

const props = defineProps<{
    testData: Test,
}>();

</script>

<style scoped>
.test-play-icon {
    color: var(--basic-color-fg);
    font-size: 1.2rem;
    transition: all 1s ease;
}
.test-list-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--test-item-bg) !important;
    border-left: 5px solid var(--test-item-mark-success-color);
    padding: .7rem 0;
    cursor: pointer;
}
.test-list-item + .test-list-item {
    margin-top: .5rem;
}
.test-list-item:hover .test-play-icon {
    color: orange;
    transition: all 1s ease;
}
.test-list-item:hover .test-item-title {
    color: rgb(95, 95, 95);
    transition: all 1s ease;
}
.test-item-title {
    transition: all 1s ease;
}
.info-block {
    font-size: var(--test-item-meta-size);
    display: flex;
    justify-content: flex-start;
    min-width: 4.4rem !important;
    width: max-content;
    border-left: 2px solid var(--test-item-separator-color);
}
.sign-icon {
    color: var(--test-item-sign-fg);
}
.meta-count{
    color: var(--test-item-meta-fg); 
    font-weight: 700;
}
</style>