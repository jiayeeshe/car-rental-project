import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true; // Allow cookies to be sent with requests

const initialState = {
    user: null, // This will hold the user's information (e.g., name, email, token, etc.)
    isLoading: false, // Indicates if the login request is in progress
    error: null, // Stores any error message in case the login fails
    isAuthenticated: false, // Tracks if the user is logged in or not
};

//
export const loginUser = createAsyncThunk(
    'user/userLogIn',
    async (params, thunkAPI) => {
        try {
            const username = params.username;
            const password = params.password;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await axios.post(`${backendUrl}/api/users/login`, {
                username,
                password,
            });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            // Clear the authentication cookie
            Cookies.remove('accessToken'); // Replace 'authToken' with the actual cookie name

            // Reset the user state
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                console.log('user login pending');
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;

                state.error = action.payload; // Set the error message from response
                state.isAuthenticated = false; // Keep user unauthenticated
                console.log('User login failed');
            });
    },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
