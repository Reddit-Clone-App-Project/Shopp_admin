import { createSlice, createAsyncThunk, isFulfilled, isRejected, isPending } from "@reduxjs/toolkit";
import { login, logout, loginShipper, logoutShipper, loginStorage, logoutStorage, getNewAccessToken } from "../../api";
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: number;
    email: string;
    role: string;
}

export const handleLogin = createAsyncThunk(
    'auth/handleLogin',
    async({email, password}: { email: string, password: string}, thunkAPI) => {
        try{
            const res = await login(email, password);
            if(res?.data?.accessToken){
                const decoded: DecodedToken = jwtDecode(res.data.accessToken);
                return {
                    accessToken: res.data.accessToken,
                    role: decoded.role
                };
            }
            return thunkAPI.rejectWithValue('Login failed: Invalid response from server.');
        }catch(err: any){
            const errorMsg = err.response?.data?.error || "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);   
        }
    }
);

export const handleLogout = createAsyncThunk(
    'auth/handleLogout',
    async(_, thunkAPI) => {
        try{
            await logout();
        }catch(err: any){
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const handleLoginShipper = createAsyncThunk(
    'auth/handleLoginShipper',
    async({email, password}: { email: string, password: string}, thunkAPI) => {
        try{
            const res = await loginShipper(email, password);
            if(res?.data?.accessToken){
                const decoded: DecodedToken = jwtDecode(res.data.accessToken);
                return {
                    accessToken: res.data.accessToken,
                    role: decoded.role
                };
            }
            return thunkAPI.rejectWithValue('Login failed: Invalid response from server.');
        }catch(err: any){
            const errorMsg = err.response?.data?.error || "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const handleLogoutShipper = createAsyncThunk(
    'auth/handleLogoutShipper',
    async(_, thunkAPI) => {
        try{
            await logoutShipper();
        }catch(err: any){
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const handleLoginStorage = createAsyncThunk(
    'auth/handleLoginStorage',
    async({email, password}: { email: string, password: string}, thunkAPI) => {
        try{
            const res = await loginStorage(email, password);
            if(res?.data?.accessToken){
                const decoded: DecodedToken = jwtDecode(res.data.accessToken);
                return {
                    accessToken: res.data.accessToken,
                    role: decoded.role
                };
            }
            return thunkAPI.rejectWithValue('Login failed: Invalid response from server.');
        }catch(err: any){
            const errorMsg = err.response?.data?.error || "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const handleLogoutStorage = createAsyncThunk(
    'auth/handleLogoutStorage',
    async(_, thunkAPI) => {
        try{
            await logoutStorage();
        }catch(err: any){
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "A network or server error occurred.";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const fetchNewAccessToken = createAsyncThunk(
    "auth/getNewAccessToken",
    async (_, thunkAPI) => {
        try {
        const res = await getNewAccessToken();
        if (res?.data?.accessToken) {
            const decoded: DecodedToken = jwtDecode(res.data.accessToken);
            return {
            accessToken: res.data.accessToken,
            role: decoded.role,
            };
        }
        return thunkAPI.rejectWithValue("Failed to refresh access token.");
        } catch (err: any) {
        const errorMsg =
            err.response?.data?.error ||
            err.response?.data?.message ||
            "A network or server error occurred.";
        return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export interface AuthState {
    accessToken: string | null;
    role: string | null;
    isLoggedIn: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: AuthState = {
    accessToken: null,
    role: null,
    isLoggedIn: false,
    status: 'idle',
    error: null
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutClientSide: (state) => {
            state.accessToken = null;
            state.role = null;
            state.isLoggedIn = false;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login Cases
            .addMatcher(isPending(handleLogin, handleLoginShipper, handleLoginStorage, fetchNewAccessToken), (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addMatcher(isFulfilled(handleLogin, handleLoginShipper, handleLoginStorage, fetchNewAccessToken), (state, action) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
                state.accessToken = action.payload.accessToken;
                state.role = action.payload.role;
            })
            // Logout Cases
            .addMatcher(isPending(handleLogout, handleLogoutShipper, handleLogoutStorage), (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addMatcher(isFulfilled(handleLogout, handleLogoutShipper, handleLogoutStorage), (state) => {
                state.accessToken = null;
                state.role = null;
                state.isLoggedIn = false;
                state.status = 'idle'; 
                state.error = null;
            })
            .addMatcher(isRejected(handleLogin, handleLogout, handleLoginShipper, handleLogoutShipper, handleLoginStorage, handleLogoutStorage, fetchNewAccessToken), (state, action) => {
                if (action.meta.aborted){
                    return;
                }

                state.status = 'failed';
                state.isLoggedIn = false; 
                state.accessToken = null; 
                state.error = action.payload as string;
            });
    }
});

export const { logoutClientSide } = AuthSlice.actions;
export default AuthSlice.reducer;