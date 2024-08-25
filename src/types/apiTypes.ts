import type { Role } from "./appTypes";
import type { UserData } from "./usersType";

// ОБЩЕЕ
export interface Paginator {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number | null;
    firstPage: number | null;
    hasPrev: boolean;
    hasNext: boolean;
}
// Объект мета-информации о запросе. ! Только для чтения !
export interface HttpMeta {
    meta: {
        status: number;
        url: string;
        paginator: Paginator | null;
    };
    data: { [key: string]: any } | any[] | null;
};

export type HttpContentType = {
    'Content-Type': 'application/x-www-form-urlencoded' | 'application/json';
} 
export type HttpAuthorization = {
    "Authorization": string;
}

// ==============  AUTH  =================

export interface LoginInputData {
    meta: HttpMeta;
    data: {
        user: {
            id: number;
            name: string;
            login: string;
            role: Role;
            createdAt: string;
            updatedAt: string;
        };
        token: {
            type: 'bearer';
            name: string | null;
            token: string;
            abilities: string[];
            lastUsedAt: string | null;
            expiresAt: string | null;
        };
    }
}

export type LoginOutputData = {
    login: string;
    password: string;
}

// ==============  USERS  =================
export interface FetchedUserData {
    meta: HttpMeta;
    data: {
        user: UserData
    }
};

// Объект параметров запроса для получения списка пользоватлей
export interface GetUsersParams {
    page: number;
    per_page: number;
}

export interface FetchUserList {
    meta: HttpMeta;
    data: {
        users: UserData[];
    }
}

// ################################   GROUPS   ##################################
// Получение данных группы с сервера (При её создании)
export interface FetchGroupCreationData {
    meta: HttpMeta;
    data: {
        group: {
            id: number;
            title: string;
            createdAt: string;
            updatedAt: string;
        };
    };
}

// Получение СПИСКА групп с сервера
export interface FetchGroupsCreationData {
    meta: HttpMeta;
    data: {
        groups: {
            id: number;
            title: string;
            createdAt: string;
            updatedAt: string;
        }[];
    };
}


// ################################   TESTS   ##################################

// Объект данных теста, который приходит с сервера при создании (Админ / Учитель)
export interface CreationTestData {
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

export interface TestForStudent {
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
        isCheck: boolean;
        checkDate: string | null;
        isSuccess: boolean | null;
        successCount: number | null;
        duration: number;
    } | null;
}

export interface TestForTeacher {
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
    result: null;
}

// Тело ответа от сервера при создании нового теста  (Админ / Учитель)
export interface ResponseCreationTestData {
    meta: HttpMeta;
    data: CreationTestData;
}


// Тело ответа при получении списка тестов (Админ / Учитель)
export interface ResponseGetTestsTeacher {
    meta: HttpMeta;
    data: {
        tests: CreationTestData[];
    };
}

// Тело ответа при получении списка тестов (Ученик)
export interface ResponseGetTestsStudent {
    meta: HttpMeta;
    data: {
        tests: TestForStudent[];
    };
}

// Тело ответа при получении теста по ID (Ученик)
export interface ResponseGetTestByIdStudent {
    meta: HttpMeta;
    data: {
        test: TestForStudent;
    };
}

// Тело ответа при получении теста по ID (Админ / Учитель)
export interface ResponseGetTestByIdTeacher {
    meta: HttpMeta;
    data: {
        test: TestForTeacher;
    };
}

// ################################   QUESTIONS   ##################################

// Объект вопроса, который получает клиент (Ученик)
export interface ResponseStudentQuestion {
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

// Тело ответа при получении списка тестов (Ученик)
export interface ResponseGetQuestionsStudent {
    meta: HttpMeta;
    data: {
        questions: ResponseStudentQuestion[];
    };
}


// ################################   RESULTS   ##################################

// Объект данных необходимый для создания нового результата по тесту (Ученик)
export interface RequestCreationResultStd {
    testId: number;
    duration: number;
    answers: { answer: string; questionId: number }[];
}


// Тело ответа при создании результата теста (Ученик)
export interface ResponseCreationResultStd {
    meta: HttpMeta;
    data: null;
}

// Объект необходимый для получения результатов теста (Учитель)
export interface RequestGetResultsTchr {
    testId: number;
    page?: number;
    perPage?: number;
}

// Объект необходимый для получения результатов теста (Ученик)
export interface RequestGetResultsStd {
    testId: number;
    page?: number;
    perPage?: number;
}

// Объект необходимый для получения результата по ID (Учитель)
export interface RequestGetResultByIdTchr {
    testId: number;
    resultId: number;
}

// Объект необходимый для получения результата по ID (Ученик)
export interface RequestGetResultByIdStd {
    testId: number;
    resultId: number;
}

// Объект данных, необходимый для подтверждения проверки результата (Учитель)
export interface RequestCheckResultDataTchr {
    check_date: string;
    is_success: boolean;
    result_answers: { id: number; questionId: number; isCorrect: boolean }[];
    result_id: number;
    test_id: number;
}

// Тело ответа при получении результатов теста (Учитель)
export interface ResponseGetResultsTchr {
    meta: HttpMeta;
    data: {
        results: {
            id: number;
            userId: number;
            testId: number;
            isSuccess: null | boolean;
            isChecked: boolean;
            checkDate: string | null;
            duration: number;
            successCount: null | number;
            questionsCount: number;
            createdAt: string;
            updatedAt: string;
        }[]
    };
}

// Тело ответа при получении результатов теста (Ученик)
export interface ResponseGetResultsStd {
    meta: HttpMeta;
    data: {
        results: {
            id: number;
            userId: number;
            testId: number;
            isSuccess: null | boolean;
            isChecked: boolean;
            checkDate: string | null;
            duration: number;
            successCount: null | number;
            questionsCount: number;
            createdAt: string;
            updatedAt: string;
        }[]
    };
}
// Тело ответа при получении результата по его ID (Учитель)
export interface ResponseGetResultByIdTchr {
    meta: HttpMeta;
    data: {
        result: {
            id: number;
            userId: number;
            testId: number;
            isSuccess: null | boolean;
            isChecked: boolean;
            checkDate: string | null;
            duration: number;
            successCount: null | number;
            questionsCount: number;
            createdAt: string;
            updatedAt: string;
            test: {
                id: number;
                title: string;
                summary: string;
                group: any;
                questionsCount: number;
                createdAt: string;
                updatedAt: string;
            };
            questions: {
                id: number;
                testId: number;
                number: number;
                question: string;
                type: 'text' | 'checkbox' | 'radio';
                radioAnswers: { answer: string; isCorrect: boolean }[];
                checkboxAnswers: { answer: string; isCorrect: boolean }[];
                createdAt: string;
                updatedAt: string;
            }[];
            answers: {
                id: number;
                resultId: number;
                questionId: number;
                answer: string;
                isCorrect: null | boolean;
                createdAt: string;
                updatedAt: string;
            }[];
            student: {
                id: number;
                name: string;
                login: string;
                role: "student" | "admin" | "teacher";
                createdAt: string;
                updatedAt: string;
            };
        },
    };
}

// Тело ответа при получении результата по его ID (Ученик)
export interface ResponseGetResultByIdStd {
    meta: HttpMeta;
    data: {
        result: {
            id: number;
            userId: number;
            testId: number;
            isSuccess: null | boolean;
            isChecked: boolean;
            checkDate: string | null;
            duration: number;
            successCount: null | number;
            questionsCount: number;
            createdAt: string;
            updatedAt: string;
            test: {
                id: number;
                title: string;
                summary: string;
                group: any;
                questionsCount: number;
                createdAt: string;
                updatedAt: string;
            };
            questions: {
                id: number;
                testId: number;
                number: number;
                question: string;
                type: 'text' | 'checkbox' | 'radio';
                radioAnswers: { answer: string; isCorrect: boolean }[];
                checkboxAnswers: { answer: string; isCorrect: boolean }[];
                createdAt: string;
                updatedAt: string;
            }[];
            answers: {
                id: number;
                resultId: number;
                questionId: number;
                answer: string;
                isCorrect: null | boolean;
                createdAt: string;
                updatedAt: string;
            }[];
        },
    };
}