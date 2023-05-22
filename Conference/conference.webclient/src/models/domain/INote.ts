import { IUser } from "./IUser";

export interface INote {
    id: number;
    value: string;
    user: IUser;
};