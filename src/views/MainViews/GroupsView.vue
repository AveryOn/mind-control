<template>
    <div class="w-full h-full overflow-hidden flex flex-column align-items-stretch">

        <!-- ФОРМА ДЛЯ СОЗДАНИЯ НОВОЙ ГРУППЫ -->
        <Dialog v-model:visible="isShowCreateGroup" modal header="Создать группу" :style="{ width: '25rem' }">
            <div class="relative flex items-center gap-4 mb-4">
                <label for="title" class="font-medium w-24">Название</label>
                <InputText 
                class="flex-auto" 
                id="title" 
                v-model.trim="titleGroup"
                @input="clearErrors"
                :invalid="isInvalidTitleInp"
                autocomplete="off"
                />
                <span class="error-msg" :class="errorMsgInp.length? 'visible' : ''">{{ errorMsgInp }}</span>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Отмена" severity="secondary" text raised @click="isShowCreateGroup = false"></Button>
                <Button type="button" label="Создать" text raised @click="handlerCreateGroup" :loading="isLoadingCreationGroup"></Button>
            </div>
        </Dialog>

        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">Группы</h1>
        <Button 
        v-if="store.appRole === 'teacher' && store.groups.length"
        class="ml-auto mt-2 mr-4" 
        @click="isShowCreateGroup = true" 
        text 
        raised 
        label="Создать" 
        icon="pi pi-plus" 
        />

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="h-full overflow-auto px-5 py-4">

            <!-- ОКНО ПРИВЕТСТВИЯ -->
            <div v-if="!store.groups.length" class="w-full h-full flex flex-column align-items-center gap-3 justify-content-center">
  
                <h1 class="light-text">Здесь будут отображаться группы</h1>
                <div v-if="store.appRole === 'teacher'" class="w-max">
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
            <TransitionGroup class="w-full h-max flex align-items-center flex-wrap gap-3" name="group-list" tag="div">
                <groupItemComp 
                v-for="group in store.groups" 
                :key="group.id"
                @click="() => handlerOpenGroup(group)"
                :group-data="group"
                />
            </TransitionGroup>
        </section>

    </div>
</template>

<script setup lang="ts">
import groupItemComp from "@/components/MainComponents/groupList/groupItemComp.vue";
import { useMainStore } from "@/stores/mainStore";
import type { GroupTest } from "@/types/testTypes";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createNewGroup } from '@/api/groupsApi';
import { hasSpecSymbols } from "@/utils/validation";

const router = useRouter();
const store = useMainStore();

const isInvalidTitleInp = ref(false);
const errorMsgInp = ref('');
const isLoadingCreationGroup = ref(false);
const isShowCreateGroup = ref(false);
const titleGroup = ref('');

function clearErrors() {
    try {
        errorMsgInp.value = '';
        isInvalidTitleInp.value = false;
    } catch (err) {
        console.error('/src/views/MainViews/GroupsView.vue: clearErrors => ', err);
        throw err;
    }
}

function validationForm(): boolean {
    try {
        let isValid = true;
        if(hasSpecSymbols(titleGroup.value, '@_-. ')) {
            isInvalidTitleInp.value = true;
            isValid = false;
            errorMsgInp.value = `Не допустимы спецсимволы`;
        }
        if(titleGroup.value.length < 3) {
            isInvalidTitleInp.value = true;
            isValid = false;
            errorMsgInp.value = 'Поле не может содержать мменее 3 символов';
        }
        if(!titleGroup.value) {
            isInvalidTitleInp.value = true;
            isValid = false;
            errorMsgInp.value = 'Обязательное поле';
        }

        return isValid;
    } catch (err) {
        console.error('/src/views/MainViews/GroupsView.vue: validationForm => ', err);
        throw err;
    }
}

async function handlerCreateGroup () {
    isLoadingCreationGroup.value = true;
    try {
        if(validationForm()) {
            const newGroup = await createNewGroup(titleGroup.value); 
            store.groups.push(newGroup);
            titleGroup.value = '';
            isShowCreateGroup.value = false;
        }
    } catch (err) {
        console.error('/src/views/MainViews/GroupsView.vue: handlerCreateGroup => ', err);
        throw err;
    } finally {
        isLoadingCreationGroup.value = false;
    }
}

function handlerOpenGroup(group: GroupTest) {
    try {
        router.push({ name: 'groupTests', params: { groupId: group.id } });
        store.opennedGroup = group;
    } catch (err) {
        console.error('/src/views/MainViews/GroupsView.vue: handlerOpenGroup => ', err);
        throw err;
    }
}

</script>

<style scoped>
.group-list {
    width: 100%;
    display: flex;
}
.group-list-enter-active,
.group-list-leave-active {
  transition: all 0.2s ease;
}
.group-list-enter-from,
.group-list-leave-to {
  opacity: 0;
  transform: translateY(300px);
}

.error-msg {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: -0.3rem;
    font-size: 0.85rem;
    color: var(--required-color);
    opacity: 0;
    transition: all 0.3s ease;
}
.error-msg.visible {
    opacity: 1;
    transform: translateY(1rem);
    transition: all 0.3s ease;
}
</style>