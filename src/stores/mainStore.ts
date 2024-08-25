import type { Role } from '@/types/appTypes';
import type { GroupTest, Question, QuestionStudent, Result, ResultForCheck, Test, TestStudent, TestTeacher } from '@/types/testTypes';
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
    const statisticsResultsStudents: Ref<Result[]> = ref<Result[]>([
        { 
            id: 1, 
            userId: 1, 
            testId: 1, 
            successCount: 4, 
            questionsCount: 6, 
            isSuccess: false, 
            isChecked: true, 
            duration: 555544, 
            updatedAt: '2024-08-25T12:48:31.179Z', 
            checkDate: '2024-08-25T12:48:31.179Z', 
            createdAt: '2024-08-25T12:48:31.179Z',
        },
        { 
            id: 2, 
            userId: 1, 
            testId: 1, 
            successCount: 7, 
            questionsCount: 8, 
            isSuccess: true, 
            isChecked: true, 
            duration: 559824, 
            updatedAt: '2024-09-25T18:48:31.179Z', 
            checkDate: '2024-09-25T18:48:31.179Z', 
            createdAt: '2024-09-25T18:48:31.179Z',
        },
    ]);


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
    }
})
