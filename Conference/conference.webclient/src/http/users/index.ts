import $api from "..";
import { IUser } from "../../models/domain/IUser";
import { AuthResponse } from "../../models/response/AuthResponse";
import { IGetFewResponse } from "../../models/response/IGetFewResponse";

export const USERS = 'Users/';

export const loginUser = async (user: IUser) => {
    return await $api.post<AuthResponse>(USERS + 'LoginUser',
        {
            login: user.login,
            password: user.password
        });
}

export const createUser = async (user: IUser) => {
    return await $api.post<AuthResponse>(USERS + 'CreateUser',
        {
            login: user.login,
            password: user.password,
            role: user.role,
            displayingName: user.displayingName
        });
}

export const getUsers = async () => {
    return await $api.get<IGetFewResponse<IUser>>(USERS + 'GetUsers');
}

export const deleteUser = async (user: IUser) => {
    return await $api.delete<AuthResponse>(USERS + 'DeleteUser',
        {
            data: {
                userId: user.id
            }
        });
}