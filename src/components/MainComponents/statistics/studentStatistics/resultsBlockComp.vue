<template>
    <div class="statistic-block w-full h-max flex flex-column align-items-center py-3 mt-3">

        <!-- Заголовок -->
        <h2 class="font-light mb-3 w-full" style="font-size: 1.3rem;">Сводка результатов по тесту <span class="font-normal font-italic ml-1">{{ props.testName }}</span></h2>

        <!-- Фильтр панель -->
        <div class="w-full flex align-items-center justify-content-start gap-2 mb-3">
            <!-- Выбор Даты ОТ -->  
            <DatePicker 
            v-model="fromDate" 
            dateFormat="dd/mm/yy" 
            showIcon 
            iconDisplay="input" 
            :placeholder="'От'"
            @date-select="(date: Date) => requestFilter('from-date', date)"
            @update:modelValue="(value) => value ?? (minDateForTo = undefined)"
            />
   

            <!-- Разделитель -->
            <span class="text-2xl">-</span>

            <!-- Выбор Даты ДО -->
            <DatePicker 
            v-model="toDate" 
            dateFormat="dd/mm/yy" 
            showIcon 
            :placeholder="'До'"
            iconDisplay="input" 
            :minDate="minDateForTo"
            />

            <Select 
            class="ml-2"
            v-model="selectedStatusFilter" 
            :options="statusOptionsFilter" 
            optionLabel="label" 
            optionValue="value" 
            placeholder="Статус результата" 
            />
        </div>

        <!-- Подзаголовок -->
        <h3 class="light-text w-full mb-3 pb-1 cursor-auto text-lg" style="border-bottom:1px dotted var(--basic-border-color); user-select: none">Результаты</h3>

        <!-- Отрисовка результатов -->
        <ul class="w-full">
            <li 
            class="result-list-item w-full flex align-items-center justify-content-start px-3 py-2 shadow-2 gap-3" 
            :class="computeClassResult(result.isSuccess)"
            v-for="result in store.statisticsResultsStudents" 
            :key="result.id"
            >
                <span class="light-text font-italic"># {{ result.id }}</span>
                <span>{{ computeStateSignResult(result.isSuccess) }}</span>
                <span class="ml-auto">{{ formattedDateByTemplate(result.createdAt) }}</span>
                
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import type { FilterMode } from '@/types/statisticTypes';
import { formattedDateByTemplate } from '@/utils/timeUtils';
import { computed, ref, defineProps } from 'vue';

const store = useMainStore();

const props = defineProps<{
    testName: string;
}>();

const fromDate = ref();
const toDate = ref();
const minDateForTo = ref();
const selectedStatusFilter = ref(null);
const statusOptionsFilter = ref([    
    { value: true, label: 'Успешные результаты' }, 
    { value: false, label: 'Неудачные результаты' },
])

// Вычисление классов success и failed для результатов
const computeClassResult = computed(() => {
    return (isSuccess: boolean | null) => {
        const classes = { success: false, failed: false };
        if(isSuccess === true) {
            classes.success = true;
        } 
        else {
            classes.failed = true;
        }
        return classes;
    }
});

// Вычисление состояния результата (Выполнен / Провален)
const computeStateSignResult = computed(() => {
    return (isSuccess: boolean | null) => {
        return (isSuccess) ? 'Тест пройден' : 'Тест провален';
    }
});

// Запрос данных по фильтрации
function requestFilter(mode: FilterMode, payload: any) {
    if(mode === 'from-date') {
        minDateForTo.value = payload; // минимальная допустимая дата для toDate
        toDate.value = undefined;
    }
    else if(mode === 'to-date') {
        console.log(mode);
    }
    else if(mode === 'complete-status') {
        console.log(mode);
    }
}



</script>

<style scoped>
.result-list-item {
    border-radius: 3px;
    margin-bottom: 0.4rem;
    cursor: pointer;
    transition: background-color var(--result-item-transition) ease;
}
.result-list-item.success {
    border: 1px solid var(--result-item-border-success);
    border-left: 4px solid var(--result-item-border-success);
}
.result-list-item.success:hover {
    background-color: var(--result-item-hover-bg-success);
    transition: background-color var(--result-item-transition) ease;
}
.result-list-item.failed {
    border: 1px solid var(--result-item-border-failed);
    border-left: 4px solid var(--result-item-border-failed);
}
.result-list-item.failed:hover {
    background-color: var(--result-item-hover-bg-failed);
    transition: background-color var(--result-item-transition) ease;
}
</style>