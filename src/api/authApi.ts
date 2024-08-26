import type { HttpAuthorization, HttpContentType, LoginInputData, LoginOutputData, LogUpInputData, LogUpOutputData } from "@/types/apiTypes";
import { hostname } from "@/api/index";
import axios from "axios";

// Вход в систему
export async function loginApi({ login, password }: LoginOutputData): Promise<LoginInputData> {
    try {
        const response = await axios.post(hostname + '/api/auth/login', {
            login,
            password,
        }, {
            headers: { "Content-Type": 'application/json' } as HttpContentType,
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/authApi.ts: loginApi => ', err);
        throw err
    }
}

// Регистрация в системе
export async function logUpApi({ login, name, password }: LogUpOutputData): Promise<LogUpInputData> {
    try {
        const response = await axios.post(hostname + '/api/auth/logup', {
            name,
            login,
            password,
        }, {
            headers: { "Content-Type": 'application/json' } as HttpContentType,
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/authApi.ts: logUpApi => ', err);
        throw err;
    }
}

// Выход из системы
export async function logoutApi(): Promise<LoginInputData> {
    try {
        const response = await axios.delete(hostname + '/api/auth/logout', {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/authApi.ts: logoutApi => ', err);
        throw err;
    }
}

// Проверка доступа к системе
export async function checkAccess() {
    try {
        const response = await axios.get(hostname + '/api/auth/check', {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/authApi.ts: checkAccess => ', err);
        throw err;
    }
}
