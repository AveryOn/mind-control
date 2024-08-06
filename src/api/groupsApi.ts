import type { GroupTest } from "@/types/testTypes";

export function createNewGroup(titleGroup: string): Promise<GroupTest> {
    try {
        if(!titleGroup) throw 'Поле title - обязательно';
        return new Promise((res, rej) => {
            setTimeout(() => {
                const result: GroupTest = {
                    id: 1,
                    title: titleGroup,
                    createdAt: (new Date()).toISOString(),
                    updatedAt: (new Date()).toISOString(),
                }
                res(result);
            }, 800);
        });
    } catch (err) {
        console.error('/src/api/groupsApi.ts: createNewGroup => ', err);
        throw err;
    }
}