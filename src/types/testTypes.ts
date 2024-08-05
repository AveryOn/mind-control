
export type QuestionTypes =  'text' | 'checkbox' | 'radio';
export type RadioAnswer = { answer: string, isCorrect?: boolean };
export type CheckboxAnswer = { answer: string, isCorrect?: boolean };
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
}

export type Answer = {
    id: number;
    questionId: number;
    answer: any;
}

export type Result = {
    id?: number;
    userId?: number;
    testId?: number;
    isSuccess?: boolean;
    successCount?: number | null;
    isChecked?: boolean;
    checkDate?: string | null;
    duration?: number;
    createdAt?: string;
    updatedAt?: string;
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

export type TestCreate = {
    title: string | null;
    summary: string | null;
    group: GroupTestInput | GroupTest | null;
    participants: ParticipantInput[] | Participant[] | null;
    questions: Question[] | null;
}