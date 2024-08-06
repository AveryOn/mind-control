import type { LoginInputData, LoginOutputData } from "@/types/apiTypes";

export async function loginApi({ login, password }: LoginOutputData): Promise<LoginInputData> {
    try {
        return new Promise((res, rej) => {
            setTimeout(() => {
                let dataMe: LoginInputData = { id: 4, name: 'Admin', role: 'teacher', login: 'adminvip777', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' };
                if(login === dataMe.login) {
                    res(dataMe);
                } else rej('UNAUTHORIZATE')
            }, 500);
        })
    } catch (err) {
        console.error('/src/api/authApi.ts: loginApi => ', err);
        throw err;
    }
}