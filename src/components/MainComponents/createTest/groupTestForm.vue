<template>
    <div class="relative h-full overflow-hidden flex flex-column align-items-center justify-content-center py-4">
        <form class="flex flex-column align-items-center" @submit.prevent>
            <h2 class="light-text mb-4">Выберите группу, к которой будет относится данный тест</h2>
            <div class="flex align-items-center gap-2 p-1">
                <Select 
                class="input w-20rem" 
                v-model="selectedGroup" 
                :options="store.groups" 
                optionLabel="title" 
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
                                <div class="w-max flex flex-column align-items-center gap-1 pt-2">
                                    <span class="error-message" v-show="errorMsgGroupInp">{{ errorMsgGroupInp }}</span>
                                    <div class="w-18rem flex gap-2">
                                        <InputText class="input" @input="resetErrors" v-model="titleGroup" type="text" size="small" placeholder="Название группы" />
                                        <Button class="mt-auto"icon="pi pi-plus" text raised size="small" aria-label="Save" :loading="isLoadingCreationGroup" @click="handlerCreateGroup" />
                                    </div>
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
import { useMainStore } from '@/stores/mainStore';
import type { GroupTest, GroupTestInput } from '@/types/testTypes';
import { hasSpecSymbols } from '@/utils/validation';
import { ref, type Ref, defineEmits, defineProps, onMounted, nextTick } from 'vue';
import { createNewGroup } from "@/api/groupsApi";

const store = useMainStore();

const props = defineProps<{
    initialTestGroup?: GroupTest | GroupTestInput | null;
}>();

const emit = defineEmits({
    updateTestGroup: (group: GroupTest | GroupTestInput) => group, 
    nextStep: () => true,
});

const titleGroup: Ref<string> = ref('');
const errorMsgGroupInp: Ref<string> = ref('');
const isLoadingCreationGroup: Ref<boolean> = ref(false);
const isInvalidTitleGroupInp: Ref<boolean> = ref(false);
const op = ref();
const selectedGroup: Ref<GroupTest | GroupTestInput | null> = ref(null);

const toggleAddNewGroupForm = (event: any) => {
    op.value.toggle(event);
}

function handlerUpdateGroup(data: GroupTest | GroupTestInput) {
    try {
        store.groups.forEach((item) => {
            if(item.id === data.id) {
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


// ###############  СОЗДАНИЕ ГРУППЫ
function resetErrors() {
    try {
        errorMsgGroupInp.value = '';
        isInvalidTitleGroupInp.value = false;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
function validationForm(): boolean {
    try {
        let isValid = true;
        if(hasSpecSymbols(titleGroup.value, '@_-. ')) {
            isInvalidTitleGroupInp.value = true;
            isValid = false;
            errorMsgGroupInp.value = `Не допустимы спецсимволы`;
        }
        if(titleGroup.value.length < 3) {
            isInvalidTitleGroupInp.value = true;
            isValid = false;
            errorMsgGroupInp.value = 'Поле не может содержать мменее 3 символов';
        }
        if(!titleGroup.value) {
            isInvalidTitleGroupInp.value = true;
            isValid = false;
            errorMsgGroupInp.value = 'Обязательное поле';
        }

        return isValid;
    } catch (err) {
        console.error('/src/views/MainViews/GroupsView.vue: validationForm => ', err);
        throw err;
    }
}

async function handlerCreateGroup (event: Event) {
    isLoadingCreationGroup.value = true;
    try {
        if(validationForm()) {
            const newGroup = await createNewGroup(titleGroup.value); 
            store.groups.push(newGroup);
            titleGroup.value = '';
            op.value.toggle(event);
            selectedGroup.value = newGroup;
        }
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        isLoadingCreationGroup.value = false;
    }
}

onMounted(async() => {
    await nextTick()
    if(props.initialTestGroup) {
        store.groups.forEach((group) => {
            if(group.id === props.initialTestGroup?.id) {
                selectedGroup.value = group;
            }
        })
    }
});
</script>

<style scoped>
.error-message {
    top: 2px;
    left: 2rem;
    font-size: 0.8rem;
    position: absolute;
    color: var(--required-color); 
}
</style>