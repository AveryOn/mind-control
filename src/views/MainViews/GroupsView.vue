<template>
    <div class="w-full h-full overflow-hidden flex flex-column align-items-stretch">

        <!-- ФОРМА ДЛЯ СОЗДАНИЯ НОВОЙ ГРУППЫ -->
        <Dialog v-model:visible="isShowCreateGroup" modal header="Создать группу" :style="{ width: '25rem' }">
            <div class="flex items-center gap-4 mb-4">
                <label for="title" class="font-medium w-24">Название</label>
                <InputText id="title" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Отмена" severity="secondary" text raised @click="isShowCreateGroup = false"></Button>
                <Button type="button" label="Создать" text raised @click="isShowCreateGroup = false"></Button>
            </div>
        </Dialog>

        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Группы</h1>
        <Button class="ml-auto mt-2 mr-4" @click="isShowCreateGroup = true" text raised label="Создать" icon="pi pi-plus" />

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 py-4">

            <!-- ОКНО ПРИВЕТСТВИЯ -->
            <div v-if="false" class="w-full h-full flex flex-column align-items-center gap-3 justify-content-center">
  
                <h1 class="light-text">Здесь будут отображаться группы</h1>
                <div class="w-max">
                    <Button 
                    label="Создать" 
                    icon="pi pi-plus" 
                    text raised
                    iconPos="top"
                    @click="isShowCreateGroup = true" 
                    />
                </div>
            </div>

            <!-- СПИСОК ТЕСТОВ -->
            <div class="w-full h-max flex align-items-center flex-wrap gap-3">
                <groupItemComp 
                v-for="group in store.groups" :key="group.id"
                @click="router.push({ name: 'groupTests', params: { groupId: group.id } })"
                :group-data="group"
                />
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import groupItemComp from "@/components/MainComponents/groupList/groupItemComp.vue";
import { useMainStore } from "@/stores/mainStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useMainStore();

const isShowCreateGroup = ref(false);

</script>

<style scoped>
    
</style>