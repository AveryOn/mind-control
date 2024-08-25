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
    const openResultStudent: Ref<ResultOpenStudent | null> = ref<ResultOpenStudent | null>({
        id: 9,
        userId: 4,
        testId: 15,
        isSuccess: true,
        isChecked: true,
        checkDate: "2024-08-19T11:44:26.040Z",
        duration: 0,
        successCount: 4,
        createdAt: "2024-08-19T11:35:33.153+00:00",
        updatedAt: "2024-08-19T11:44:26.087+00:00",
        questionsCount: 6,
        test: {
            id: 15,
            title: "Асинхронность JS",
            summary: "Тест для проверки теоретических знаний асинхронности в языке JavaScript",
            questionsCount: 6,
            createdAt: "2024-08-19T11:17:21.365+00:00",
            updatedAt: "2024-08-19T11:17:21.365+00:00",
            group: {
                id: 6,
                title: "Frontend",
                createdAt: "2024-08-13T13:12:26.601+00:00",
                updatedAt: "2024-08-13T13:12:26.602+00:00"
            }
        },
        questions: [
            {
                id: 30,
                testId: 15,
                number: 1,
                question: "Что такое асинхронность в JavaScript?",
                type: "text",
                radioAnswers: [],
                checkboxAnswers: [],
                createdAt: "2024-08-19T11:17:21.385+00:00",
                updatedAt: "2024-08-19T11:17:21.385+00:00"
            },
            {
                id: 31,
                testId: 15,
                number: 2,
                question: "Для чего применяется асинхронность?",
                type: "text",
                radioAnswers: [],
                checkboxAnswers: [],
                createdAt: "2024-08-19T11:17:21.392+00:00",
                updatedAt: "2024-08-19T11:17:21.392+00:00"
            },
            {
                id: 32,
                testId: 15,
                number: 3,
                question: "На каких концепциях в JS основана асинхронность?",
                type: "checkbox",
                radioAnswers: [],
                checkboxAnswers: [
                    {
                        answer: "1) Коллбэки",
                        is_correct: true
                    },
                    {
                        answer: "2) Промисы",
                        is_correct: true
                    },
                    {
                        answer: "3) async..await",
                        is_correct: true
                    },
                    {
                        answer: "4) Proxy-объекты",
                        is_correct: false
                    },
                    {
                        answer: "5) XHR-запросы",
                        is_correct: false
                    }
                ],
                createdAt: "2024-08-19T11:17:21.397+00:00",
                updatedAt: "2024-08-19T11:17:21.398+00:00"
            },
            {
                id: 33,
                testId: 15,
                number: 4,
                question: "Блокирует ли \"await\" выполнение?",
                type: "radio",
                radioAnswers: [
                    {
                        answer: "Да",
                        is_correct: false
                    },
                    {
                        answer: "Нет",
                        is_correct: true
                    }
                ],
                checkboxAnswers: [],
                createdAt: "2024-08-19T11:17:21.402+00:00",
                updatedAt: "2024-08-19T11:17:21.403+00:00"
            },
            {
                id: 34,
                testId: 15,
                number: 5,
                question: "Чем подход промисов отличается от подхода коллбэков?",
                type: "text",
                radioAnswers: [],
                checkboxAnswers: [],
                createdAt: "2024-08-19T11:17:21.407+00:00",
                updatedAt: "2024-08-19T11:17:21.407+00:00"
            },
            {
                id: 35,
                testId: 15,
                number: 6,
                question: "Можно ли перехватывать ошибки с помощью try..catch при условии, что внутри блока try мы используем промис ожидая его в коллбэке then?",
                type: "radio",
                radioAnswers: [
                    {
                        answer: "Нельзя",
                        is_correct: true
                    },
                    {
                        answer: "Льзя",
                        is_correct: false
                    },
                    {
                        answer: "Льзя, но необходимо использовать метод catch",
                        is_correct: false
                    }
                ],
                checkboxAnswers: [],
                createdAt: "2024-08-19T11:17:21.411+00:00",
                updatedAt: "2024-08-19T11:17:21.411+00:00"
            }
        ],
        answers: [
            {
                id: 26,
                resultId: 9,
                questionId: 30,
                answer: "Не знаю",
                isCorrect: false,
                createdAt: "2024-08-19T11:35:33.155+00:00",
                updatedAt: "2024-08-19T11:44:26.090+00:00"
            },
            {
                id: 27,
                resultId: 9,
                questionId: 31,
                answer: "для того чтобы было",
                isCorrect: false,
                createdAt: "2024-08-19T11:35:33.157+00:00",
                updatedAt: "2024-08-19T11:44:26.093+00:00"
            },
            {
                id: 28,
                resultId: 9,
                questionId: 32,
                answer: "[\"1) Коллбэки\",\"2) Промисы\",\"3) async..await\"]",
                isCorrect: true,
                createdAt: "2024-08-19T11:35:33.159+00:00",
                updatedAt: "2024-08-19T11:44:26.095+00:00"
            },
            {
                id: 29,
                resultId: 9,
                questionId: 33,
                answer: "Нет",
                isCorrect: true,
                createdAt: "2024-08-19T11:35:33.161+00:00",
                updatedAt: "2024-08-19T11:44:26.097+00:00"
            },
            {
                id: 30,
                resultId: 9,
                questionId: 34,
                answer: "ничем",
                isCorrect: true,
                createdAt: "2024-08-19T11:35:33.163+00:00",
                updatedAt: "2024-08-19T11:44:26.100+00:00"
            },
            {
                id: 31,
                resultId: 9,
                questionId: 35,
                answer: "Нельзя",
                isCorrect: true,
                createdAt: "2024-08-19T11:35:33.165+00:00",
                updatedAt: "2024-08-19T11:44:26.103+00:00"
            }
        ],
    });
    const statisticsResultsStudents: Ref<Result[]> = ref<Result[]>([
        { 
            id: 1, 
            userId: 1, 
            testId: 1, 
            isSuccess: false, 
            isChecked: true, 
            checkDate: '2024-08-25T12:48:31.179Z', 
            duration: 555544, 
            successCount: 4, 
            updatedAt: '2024-08-25T12:48:31.179Z', 
            createdAt: '2024-08-25T12:48:31.179Z',
            questionsCount: 6, 
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
        openResultStudent,
    }
})
