<template>
    <div 
    class="w-full h-full overflow-hidden flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">
            Тесты <span class="nest-piece">></span> 
            Проверка <span class="nest-piece">></span> 
            {{ store.openResultForCheck?.test.title }} <span class="nest-piece">></span> 
            Ученики <span class="nest-piece">></span> 
            {{ store.openResultForCheck?.student.name }}
        </h1>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 pb-4 pt-3" style="border: 1px solid black;">
            <div class="relative h-full overflow-auto flex flex-column align-items-center py-6">
                <questionItemByResultComp 
                v-for="(question, index) in store.openResultForCheck?.questions" 
                :key="question.id"
                :answer-data="store.openResultForCheck?.answers[index]!"
                :question-data="question"
                />
    
                <!-- ACTIONS -->
                <div class="mt-5 flex" style="width: 600px;">
                        <!-- v-model:visible="isShowConfirmDialog" -->
                        <Dialog modal :header="'Подтверждение'" :style="{ width: '38rem' }">
                            <div class="flex justify-content-end gap-2 pr-2">
                                <Button type="button" label="Отмена" severity="secondary" text raised></Button>
                                <Button type="button" label="Да" text raised></Button>
                            </div>
                        </Dialog>
                        <Button
                        class="ml-auto"
                        label="Завершить" 
                        text 
                        raised 
                        icon="pi pi-upload"
                        icon-pos="right"
                        />
                </div>
            </div>

        </section>

    </div>
</template>

<script setup lang="ts">
import questionItemByResultComp from '@/components/MainComponents/resultsCheck/questionItemByResultComp.vue';
import { useMainStore } from '@/stores/mainStore';
import { onMounted } from 'vue';

const store = useMainStore();

onMounted(() => {
    
})

</script>

<style scoped>

</style>