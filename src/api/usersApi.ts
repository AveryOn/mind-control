import type { FetchedUserData, HttpContentType, HttpAuthorization, GetUsersParams, FetchUserList } from "@/types/apiTypes";
import axios from 'axios';
import { hostname } from "@/api/index";

export async function createNewUser() {
    try {
        // 
    } catch (err) {
        console.error('/src/api/usersApi.ts: createNewUser => ', err);
        throw err;
    }
}

// Получить собственные данные пользователя
export async function getMeData(): Promise<FetchedUserData> {
    try {
        const response = await axios.get(hostname + '/api/user/me', {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/usersApi.ts: getMeData => ', err);
        throw err;
    }
}

// Получить список учеников (Только для роли учитель и админ)
export async function getUsers(page?: number, perPage?: number): Promise<FetchUserList> {
    try {
        const response = await axios.get(hostname + '/api/users', {
            params: {
                ...{ page: page, per_page: perPage } as GetUsersParams,
            },
            headers: {
                
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/usersApi.ts: getMeData => ', err);
        throw err;
    }
}

