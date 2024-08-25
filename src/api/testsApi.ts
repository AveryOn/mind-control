import type { HttpContentType, HttpAuthorization, ResponseCreationTestData, ResponseGetTestsTeacher, ResponseGetTestByIdStudent, ResponseGetTestByIdTeacher } from "@/types/apiTypes";
import axios from 'axios';
import { hostname } from "@/api/index";
import type { TestSendDataServer } from "@/types/testTypes";

// Создать новый тест (Админ / Учитель)
export async function createNewTest(testData: TestSendDataServer): Promise<ResponseCreationTestData> {
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
        console.error('/src/api/testsApi.ts: createNewTest => ', err);
        throw err;
    }
}

// Получить список тестов (Админ / Учитель)
export async function getTestsTeacher(page?: number, per_page?: number): Promise<ResponseGetTestsTeacher> {
    try {
        const response = await axios.get(hostname + '/api/teacher/tests', {
            params: { page, per_page, },
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/testsApi.ts: getTestsTeacher => ', err);
        throw err;
    }
}

// Получить список тестов (Ученик)
export async function getTestsStudent(page?: number, per_page?: number, only_checked?: boolean): Promise<ResponseGetTestsTeacher> {
    try {
        const response = await axios.get(hostname + '/api/student/tests', {
            params: { page, per_page, only_checked },
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/testsApi.ts: getTestsStudent => ', err);
        throw err;
    }
}

// Получить тест по ID (Ученик)
export async function getTestByIdStudent(testId: number): Promise<ResponseGetTestByIdStudent> {
    try {
        const response = await axios.get(hostname + `/api/student/test/${testId}`, {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/testsApi.ts: getTestByIdStudent => ', err);
        throw err;
    }
}

// Получить тест по ID (Учитель)
export async function getTestByIdTeacher(testId: number): Promise<ResponseGetTestByIdTeacher> {
    try {
        const response = await axios.get(hostname + `/api/teacher/test/${testId}`, {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/testsApi.ts: getTestByIdTeacher => ', err);
        throw err;
    }
}


