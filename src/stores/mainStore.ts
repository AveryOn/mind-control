import type { Role } from '@/types/appTypes';
import type { GroupTest, Question, QuestionStudent, Result, ResultForCheck, ResultOpenStudent, Test, TestStudent, TestTeacher } from '@/types/testTypes';
import type { Student, UserData } from '@/types/usersType';
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue';

export const useMainStore = defineStore('mainStore', () => {

    const appRole: Ref<Role | null> = ref<Role | null>(null);
    const isAuth: Ref<boolean> = ref<boolean>(false);
    const userData: Ref<UserData | null> = ref<UserData | null>(null);

    const students: Ref<Student[]> = ref<Student[]>([]);
    const groups: Ref<GroupTest[]> = ref<GroupTest[]>([]);
    const tests: Ref<Test[] | TestTeacher[]> = ref<Test[] | TestTeacher[]>([]);

    const currentTestQuestions: Ref<QuestionStudent[] | Question[]> = ref<QuestionStudent[] | Question[]>([]);

    const opennedTest: Ref<Test | TestTeacher | TestStudent | null> = ref<Test | TestTeacher | TestStudent | null>(null);
    const opennedGroup: Ref<GroupTest | null> = ref<GroupTest | null>(null);

    // STATISTICS  ==============
    const openResultStudent: Ref<ResultOpenStudent | null> = ref<ResultOpenStudent | null>(null);
    const statisticsResultsStudents: Ref<Result[]> = ref<Result[]>([]);


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
        statisticsResultsStudents,
        opennedTestForCheck,
        openResultForCheck,
        openResultStudent,
    }
})
