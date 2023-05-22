import { Roles } from "../models/domain/Roles";

export const getCurrentRole = () => {
    return localStorage.getItem('role') as Roles;
}