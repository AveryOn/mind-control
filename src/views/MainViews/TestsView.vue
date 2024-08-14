<template>
    <div 
    class="w-full h-full overflow-hidden flex flex-column align-items-stretch" 
    >
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
        <div class="w-20rem mt-2 ml-auto mr-5 gap-2 flex align-items-center">
            <Button 
            v-if="store.appRole === 'teacher' && store.opennedGroup"
            class="px-3" 
            type="button" 
            icon="pi pi-user-plus" 
            text 
            raised v-tooltip.left="'Добавить в группу ученика'"
            @click="isShowAddNewStudentInGroup = true"
            ></Button>
            <Select 
            class="w-full"
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
import { watch, ref, type Ref, onMounted, reactive, type Reactive } from 'vue';
import type { GroupTest, Test, TestTeacher } from '@/types/testTypes';
import { useMainStore } from '@/stores/mainStore';
import { useRoute, useRouter } from 'vue-router';
import type { Student } from '@/types/usersType';
import { getTestsTeacher } from '@/api/testsApi';

const route = useRoute();
const router = useRouter();
const store = useMainStore();

const isLoadingData = ref(false);
const isShowAddNewStudentInGroup = ref(false);
const isLoadingAddedStudent = ref(false);
const selectedStudent: Ref<Student | null> = ref(null);
const pagination: Reactive<{page: number, perPage: number}> = reactive({
    page: 1,
    perPage: 10,
});

function handlerAddStudentToGroup() {
    isLoadingAddedStudent.value = true;
    try {
        // 
    } catch (err) {
        console.error('/src/views/MainViews/TestsView.vue: handlerAddStudentToGroup => ', err);
        
    } finally {
        isLoadingAddedStudent.value = false;
    }
}

function initSelectedGroup(groupId: string | string[] | undefined) {
    try {
        if(groupId) {
        store.groups.forEach((group: GroupTest) => {
            if(group.id === +groupId) {
                store.opennedGroup = group;
            }
        });
    }
    } catch (err) {
        console.error('views/MainViews/TestsView.vue: initSelectedGroup => ', err);
        throw err;
    }
}

function handlerOpenTest(test: Test | TestTeacher) {
    try {
        store.opennedTest = test;
        router.push({ name: 'opennedTest', params: { testId: test.id } });
    } catch (err) {
        console.error('/src/views/MainViews/TestsView.vue: handlerOpenTest => ', err);
        throw err;
    }
}

watch(() => route.params.groupId, (newValue) => {
    if(+newValue !== +newValue) {
        store.opennedGroup = null;
    }
});

onMounted(async () => {
    initSelectedGroup(route.params.groupId);

    // Получение списка тестов
    try {
        isLoadingData.value = true;
        // Если роль teacher
        if(store.appRole === 'teacher' && !store.tests.length) {
            const { data: { tests }, meta } = await getTestsTeacher(pagination.page, pagination.perPage);
            store.tests = tests;
        } 
        // Если роль student
        else if(store.appRole === 'student') {
            // запрос для ученика
        }
    } catch (err) {
        console.error(err);
    } finally {
        isLoadingData.value = false;
    }
})

</script>

<style scoped>
    
</style>