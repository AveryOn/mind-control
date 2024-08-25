<template>
    <div class="statistic-block w-full h-max flex flex-column align-items-center py-3 mt-3">

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

        <ul class="w-full">
            <li 
            class="w-full flex align-items-center justify-content-start px-3 py-2 shadow-2" 
            :class="computeClassResult(result.isSuccess)"
            v-for="result in store.statisticsResultsStudents" 
            :key="result.id"
            >
                <div>{{ computeStateSignResult(result.isSuccess) }}</div>
                {{ result.createdAt }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import type { FilterMode } from '@/types/statisticTypes';
import { computed, ref } from 'vue';

const store = useMainStore();


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
.success {
    color: green;
}
</style>