import axios from "axios";

export const BASE_URL = "https://localhost:7081/api";

const $api = axios.create({
    baseURL: BASE_URL
})

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default $api;