import type { HttpContentType, HttpAuthorization, ResponseGetTestByIdStudent, RequestCreationResultStd } from "@/types/apiTypes";
import axios from 'axios';
import { hostname } from "@/api/index";

// Отправить результат по тесту (Ученик)
export async function createResultStudent({ answers, duration, testId }: RequestCreationResultStd): Promise<ResponseGetTestByIdStudent> {
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


