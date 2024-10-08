import type { Student } from "./usersType";

export type QuestionTypes =  'text' | 'checkbox' | 'radio';
export type RadioAnswer = { answer: string, isCorrect?: boolean, is_correct?: boolean };
export type CheckboxAnswer = { answer: string, isCorrect?: boolean, is_correct?: boolean };
export type RadioAnswerStudent = { answer: string };
export type CheckboxAnswerStudent = { answer: string };
export type GroupTest = { 
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
};
export type GroupTestInput = {
    id: number;
    title: string;
}
export type ParticipantInput = {
    id: number;
    name: string;
}
export type Participant = {
    id: number;
    name: string;
    login: string;
    createdAt: string;
    updatedAt: string;
}

export type Question = {
    id?: number;
    testId?: number;
    number: number;
    question: string;
    type: QuestionTypes;
    radioAnswers?: RadioAnswer[];
    checkboxAnswers?: CheckboxAnswer[];
    createdAt?: string;
    updatedAt?: string;
}

export type QuestionStudent = {
    id: number;
    testId: number;
    number: number;
    question: string;
    type: 'text' | 'radio' | 'checkbox';
    radioAnswers: { answer: string }[];
    checkboxAnswers: { answer: string }[];
    createdAt: string;
    updatedAt: string;
}

export type Answer = {
    id: number;
    resultId: number;
    questionId: number;
    answer: string;
    isCorrect: null | boolean;
    createdAt: string;
    updatedAt: string;
}

export type AnswerStudent = {
    id: number;
    resultId: number;
    questionId: number;
    answer: string | string[];
    isCorrect: boolean;
}

export type Result = {
    id: number;
    userId: number;
    testId: number;
    isSuccess: null | boolean;
    successCount: null | number;
    questionsCount: number;
    isChecked: boolean;
    checkDate: string | null;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export type ResultForCheck = Result & {
    test: {
        id: number;
        title: string;
        summary: string;
        group: {
            id: number;
            title: string;
            createdAt: string;
            updatedAt: string;
        };
        questionsCount?: number;
        createdAt?: string;
    };
    questions: Question[];
    answers: Answer[];
    student: Student;
}

// Данные результата которые получает ученик
export interface ResultOpenStudent {
    id: number;
    userId: number;
    testId: number;
    isSuccess: null | boolean;
    successCount: null | number;
    questionsCount: number;
    isChecked: boolean;
    checkDate: string | null;
    duration: number;
    createdAt: string;
    updatedAt: string;
    test: {
        id: number;
        title: string;
        summary: string;
        group: {
            id: number;
            title: string;
            createdAt: string;
            updatedAt: string;
        };
        questionsCount?: number;
        createdAt?: string;
        updatedAt?: string;
    };
    questions: Question[];
    answers: Answer[];
}

export type Test = {
    id: number;
    title: string;
    summary: string;
    group: GroupTestInput | GroupTest;
    participants?: ParticipantInput[] | Participant[];
    questions?: Question[];
    participantsCount?: number;
    questionsCount?: number;
    result?: Result | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface TestTeacher {
    id: number;
    title: string;
    summary: string | null;
    questionsCount: number;
    participantsCount: number | null;
    createdAt: string;
    updatedAt: string;
    group: {
        id: number;
        title: string;
        createdAt: string;
        updatedAt: string;
    };
    result?: null;
} 

export interface TestStudent {
    id: number;
    title: string;
    summary: string | null;
    questionsCount: number;
    participantsCount: number | null;
    createdAt: string;
    updatedAt: string;
    group: {
        id: number;
        title: string;
        createdAt: string;
        updatedAt: string;
    };
    result: {
        id?: number;
        isChecked: boolean;
        checkDate: string | null;
        isSuccess: boolean | null;
        successCount: number | null;
        duration: number;
    } | null;
} 

export type TestCreate = {
    title: string | null;
    summary: string | null;
    group: GroupTestInput | GroupTest | null;
    participants: number[] | null;
    questions: Question[] | null;
}

export interface TestSendDataServer {
    title: string;
    summary?: string;
    group_id: number;
    participants: number[];
    questions: {
        number: number;
        checkbox_answers: {answer: number | string, is_correct: boolean}[];
        question: string;
        radio_answers: {answer: number | string, is_correct: boolean}[];
        type: QuestionTypes;
    }[];
}