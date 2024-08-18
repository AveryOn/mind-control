<template>
    <!-- #############################   ДЛЯ УЧИТЕЛЯ  ####################################### -->
    <div  class="w-full h-full overflow-hidden flex flex-column align-items-stretch">
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">
            Тесты <span class="nest-piece">></span> 
            {{ props.testData?.title }} <span class="nest-piece">></span> Результаты
        </h1>

        <!-- Окно значка закгрузки данных -->
        <span v-if="props.isLoadingInitialData" class="w-full h-full flex align-items-center justify-content-center">
            <ProgressSpinner 
            class="m-auto"
            style="width: 90px; height: 90px" 
            strokeWidth="4" 
            fill="transparent"
            animationDuration=".5s" 
            aria-label="Custom ProgressSpinner"
            />
        </span>

        <section v-else-if="!props.isLoadingInitialData" class="h-full overflow-auto px-5 pb-4 pt-3">
            <div class="w-full h-max shadow-3" style="border-radius: var(--datatable-border-radius)">
                <DataTable 
                class="border-round-lg"
                :value="store.resultsTestForTeacher" 
                tableStyle="min-width: 50rem"
                :size="'small'"
                :selectionMode="'single'"
                :showGridlines="true"
                @row-click="(event: any) => emit('handlerOpenResultForCheck', event.data)"
                >
                    <template #empty>
                        <span class="w-full flex align-items-center justify-content-center py-2 font-italic">Данные отсутствуют</span>
                    </template>
                    <Column class="px-5 text-center" field="id" header="ID результата" style="width: 5%"></Column>
                    <Column class="text-center" field="userId" header="ID ученика" style="width: 5%"></Column>
                    <Column class="text-center" field="testId" header="ID теста" style="width: 5%"></Column>
                    <Column class="text-center" field="isSuccess" header="Тест пройден" style="width: 8%">
                        <template #body="{ data }">
                            <span v-if="data.isChecked === false"><i class="warn-fg pi pi-hourglass font-bold" style="font-size: 1.2rem"></i></span>
                            <span v-else-if="data.isSuccess"><i class="success-fg pi pi-verified" style="font-size: 1.2rem"></i></span>
                            <span v-else-if="!data.isSuccess"><i class="failed-fg pi pi-times" style="font-size: 1.2rem"></i></span>
                        </template>
                    </Column>
                    <Column class="text-center" field="successCount" header="Кол-во правильных ответов" style="width: 10%">
                        <template #body="{ data }">
                            <span>
                                <Tag class="relative" style="min-width: 2rem;">
                                    <template #default>
                                        {{ data.successCount ?? '-' }} / {{ data.questionsCount }}
                                    </template>
                                </Tag>
                            </span>
                        </template>
                    </Column>
                    <Column class="text-center" field="isChecked" header="Проверено" style="width: 10%">
                        <template #body="{ data }">
                            <span v-if="data.isChecked === true"><i class="success-fg pi pi-check" style="font-size: 1.2rem"></i></span>
                            <span v-else-if="data.isChecked === false"><i class="failed-fg pi pi-times" style="font-size: 1.2rem"></i></span>
                        </template>
                    </Column>
                    <Column class="text-center" field="checkDate" header="Дата проверки" style="width: 10%">
                        <template #body="{ data }">
                            <span v-if="data.checkDate">{{ formattedDateByTemplate(data.checkDate) }}</span>
                            <span v-else class="font-bold text-xl">-</span>
                        </template>
                    </Column>
                    <Column class="text-center" field="duration" header="Время выполнения" style="width: 10%">
                        <template #body="{ data }">
                            <span>{{ computeMinutesByMs(data.duration) ?? 0 }} мин.</span>
                        </template>
                    </Column>
                    <Column class="text-center" field="createdAt" header="Дата выполнения" style="width: 10%">
                        <template #body="{ data }">
                            <span>{{ formattedDateByTemplate(data.createdAt) }}</span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import type { Test, TestStudent, TestTeacher } from '@/types/testTypes';
import { computeMinutesByMs, formattedDateByTemplate } from '@/utils/timeUtils';
import { defineProps, defineEmits } from 'vue';

const store = useMainStore();

const props = defineProps<{
    testData: null | Test | TestStudent | TestTeacher;
    isLoadingInitialData: boolean;
}>();

const emit = defineEmits({
    handlerOpenResultForCheck: (data: any) => true,
});


</script>

<style scoped>
    
</style>