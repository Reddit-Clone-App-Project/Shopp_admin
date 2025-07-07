import axios from "axios";
import { store } from "../redux/store";
const API = axios.create({baseURL: "http://localhost:3000" });

// Add token for every request
API.interceptors.request.use((config) => {
    const token = store.getState().loginReducer.accessToken; // get token from Redux state
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const login = (email: String, password: String) => API.post('/admin/login', {
        email,
        password
})

export const logout = () => API.post('/admin/logout');

