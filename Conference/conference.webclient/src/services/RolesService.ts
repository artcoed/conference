import { Roles } from "../models/domain/Roles";
import { AuthResponse } from "../models/response/AuthResponse";

export const getCurrentRole = () => {
    return localStorage.getItem('role') as Roles;
}

export const setAuth = (auth: AuthResponse) => {
    localStorage.setItem('token', auth.token)
    localStorage.setItem('role', auth.role)
}