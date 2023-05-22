import { IUser } from "./IUser";

export interface IVote {
    id: number;
    value: string;
    users: IUser[];
};
