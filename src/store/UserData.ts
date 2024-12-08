import { AgeGroupType } from './types.tsx';

export interface RegisterData {
    email: string;
    password: string;
    nickName: string;
    gender: string,
    ageGroup: AgeGroupType,
}

export interface LoginData {
    email: string;
    password: string;
}

export interface MemberData {
    id: string;
    roles: string;
    nickname: string;
    profileImageUrl: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}