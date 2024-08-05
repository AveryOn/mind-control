import type { Role } from '@/types/appTypes';
import type { GroupTest, Question, Test } from '@/types/testTypes';
import type { Student } from '@/types/usersType';
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue';

export const useMainStore = defineStore('mainStore', () => {

    const appRole: Ref<Role> = ref<Role>('teacher');

    const students: Ref<Student[]> = ref<Student[]>([
        { id: 1, name: 'Alex Name', login: 'alex123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
        { id: 2, name: 'Bob Name', login: 'bob123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
        { id: 3, name: 'Nick Name', login: 'nick123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
        { id: 4, name: 'Thomas Name', login: 'thomas123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
        { id: 5, name: 'John', login: 'john123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
        { id: 6, name: 'Steven Name', login: 'steven123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
        { id: 7, name: 'Jerry Name', login: 'jerry123', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' },
    ]);
    const groups: Ref<GroupTest[]> = ref<GroupTest[]>([
        { id: 1, title: 'Tested Group 1', createdAt: '2023-10-01T10:15:23', updatedAt: '2023-10-01T10:15:23'},
        { id: 2, title: 'Tested Group 2', createdAt: '2023-10-01T10:15:23', updatedAt: '2023-10-01T10:15:23'},
        { id: 3, title: 'Tested Group 3', createdAt: '2023-10-01T10:15:23', updatedAt: '2023-10-01T10:15:23'},
    ]);
    const tests: Ref<Test[]> = ref<Test[]>([
        { 
            id: 1,
            title: 'Tested Test',
            summary: 'Something Tested Summary',
            group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
            participantsCount: 5,
            questionsCount: 15,
            result: {
                successCount: 4,
                isSuccess: false,
                isChecked: true,
                checkDate: '2023-10-01T10:15:23',
                duration: 260000,
            }
        },
        { 
            id: 2,
            title: 'Second Test',
            summary: 'Something Second Summary',
            group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
            participantsCount: 5,
            questionsCount: 8,
            result: {
                successCount: 8,
                isSuccess: true,
                isChecked: true,
                checkDate: '2023-10-01T10:15:23',
                duration: 923000,
            }
        },
        { 
            id: 3,
            title: 'Third Test',
            summary: 'Something Third Summary',
            group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
            participantsCount: 5,
            questionsCount: 12,
            result: {
                successCount: 10,
                isSuccess: true,
                isChecked: true,
                checkDate: '2023-10-01T10:15:23',
                duration: 923000,
            }
        },
        { 
            id: 4,
            title: 'Fourth Test',
            summary: 'Something Fourth Summary',
            group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
            participantsCount: 5,
            questionsCount: 16,
            result: {
                successCount: null,
                isSuccess: false,
                isChecked: false,
                checkDate: null,
                duration: 923000,
            }
        },
        { 
            id: 5,
            title: 'Fifth Test',
            summary: 'Something Fifth Summary',
            group: { id: 1, createdAt: '123', title: 'Frontend', updatedAt: '123' },
            participantsCount: 5,
            questionsCount: 16,
            result: null,
        },
    ]);

    const currentTestQuestions: Ref<Question[]> = ref<Question[]>([
        { id: 1, testId: 5, number: 1, question: 'Что такое DOM?', type: 'text' },
        { id: 2, testId: 5, number: 2, question: 'Что такое замыкание JS?', type: 'text' },
        { id: 3, testId: 5, number: 3, question: 'Какие методы не могут получить Dom-элемент?', type: 'radio', radioAnswers:  [ 
            { answer: 'getElementById' }, { answer: 'getElementsById' }, { answer: 'documentQuerySelector' }, { answer: 'documentQuerySelectorAll' }
        ] },
        { id: 4, testId: 5, number: 4, question: 'Для чего нужен virtual-DOM у Vue3?', type: 'text' },
        { id: 5, testId: 5, number: 5, question: 'С помощью чего можно добится блокироваки кода?', type: 'checkbox', checkboxAnswers: [
            { answer: 'async..await' }, { answer: 'Promises' }, { answer: 'callbacks' }, { answer: 'циклом while' },
        ] },
        { id: 6, testId: 5, number: 6, question: 'Какие есть инструменты условного рендеринга во Vue3?', type: 'checkbox', checkboxAnswers: [
            { answer: 'v-if / v-else' }, { answer: 'v-for' },  { answer: 'v-show' },  
        ] },
        { id: 7, testId: 5, number: 7, question: 'Что такое Reflect?', type: 'text' },
        { id: 8, testId: 5, number: 8, question: 'Привязка контекст this зависит от...', type: 'radio', radioAnswers: [
            { answer: 'места вызова функции' }, { answer: 'места объявления функции' }, 
        ] },
        { id: 9, testId: 5, number: 9, question: 'Какое событие используется, чтобы дождаться окончания загрузки контента HTML-документа?', type: 'radio', radioAnswers: [
            { answer: 'load' }, { answer: 'DOMContentLoaded' }, { answer: 'loadeddata' },
        ] },
        { id: 10, testId: 5, number: 10, question: 'Какой модификатор объявления переменных подвержен неявному всплытию?', type: 'radio', radioAnswers: [
            { answer: 'const' }, { answer: 'let' }, { answer: 'var' },
        ] },
    ]);
    const opennedTest: Ref<Test | null> = ref<Test | null>(null);
    const opennedGroup: Ref<GroupTest | null> = ref<GroupTest | null>(null);

    return {
        appRole,
        students,
        groups,
        tests,
        currentTestQuestions,
        opennedTest,
        opennedGroup,
    }
})
