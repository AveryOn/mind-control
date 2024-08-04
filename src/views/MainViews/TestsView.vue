<template>
    <div 
    class="w-full h-full overflow-hidden flex flex-column align-items-stretch" 
    >
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Тесты</h1>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-hidden">

            <!-- ОКНО ПРИВЕТСТВИЯ -->
            <div 
            class="w-full h-full flex flex-column align-items-center gap-3 justify-content-center"
            v-if="true"
            >
                <h1 class="light-text">Здесь будут отображаться все тесты</h1>
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
                    label="Создать" 
                    icon="pi pi-plus" 
                    text raised 
                    iconPos="top" 
                    @click="confirmOpenCreate($event)"
                    />

                    <Button
                    v-if="isExistsDraftTest"
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
        </section>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();

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
})

</script>

<style scoped>
    
</style>