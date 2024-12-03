import { AgeGroupType } from './types.tsx';

export interface UserData {
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