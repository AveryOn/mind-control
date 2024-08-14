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