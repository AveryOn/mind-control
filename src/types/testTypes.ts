
export type QuestionTypes =  'text' | 'checkbox' | 'radio';
export type RadioAnswer = { answer: string, isCorrect: boolean };
export type CheckboxAnswer = { answer: string, isCorrect: boolean };
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
    number: number;
    question: string;
    type: QuestionTypes;
    radioAnswers?: RadioAnswer[];
    checkboxAnswers?: CheckboxAnswer[];
}

export type Test = {
    id: number;
    title: string;
    summary: string;
    group: GroupTestInput | GroupTest;
    participants: ParticipantInput[] | Participant[];
    questions: Question[];
}

export type TestCreate = {
    title: string | null;
    summary: string | null;
    group: GroupTestInput | GroupTest | null;
    participants: ParticipantInput[] | Participant[] | null;
    questions: Question[] | null;
}