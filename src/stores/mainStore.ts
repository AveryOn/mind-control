import type { Role } from '@/types/appTypes';
import type { GroupTest, Question, Result, ResultForCheck, Test } from '@/types/testTypes';
import type { Student, UserData } from '@/types/usersType';
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue';

export const useMainStore = defineStore('mainStore', () => {

    const appRole: Ref<Role> = ref<Role>('student');
    const isAuth: Ref<boolean> = ref<boolean>(false);
    const userData: Ref<UserData | null> = ref<UserData | null>(null);

    const students: Ref<Student[]> = ref<Student[]>([
        { id: 1, name: 'Alex Name', login: 'alex123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
        { id: 2, name: 'Bob Name', login: 'bob123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
        { id: 3, name: 'Nick Name', login: 'nick123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
    ]);
    const groups: Ref<GroupTest[]> = ref<GroupTest[]>([
        { id: 1, title: 'Frontend', createdAt: '2024-08-06T11:18:52.624Z', updatedAt: '2024-08-06T11:18:52.624Z' },
        { id: 2, title: 'Backend', createdAt: '2024-08-06T11:18:52.624Z', updatedAt: '2024-08-06T11:18:52.624Z' },
        { id: 3, title: 'CSS', createdAt: '2024-08-06T11:18:52.624Z', updatedAt: '2024-08-06T11:18:52.624Z' },
        { id: 4, title: 'HTML', createdAt: '2024-08-06T11:18:52.624Z', updatedAt: '2024-08-06T11:18:52.624Z' },
        { id: 5, title: 'REST API', createdAt: '2024-08-06T11:18:52.624Z', updatedAt: '2024-08-06T11:18:52.624Z' },
    ]);
    const tests: Ref<Test[]> = ref<Test[]>([]);

    const currentTestQuestions: Ref<Question[]> = ref<Question[]>([]);

    const opennedTest: Ref<Test | null> = ref<Test | null>(null);
    const opennedGroup: Ref<GroupTest | null> = ref<GroupTest | null>(null);


    const resultsTestForTeacher: Ref<Result[]> = ref<Result[]>([]);
    const opennedTestForCheck: Ref<Test | null> = ref<Test | null>(null);
    const openResultForCheck: Ref<ResultForCheck | null> = ref<ResultForCheck | null>(null);

    return {
        appRole,
        isAuth,
        userData,
        students,
        groups,
        tests,
        currentTestQuestions,
        resultsTestForTeacher,
        opennedTest,
        opennedGroup,
        opennedTestForCheck,
        openResultForCheck,
    }
})
