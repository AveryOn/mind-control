import type { HttpContentType, HttpAuthorization, FetchUserList } from "@/types/apiTypes";
import axios from 'axios';
import { hostname } from "@/api/index";
import type { TestSendDataServer } from "@/types/testTypes";

// Создать новый тест (Админ / Учитель)
export async function createNewTest(testData: TestSendDataServer): Promise<FetchUserList> {
    try {
        const response = await axios.post(hostname + '/api/tests/create', {
            ...testData,
        }, {
            headers: {
                ...{ "Content-Type": 'application/json' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/testsApi.ts.ts: createNewTest => ', err);
        throw err;
    }
}
