import type { Role } from '@/types/appTypes';
import type { GroupTest, Question, Result, ResultForCheck, Test } from '@/types/testTypes';
import type { Student, UserData } from '@/types/usersType';
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue';

export const useMainStore = defineStore('mainStore', () => {

    const appRole: Ref<Role> = ref<Role>('teacher');
    const isAuth: Ref<boolean> = ref<boolean>(false);
    const userData: Ref<UserData | null> = ref<UserData | null>(null);

    const students: Ref<Student[]> = ref<Student[]>([]);
    const groups: Ref<GroupTest[]> = ref<GroupTest[]>([]);
    const tests: Ref<Test[]> = ref<Test[]>([]);

    const currentTestQuestions: Ref<Question[]> = ref<Question[]>([]);

    const opennedTest: Ref<Test | null> = ref<Test | null>(null);
    const opennedGroup: Ref<GroupTest | null> = ref<GroupTest | null>(null);


    const resultsTestForTeacher: Ref<Result[]> = ref<Result[]>([]);
    const opennedTestForCheck: Ref<Test | null> = ref<Test | null>(null);
    const openResultForCheck: Ref<ResultForCheck | null> = ref<ResultForCheck | null>({});

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
