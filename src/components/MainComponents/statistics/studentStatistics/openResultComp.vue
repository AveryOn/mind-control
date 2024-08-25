<template>
    <div class="statistic-block w-full h-max flex flex-column align-items-center py-3 mt-3">

        <!-- Спиннер загрузки -->
        <ProgressSpinner 
        v-if="props.isLoadingData" 
        style="width: 40px; height: 40px" 
        strokeWidth="4" 
        fill="transparent"
        animationDuration=".5s" 
        aria-label="Custom ProgressSpinner" 
        />

        <!-- СОДЕРЖИМОЕ  -->
        <div v-else class="w-full">
            <!-- Заголовок -->
            <div 
            class="result-header w-full flex align-items-center justify-content-center mb-3 px-2"
            :class="computeClasses"
            >
                <h2 class="font-light mr-auto" style="font-size: 1.3rem;">Результат по тесту -<span class="font-normal font-italic ml-1">{{ store.openResultStudent?.test.title }}</span></h2>
                <span class="light-text mr-4">{{ `( ${fromNow(store.openResultStudent?.createdAt)} )` }}</span>
                <span>{{ formattedDateByTemplate(store.openResultStudent?.createdAt) }}</span>
            </div>
    
            <!-- Информационная панель о результате -->
            <div class="info-panel w-full flex align-items-center justify-content-center gap-3 pb-3">
    
                <!-- Инфо о Дате проверки -->
                <span class="info-chunk flex flex-column align-items-center gap-2" v-tooltip.bottom="'Проверено'">
                    <i class="pi pi-calendar-times" style="font-size: 1.7rem;"></i>
                    <span class="font-bold">{{  formattedDateByTemplate(store.openResultStudent?.checkDate)  }}</span>
                </span>
    
                <!-- Инфо о Времени выполнения теста -->
                <span class="info-chunk flex flex-column align-items-center gap-2" v-tooltip.bottom="'Время выполнения'">
                    <i class="pi pi-clock" style="font-size: 1.7rem;"></i>
                    <span class="font-bold">{{ `${computeMinutesByMs(store.openResultStudent?.duration ?? 0)} мин.` }}</span>
                </span>
    
                <!-- Инфо о кол-ве верных ответов -->
                <span class="info-chunk flex flex-column align-items-center gap-2" v-tooltip.bottom="'Верных ответов'">
                    <i class="pi pi-list-check" style="font-size: 1.7rem;"></i>
                    <span class="font-bold">{{ `${store.openResultStudent?.successCount} / ${store.openResultStudent?.questionsCount}` }}</span>
                </span>
    
                <!-- Инфо о названии группы -->
                <span class="info-chunk flex flex-column align-items-center gap-2" v-tooltip.bottom="'Группа'">
                    <i class="pi pi-bookmark" style="font-size: 1.7rem;"></i>
                    <span class="w-full font-bold white-space-nowrap overflow-hidden text-overflow-ellipsis">
                        {{ store.openResultStudent?.test.group.title }}
                    </span>
                </span>
            </div>

            <!-- Список вопросов и ответов -->
            <div class="w-full flex flex-column align-items-center">
                <div 
                class="question-item px-3 py-2" 
                v-for="question in store.openResultStudent?.questions" 
                :key="question.id"
                >
                    {{ question.question }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import { computeMinutesByMs, formattedDateByTemplate, fromNow } from '@/utils/timeUtils';
import { computed, defineProps } from 'vue';

const store = useMainStore();
const props = defineProps<{
    isLoadingData: boolean;
}>();

// Вычисление класса состояния результат (success | failed)
const computeClasses = computed(() => {
    const classList = { success: false, failed: false };
    if(store.openResultStudent?.isSuccess === true) {
        classList.success = true;
    }
    else {
        classList.failed = true;
    }
    return classList;
})

</script>

<style scoped>
.result-header {
    background-color: rgba(212, 212, 212, 0.383);
}   
.result-header.success {
    background-color: var(--result-item-hover-bg-success);
}
.result-header.failed {
    background-color: var(--result-item-hover-bg-failed);
}
.info-panel {
    border-bottom: 1px dotted var(--basic-border-color);
}
.info-chunk {
    min-width: 4.8rem;
    max-width: 6rem;
    padding: 0.5rem;
    background-color: rgb(205, 252, 232);
    color: rgb(73, 73, 73);
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    user-select: none;
}
.question-item {
    width: 300px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 3px;
    font-size: 0.9rem;
}
</style>