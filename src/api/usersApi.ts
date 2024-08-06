import type { FetchedUserData } from "@/types/apiTypes";

export async function createNewUser() {
    try {
        // 
    } catch (err) {
        console.error('/src/api/usersApi.ts: createNewUser => ', err);
        throw err;
    }
}

export async function getMeData(): Promise<FetchedUserData> {
    try {
        return new Promise((res, rej) => {
            setTimeout(() => {
                let dataMe: FetchedUserData = { id: 4, name: 'Admin', role: 'teacher', login: 'adminvip777', createdAt: '2023-10-01T10:00:00', updatedAt: '2023-10-01T10:00:00' };
                res(dataMe);
            }, 2000);
        })
    } catch (err) {
        console.error('/src/api/usersApi.ts: getMeData => ', err);
        throw err;
    }
}