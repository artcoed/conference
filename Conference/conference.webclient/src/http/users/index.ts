import $api from "..";
import { IUser } from "../../models/domain/IUser";
import { AuthResponse } from "../../models/response/AuthResponse";
import { IGetFewResponse } from "../../models/response/IGetFewResponse";

export const USERS = 'Users/';

export const loginUser = async (user: IUser) => {
    return (await $api.post(USERS + 'LoginUser',
        {
            login: user.login,
            password: user.password
        })).data as AuthResponse;
}

export const createUser = async (user: IUser) => {
    return await $api.post(USERS + 'CreateUser',
        {
            login: user.login,
            password: user.password,
            role: user.role,
            displayingName: user.displayingName
        }) as AuthResponse;
}

export const getUsers = async () => {
    return await $api.get(USERS + 'GetUsers') as IGetFewResponse<IUser>;
}

export const deleteUser = async (user: IUser) => {
    return await $api.delete(USERS + 'DeleteUser',
        {
            data: {
                userId: user.id
            }
        }) as AuthResponse;
}