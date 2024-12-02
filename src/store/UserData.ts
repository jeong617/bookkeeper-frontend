import { AgeGroupType } from './types.tsx';

export interface UserData {
    email: string;
    password: string;
    name: string;
    gender: string,
    ageGroup: AgeGroupType,
};