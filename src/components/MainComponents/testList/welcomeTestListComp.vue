<template>
    <div 
    class="w-full h-full flex flex-column align-items-center gap-3 justify-content-center"
    >
        <h1 class="light-text">Здесь будут отображаться тесты</h1>
        <div class="w-max">
            <ConfirmPopup>
                <template #container="{ message, acceptCallback, rejectCallback }">
                    <div class="rounded px-4 py-2">
                        <span>{{ message.message }}</span>
                        <div class="flex justify-content-end gap-2 mt-2">
                            <Button label="Да" @click="acceptCallback" text raised size="small" severity="secondary"></Button>
                            <Button label="Нет" @click="rejectCallback" text raised size="small"></Button>
                        </div>
                    </div>
                </template>
            </ConfirmPopup>

            <Button 
            v-if="store.appRole === 'teacher'"
            label="Создать" 
            icon="pi pi-plus" 
            text raised 
            iconPos="top" 
            @click="confirmOpenCreate($event)"
            />

            <Button
            v-if="isExistsDraftTest && store.appRole === 'teacher'"
            class="ml-4"
            label="Черновик" 
            icon="pi pi-file-edit" 
            text raised 
            severity="warn"
            iconPos="top" 
            @click="router.push({ name: 'createTest' })"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
import { useMainStore } from '@/stores/mainStore';


const confirm = useConfirm();
const store = useMainStore();
const router = useRouter();

const isExistsDraftTest = ref(false);

function confirmOpenCreate(event: Event) {
    try {
        if(isExistsDraftTest.value === true) {
            return confirm.require({
                target: event.currentTarget as HTMLElement,
                message: 'У вас есть незавершенный черновик теста, всё равно создать новый?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    localStorage.removeItem('draft_new_test');
                    localStorage.removeItem('draft_test_step');
                    router.push({ name: 'createTest' });
                },
                reject: () => { return }
            });
        }
        router.push({ name: 'createTest' });
    } catch (err) {
        console.error('views/MainViews/TestsView.vue: confirmOpenCreate => ', err);
        throw err;
    }
}

onMounted(() => {
    if(localStorage.getItem('draft_new_test')) isExistsDraftTest.value = true;
});

</script>

<style scoped>
    
</style>