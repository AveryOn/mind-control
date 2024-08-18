import type { HttpContentType, HttpAuthorization, ResponseGetQuestionsStudent } from "@/types/apiTypes";
import axios from 'axios';
import { hostname } from "@/api/index";

// Получить список вопросов (Ученик)
export async function getQuestionsStudent(testId: number): Promise<ResponseGetQuestionsStudent> {
    try {
        const response = await axios.get(hostname + `/api/student/tests/${testId}/questions`, {
            headers: {
                ...{ "Content-Type": 'application/x-www-form-urlencoded' } as HttpContentType,
                ...{ "Authorization": 'Bearer ' + localStorage.getItem('token') } as HttpAuthorization,
            }
        });
        const { data: { data, meta } } = response;
        return { data, meta };
    } catch (err) {
        console.error('/src/api/questionsApi.ts: getQuestionsStudent => ', err);
        throw err;
    }
}
