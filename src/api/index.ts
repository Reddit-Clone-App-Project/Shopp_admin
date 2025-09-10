import axios from "axios";
import { store } from "../redux/store";
import { fetchNewAccessToken, logoutClientSide } from "../features/LoginUser/LoginSlice";
import history from "../history";

const API = axios.create({
    baseURL: "http://localhost:3000", 
    withCredentials: true, // send cookies with requests
});

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

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response ? error.response.status : null;

        const accessToken = store.getState().loginReducer.accessToken;

        if (status === 401 && !accessToken){
            console.log("User is not authenticated. No refresh attempt needed.");
            return Promise.reject(error);
        }

        if (status === 401 && !originalRequest._retry) {
            if (originalRequest.url === "/refresh") {
                console.error("Refresh token is invalid. Logging out user.");
                store.dispatch(logoutClientSide());
                history.push("/login");
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                const resultAction = await store.dispatch(fetchNewAccessToken());

                if(fetchNewAccessToken.fulfilled.match(resultAction)){
                    const newAccessToken = resultAction.payload.accessToken;
                    // API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return API(originalRequest);
                }else{
                    console.error("Failed to refresh access token. Logging out user.");
                    store.dispatch(logoutClientSide());
                    history.push("/login");
                    return Promise.reject(error);
                }
            } catch (error) {
                console.error(
                    "A critical error occurred while refreshing token. Logging out user.",
                );
                store.dispatch(logoutClientSide());
                history.push("/login");
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)

// Admin
export const login = (email: String, password: String) => API.post('/admin/login', {
        email,
        password
})

export const logout = () => API.post('/admin/logout');

// Shipper
export const loginShipper = (email: String, password: String) => API.post('/shipper/login', {
        email,
        password
});
export const logoutShipper = () => API.post('/shipper/logout');

// Storage
export const loginStorage = (email: String, password: String) => API.post('/storage/login', {
        email,
        password
});
export const logoutStorage = () => API.post('/storage/logout');

// ----------Important--------------------

export const getNewAccessToken = () => API.get("/refresh");

// ---------------------------------------