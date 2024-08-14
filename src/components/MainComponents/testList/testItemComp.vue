<template>
    <div 
    class="test-list-item w-full px-3 shadow-2 border-round-sm"
    :class="computeClassesTestItem"
    >
        <div class="px-3 mr-auto flex align-items-center">
            <i v-if="store.appRole === 'student'" class="test-play-icon pi pi-play mr-2"></i> 
            <h2 class="test-item-title text-xl">
                {{ props.testData.title }}
                <span class="font-light font-italic sign-nocheck" v-if="store.appRole === 'student' && props.testData.result?.isChecked === false">- Не проверено</span>
                <span class="font-light font-italic sign-nocheck" v-if="store.appRole === 'student' && !props.testData.result">- Новый</span>
            </h2>
        </div>

        <!-- ИНФО о Времени выполнения теста -->
        <span v-if="store.appRole === 'student' && props.testData.result?.duration" class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-clock" style="font-size: var(--test-item-meta-size);"></i> 
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'время выполнения'">{{ computeMinutesByMs(props.testData.result?.duration) }} мин.</span> 
        </span>

        <!-- ИНФО о Кол-ве правильных ответов -->
        <span v-if="store.appRole === 'student' && props.testData.result?.successCount" class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-check-circle" style="font-size: var(--test-item-meta-size);"></i> 
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'верных ответов'">{{ props.testData.result?.successCount }} / {{ props.testData.questionsCount }}</span> 
        </span>
        
        <!-- ИНФО об Кол-ве вопросов -->
        <span class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-list-check" style="font-size: var(--test-item-meta-size);"></i> 
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'кол-во вопросов'">{{ props.testData.questionsCount }}</span> 
        </span>

        <!-- ИНФО об кол-ве выполнивших тест участниках -->
        <span v-if="store.appRole === 'teacher'" class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-user-edit" style="font-size: var(--test-item-meta-size);"></i>
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'выполнили'">4 / 14</span> 
        </span>

        <!-- ИНФО об участниках -->
        <span v-if="store.appRole === 'teacher'" class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-users" style="font-size: var(--test-item-meta-size);"></i>
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'кол-во участников'">{{ props.testData.participantsCount }}</span> 
        </span>

        <!-- ИНФО Группе -->
        <span class="info-block px-3">
            <span class="sign-icon mr-1">
                <i class="pi pi-bookmark" style="font-size: var(--test-item-meta-size);"></i>
            </span> 
            <span class="meta-count mx-1" v-tooltip.bottom="'группа'">{{ props.testData.group.title }}</span> 
        </span>
        
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import type { Test, TestTeacher } from '@/types/testTypes';
import { computeMinutesByMs } from '@/utils/timeUtils';
import { computed, defineProps } from 'vue';

const store = useMainStore();
const props = defineProps<{
    testData: Test | TestTeacher,
}>();

const computeClassesTestItem = computed(() => {
    if(store.appRole === 'student' && props.testData.result?.isSuccess! === true) return 'success';
    if(store.appRole === 'student' && props.testData.result?.isChecked! === true && props.testData.result.isSuccess === false) return 'failed';
    if(store.appRole === 'student' && props.testData.result?.isChecked! === false) return 'no-checked';
});

</script>

<style scoped>
.test-play-icon {
    color: var(--basic-color-fg);
    font-size: 1.2rem;
    transition: all 1s ease;
}
.sign-nocheck {
    color: gray;
}
.test-list-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--test-item-bg) !important;
    border-left: 5px solid rgba(175, 175, 175, 0.734);
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
    min-width: 4.7rem !important;
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