<template>
    <div class="w-full h-full overflow-hidden flex flex-column align-items-stretch">
        <!-- ЗАГОЛОВОК -->
        <h1 class="viewer-header">
            <span v-if="store.opennedGroup">{{ store.opennedGroup?.title }} <span class="nest-piece">></span> </span>
            Тесты
        </h1>

        <!-- ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ В ГРУППУ -->
        <Dialog v-model:visible="isShowAddNewStudentInGroup" modal header="Добавить ученика в группу" :style="{ width: '30rem' }">
            <div class="flex items-center gap-4 mb-4">
                <Select 
                v-model="selectedStudent" 
                :options="store.students" 
                filter 
                optionLabel="name" 
                placeholder="Выбрите ученика" 
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
                :loading="isLoadingAddedStudent"
                ></Button>
            </div>
        </Dialog>

    
        <!-- ДОП ДЕЙСТВИЯ В ВЕРХНЕЙ ЧАСТИ ОКНА -->
        <div class="w-full mt-3 px-5 gap-2 flex align-items-center">
            <div class="mr-auto">
                <!-- СОЗДАТЬ НОВЫЙ ТЕСТ (КНОПКА) -->
                <Button 
                v-if="store.appRole === 'teacher'"
                class="px-3 mr-2" 
                type="button" 
                icon="pi pi-file-plus" 
                text 
                raised
                @click="handlerOpenNewTestForm"
                v-tooltip.right="'создать новый тест'"
                ></Button>
                <!-- ОТКРЫТЬ ЧЕРНОВИК СОЗДАНИЯ ТЕСТА  (КНОПКА) -->
                <Button
                v-if="isExistsDraftTest"
                class="ml-1"
                icon="pi pi-file-edit" 
                text raised 
                severity="warn"
                @click="router.push({ name: 'createTest' })"
                v-tooltip.right="'черновик'"
                />
            </div>
            <Button 
            v-if="store.appRole === 'teacher' && store.opennedGroup"
            class="px-3 ml-auto" 
            type="button" 
            icon="pi pi-user-plus" 
            text 
            raised v-tooltip.left="'Добавить в группу ученика'"
            @click="isShowAddNewStudentInGroup = true"
            ></Button>
            <Select 
            class="w-20rem shadow-2"
            v-model="store.opennedGroup" 
            :options="store.groups" 
            optionLabel="title"
            placeholder="Выберите группу"
            @change="(event) => router.push({ name: 'groupTests', params: { groupId: event.value.id } })">
                <template #empty><span class="light-text font-italic">Групп нет</span></template>
            </Select>
        </div>

        <!-- КОНТЕНТНАЯ ЧАСТЬ -->
        <section class="relative h-full overflow-auto px-5 pb-4 pt-3">
            <!-- Окно значка закгрузки данных -->
            <span v-if="isLoadingData" class="w-full h-full flex align-items-center justify-content-center">
                <ProgressSpinner 
                class="m-auto"
                style="width: 90px; height: 90px" 
                strokeWidth="4" 
                fill="transparent"
                animationDuration=".5s" 
                aria-label="Custom ProgressSpinner"
                />
            </span>
            <!-- ОКНО ПРИВЕТСТВИЯ -->
            <welcomeTestListComp v-if="!store.tests.length && !isLoadingData"/>

            <!-- СПИСОК ТЕСТОВ -->
            <testListComp 
            @open-test="(test) => handlerOpenTest(test)"
            :test-list="store.tests"
            /> 
        </section>

    </div>
</template>

<script setup lang="ts">
import welcomeTestListComp from '@/components/MainComponents/testList/welcomeTestListComp.vue';
import testListComp from '@/components/MainComponents/testList/testListComp.vue';
import useTestsView from '@/composables/tests/testsComposable';

const { 
    // Composables
    router,
    store,
    // Data
    isExistsDraftTest,
    isLoadingData,
    isShowAddNewStudentInGroup,
    isLoadingAddedStudent,
    selectedStudent,
    // Methods
    handlerAddStudentToGroup,
    handlerOpenTest,
    handlerOpenNewTestForm,
} = useTestsView();

</script>

<style scoped>
    
</style>