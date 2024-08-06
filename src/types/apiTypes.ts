import type { Role } from "./appTypes";
import type { UserData } from "./usersType";

// ==============  AUTH  =================
export type LoginInputData = {
    id: number;
    name: string;
    login: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}

export type LoginOutputData = {
    login: string;
    password: string;
}

// ==============  USERS  =================
export type FetchedUserData = UserData & { };