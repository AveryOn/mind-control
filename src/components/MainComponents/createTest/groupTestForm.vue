<template>
    <div class="relative h-full overflow-hidden flex flex-column align-items-center justify-content-center py-4" style="border: 1px solid black;">
        <form class="flex flex-column align-items-center" @submit.prevent>
            <h2 class="light-text mb-4">Выберите группу, к которой будет относится данный тест</h2>
            <div class="flex align-items-center gap-2 p-1">
                <Select 
                class="input w-20rem" 
                v-model="selectedGroup" 
                :options="groups" 
                optionLabel="title" 
                option-value="id"
                size="large" 
                placeholder="Группа"
                @change="(e) => handlerUpdateGroup(e.value)"
                >
                    <template #empty>
                        <p class="light-text font-italic">Групп нет</p>
                        
                    </template>
                    <template #footer>
                        <div class="w-full flex align-items-center justify-content-between py-1 px-2" style="border-top: 1px solid var(--basic-border-color);">
                            <Button 
                            class="ml-auto"
                            @click="toggleAddNewGroupForm"
                            icon="pi pi-plus" 
                            text 
                            raised 
                            label="Добавить"
                            size="small" 
                            aria-label="Save" 
                            />
                            <Popover @click.stop class="w-max" ref="op">
                                <div class="w-max flex align-items-center gap-1">
                                    <InputText class="input" type="text" size="small" placeholder="Название группы" />
                                    <Button class="mt-auto"icon="pi pi-plus" text raised size="small" aria-label="Save" />
                                </div>
                            </Popover>
                        </div>
                    </template>
                </Select>
                <Button 
                class="mt-auto"
                icon="pi pi-check" 
                text 
                raised 
                aria-label="Save" 
                @click="handlerSaveGroup"
                />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import type { GroupTest, GroupTestInput } from '@/types/testTypes';
import { ref, type Ref, defineEmits, defineProps, onMounted, nextTick } from 'vue';

const props = defineProps<{
    initialTestGroup?: GroupTestInput | GroupTest | null;
}>();

const emit = defineEmits({
    updateTestGroup: (group: GroupTestInput | GroupTest) => group, 
    nextStep: () => true,
});

const op = ref();
const selectedGroup: Ref<null | number> = ref(null);
const groups: Ref<GroupTest[] | GroupTestInput[]> = ref([{id: 1, title: 'CSS'}]);

const toggleAddNewGroupForm = (event: any) => {
    op.value.toggle(event);
}

function handlerUpdateGroup(groupId: number) {
    try {
        groups.value.forEach((item) => {
            if(item.id === groupId) {
                return emit('updateTestGroup', item);
            }
        })
    } catch (err) {
        console.error('components/MainComponents/createTest/groupTestForm.vue: handlerUpdateGroup => ', err);
        throw err;
    }
}

function handlerSaveGroup() {
    try {
        if(selectedGroup.value) {
            handlerUpdateGroup(selectedGroup.value);
        }
        emit('nextStep');
    } catch (err) {
        console.error('components/MainComponents/createTest/groupTestForm.vue: handlerSaveGroup => ', err);
        throw err;
    }
}

onMounted(async() => {
    await nextTick()
    if(props.initialTestGroup) {
        selectedGroup.value = props.initialTestGroup.id;
    }
});
</script>

<style scoped>
    
</style>