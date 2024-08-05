<template>
    <div 
    class="w-full h-full overflow-hidden flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Ученики</h1>

        <!-- ДОБАВЛЕНИЕ В ГРУППУ пользователя -->
        <Dialog v-model:visible="isShowAddInGroup" modal header="Добавить ученика в группу" :style="{ width: '30rem' }">
            <div class="flex items-center gap-4 mb-4">
                <Select 
                v-model="selectedGroup" 
                :options="store.groups" 
                filter 
                optionLabel="title" 
                placeholder="Выбрите группу" 
                class="w-full md:w-56"
                >
                </Select>
            </div>
            <div class="flex justify-end gap-2">
                <Button 
                class="ml-auto" 
                type="button" 
                text 
                raised 
                label="Подтвердить" 
                @click="handlerAddStudentToGroup"
                :loading="isLoadingAddGroup"
                ></Button>
            </div>
        </Dialog>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 pb-4 pt-3">
            <div class="w-full h-max shadow-3 border-round-lg overflow-hidden">
                <DataTable 
                :value="store.students" 
                tableStyle="min-width: 50rem"
                :size="'small'"
                :selectionMode="'single'"
                >
                    <Column class="px-5" field="id" header="ID" style="width: 5%;"></Column>
                    <Column field="name" header="Инициалы" style="width: 20%;"></Column>
                    <Column field="login" header="Логин" style="width: 20%;"></Column>
                    <Column field="createdAt" header="Дата регистрации" style="width: 20%;">
                        <template #body="{data}">
                            <span class="px-3">
                                {{ formattedDateByTemplate(data.createdAt) }}
                            </span>
                        </template>
                    </Column>
                    <Column field="updatedAt" header="Дата ред. аккаунта"  style="width: 30%;">
                        <template #body="{data}">
                            <span class="px-3">
                                {{ formattedDateByTemplate(data.updatedAt) }}
                            </span>
                        </template>
                    </Column>
                    <Column class="px-5" header="Действия" style="width: 5%;">
                    <template #body>
                        <div class="flex align-items-center">
                            <Button 
                            icon="pi pi-bookmark" 
                            text 
                            raised 
                            size="small" 
                            v-tooltip.bottom="'Добавить в группу'" 
                            @click="isShowAddInGroup = true"
                            />
                        </div>
                    </template></Column>
                </DataTable>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore';
import type { GroupTest } from '@/types/testTypes';
import { formattedDateByTemplate } from '@/utils/timeUtils';
import { ref, type Ref } from 'vue';


const store = useMainStore();

const selectedGroup: Ref<GroupTest | null> = ref(null);
const isLoadingAddGroup = ref(false);
const isShowAddInGroup = ref(false);

function handlerAddStudentToGroup() {
    isLoadingAddGroup.value = true;
    try {
        // 
    } catch (err) {
        console.error('/src/views/MainViews/StudentsView.vue: handlerAddStudentToGroup => ', err);
        throw err;
    } finally {
        isLoadingAddGroup.value = false;
    }
}

</script>

<style scoped>
    
</style>