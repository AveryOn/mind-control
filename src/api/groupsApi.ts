import type { HttpContentType, HttpAuthorization, FetchGroupCreationData, FetchGroupsCreationData } from "@/types/apiTypes";
import axios from 'axios';
import { hostname } from "@/api/index";

// Создание новой группы тестов (admin | teacher)
export async function createNewGroup(titleGroup: string): Promise<FetchGroupCreationData> {
    try {
        const response = await axios.post(hostname + '/api/groups/create', {
            title: titleGroup,
        }, {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/groupsApi.ts: createNewGroup => ', err);
        throw err;
    }
}

// Получение списка групп с сервера
export async function getGroups(): Promise<FetchGroupsCreationData> {
    try {
        const response = await axios.get(hostname + '/api/groups', {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/groupsApi.ts: getGroups => ', err);
        throw err;
    }
}