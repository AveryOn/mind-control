import type { Student } from '@/types/usersType';
import type { GroupTest, Test, TestTeacher } from '@/types/testTypes';
import { getTestsStudent, getTestsTeacher } from '@/api/testsApi';
import { watch, ref, type Ref, onMounted, reactive, type Reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores/mainStore';

// Необходим для работы компонента testsView (Ученик / Учитель / Админ) 
export default function useTestsView() { 

    // ######################################   COMPOSABLES   ######################################
    const route = useRoute();
    const router = useRouter();
    const store = useMainStore();


    // ######################################   DATA   ######################################
    const isExistsDraftTest = ref(false);
    const isLoadingData = ref(false);
    const isShowAddNewStudentInGroup = ref(false);
    const isLoadingAddedStudent = ref(false);
    const selectedStudent: Ref<Student | null> = ref(null);
    const pagination: Reactive<{page: number, perPage: number}> = reactive({
        page: 1,
        perPage: 10,
    });

    // ######################################   METHODS   ######################################
    // Асинхронный обработчик добавления ученика в группу
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

    // Инициализация открытой группы (по параметру пути)
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

    // Обработчик открытия теста
    function handlerOpenTest(test: Test | TestTeacher) {
        try {
            router.push({ name: 'opennedTest', params: { testId: test.id } });
        } catch (err) {
            console.error('/src/views/MainViews/TestsView.vue: handlerOpenTest => ', err);
            throw err;
        }
    }

    // Обработчик открытия формы создания нового теста (Стирает черновик незавершенного теста если он есть)
    function handlerOpenNewTestForm() {
        try {
            localStorage.removeItem('draft_new_test');
            localStorage.removeItem('draft_test_step');
            router.push({ name: 'createTest' });
        } catch (err) {
            console.error('/src/views/MainViews/TestsView.vue: handlerOpenNewTestForm => ', err);
            throw err;
        }
    }

    // ######################################   WATCH   ######################################
    watch(() => route.params.groupId, (newValue) => {
        try {
            if(+newValue !== +newValue) {
                store.opennedGroup = null;
            }
        } catch (err) {
            console.error(import.meta.url + 'watch', err);
            throw err;
        }
    });


    // ######################################   LIFECYCLE HOOKS   ######################################
    onMounted(async () => {
        initSelectedGroup(route.params.groupId);
        if(localStorage.getItem('draft_new_test')) isExistsDraftTest.value = true;
        // Получение списка тестов
        try {
            isLoadingData.value = true;
            // Если роль teacher
            if(store.appRole === 'teacher' && !store.tests.length) {
                const { data: { tests }, meta } = await getTestsTeacher(pagination.page, pagination.perPage);
                store.tests = tests;
            } 
            // Если роль student
            else if(store.appRole === 'student' && !store.tests.length) {
                // запрос для ученика
                const { data: { tests }, meta } = await getTestsStudent(pagination.page, pagination.perPage);
                store.tests = tests;
            }
        } catch (err) {
            console.error(err);
        } finally {
            isLoadingData.value = false;
        }
    });

    return {
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
    }
}