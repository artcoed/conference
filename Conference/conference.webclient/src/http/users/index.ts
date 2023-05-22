import $api from "..";
import { IUser } from "../../models/domain/IUser";
import { AuthResponse } from "../../models/response/AuthResponse";

export const USERS = 'Users/';

export const loginUser = async (user: IUser) => {
    return await $api.post<AuthResponse>(USERS + "LoginUser",
        {
            login: user.login,
            password: user.password
        });
}