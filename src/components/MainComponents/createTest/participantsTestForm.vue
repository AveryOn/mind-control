<template>
    <div class="relative h-full overflow-hidden flex flex-column align-items-center justify-content-center py-4">
        <form class="flex flex-column align-items-center" @submit.prevent>
            <h2 class="light-text mb-4">Выберите участников, которым будет назначен данный тест</h2>
            <div class="flex align-items-center gap-2 p-1">
                <MultiSelect 
                class="input w-20rem" 
                v-model="selectedParticipants" 
                @update:model-value="(participants) => handlerUpdateParticipants(participants)"
                @before-show="uploadStudents"
                :options="store.students" 
                optionLabel="name"
                optionValue="id"
                size="large"  
                filter 
                placeholder="Участники"
                :loading="isLoadingStudents"
                :maxSelectedLabels="3"
                >
                    <template #empty>
                            <p class="light-text font-italic">Участников нет</p>
                            
                        </template>
                </MultiSelect>
                <ConfirmPopup>
                    <template #container="{ message, acceptCallback }">
                        <div class="rounded px-4 py-2">
                            <span>{{ message.message }}</span>
                            <div class="flex justify-content-end gap-2 mt-2">
                                <Button label="Хорошо" @click="acceptCallback" text raised size="small"></Button>
                            </div>
                        </div>
                    </template>
                </ConfirmPopup>
                <Button
                @click="handlerSaveParticipants($event)"
                class="mt-auto"
                icon="pi pi-check" 
                text 
                raised 
                aria-label="Save" 
                />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { getUsers } from "@/api/usersApi";
import { useMainStore } from "@/stores/mainStore";
import type { Participant, ParticipantInput } from "@/types/testTypes";
import { useConfirm } from "primevue/useconfirm";
import { type Ref, ref, defineEmits, defineProps, onMounted, nextTick } from 'vue';

const store = useMainStore();
const confirm = useConfirm();

const props = defineProps<{
    initialTestParticipants?: number[] | null;
}>();

const emit = defineEmits({
    updateTestParticipants: (participants: number[]) => participants,
    nextStep: () => true,
});

const selectedParticipants: Ref<number[]> = ref([]);
const participants: Ref<ParticipantInput[] | Participant[]> = ref([]);
const isLoadingStudents = ref(false);

// Получение списка учеников, если их нет в сторе
async function uploadStudents() {
    try {
        isLoadingStudents.value = true;
        if(!store.students.length) {
            const { data, meta } = await getUsers();
            store.students = data.users;
        }
    } catch (err) {
        console.error('components/MainComponents/createTest/participantsTestForm.vue: uploadStudents => ', err);
        throw err;
    } finally {
        isLoadingStudents.value = false;
    }
}

function handlerSaveParticipants(event: Event) {
    if(!selectedParticipants.value.length) {
        return confirm.require({
            target: event.currentTarget as undefined | HTMLElement,
            message: 'Вы сможете назначить участников позже',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                return emit('nextStep');
            },
        });
    }
    return emit('nextStep');
};

function handlerUpdateParticipants(participants: number[]) {
    try {
        emit('updateTestParticipants', selectedParticipants.value);
    } catch (err) {
        console.error('components/MainComponents/createTest/participantsTestForm.vue: handlerUpdateParticipants => ', err);
        throw err;
    }
}

onMounted(async() => {
    await nextTick()
    if(props.initialTestParticipants) {
        selectedParticipants.value = props.initialTestParticipants;
    }
});

</script>

<style scoped>
    
</style>