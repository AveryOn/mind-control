import type { HttpContentType, HttpAuthorization, ResponseGetTestByIdStudent, RequestCreationResultStd, RequestGetResultsTchr, ResponseCreationResultStd, ResponseGetResultsTchr, RequestGetResultByIdTchr, ResponseGetResultByIdTchr } from "@/types/apiTypes";
import axios from 'axios';
import { hostname } from "@/api/index";

// Отправить результат по тесту (Ученик)
export async function createResultStudent({ answers, duration, testId }: RequestCreationResultStd): Promise<ResponseCreationResultStd> {
    try {
        const response = await axios.post(hostname + `/api/student/test/${testId}/results/create`, {
            answers,
            duration,
        }, {
            headers: {
                ...{ "Content-Type": 'application/json' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/resultsApi.ts: createResultStudent => ', err);
        throw err;
    }
}

// Получить результаты теста (Учитель)
export async function getResultsTchr({ testId, page, perPage }: RequestGetResultsTchr): Promise<ResponseGetResultsTchr> {
    try {
        const response = await axios.get(hostname + `/api/teahcer/test/${testId}/results`, {
            params: {
                page,
                per_page: perPage,
            },
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/resultsApi.ts: getResultsTchr => ', err);
        throw err;
    }
}

// Получить результат по ID (Учитель)
export async function getResultByIdTchr({ testId, resultId }: RequestGetResultByIdTchr): Promise<ResponseGetResultByIdTchr> {
    try {
        const response = await axios.get(hostname + `/api/teahcer/test/${testId}/results/${resultId}`, {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/resultsApi.ts: getResultByIdTchr => ', err);
        throw err;
    }
}


