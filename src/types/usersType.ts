import type { Role } from "./appTypes";

export type Student = {
    id: number;
    name: string;
    login: string;
    role?: Role;
    createdAt: string;
    updatedAt: string;
}

export type UserData = {
    id: number;
    name: string;
    login: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}