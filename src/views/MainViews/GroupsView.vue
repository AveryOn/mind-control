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
import useGroupsView from "@/composables/groups/groupsComposable";

// #########################################   COMPOSABLES   #########################################
const { 
    // Composable
    store,
    // Data
    isInvalidTitleInp,
    errorMsgInp,
    isLoadingCreationGroup,
    isShowCreateGroup,
    titleGroup,
    // Methods
    clearErrors,
    handlerCreateGroup,
    handlerOpenGroup,
} = useGroupsView();

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