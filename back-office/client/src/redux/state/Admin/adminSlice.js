import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true; // Allow cookies to be sent with requests


const initialState = {
    admin: null,          // This will hold the user's information (e.g., name, email, token, etc.)
    isLoading: false,    // Indicates if the login request is in progress
    error: null,         // Stores any error message in case the login fails
    isAuthenticated: false  // Tracks if the user is logged in or not
};

//   
export const loginAdmin = createAsyncThunk(
    "admin/adminLogIn",
    async (params, thunkAPI) => {
        try{
            const adminID = params.adminID;
            const password = params.password;
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.post('http://localhost:3001/api/admins/login', {adminID, password});
            return response.data;
        } catch (err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

//   
export const updateCarDetails = createAsyncThunk(
    "admin/updateCarDetails",
    async (params, thunkAPI) => {
        try{
            const {carId, modifiedFields} = params;
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.put(`http://localhost:3001/api/admins/updateCarDetails/${carId}`, modifiedFields);
            return response.data;
        } catch (err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

//   
export const insertNewCar = createAsyncThunk(
    "admin/insertNewCar",
    async (params, thunkAPI) => {
        try{
            const {} = params;
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.post(`http://localhost:3001/api/admins/updateNewCar`);
            return response.data;
        } catch (err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

const adminSlice = createSlice({
    name : "admin",
    initialState,
    reducers: {
        logout(state) {
            // Clear the authentication cookie
            Cookies.remove('accessToken'); // Replace 'authToken' with the actual cookie name
            // Reset the user state
            state.isAuthenticated = false;
            state.admin = null;

        }},
    extraReducers: (builder)=> {
        builder
        .addCase(loginAdmin.pending, (state) =>{
            state.isLoading = true;
            state.error = null; 
            console.log("Admin login pending");
        })
        .addCase(loginAdmin.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.admin = action.payload;
            console.log(`admin state: ${state.admin}`);

            state.isAuthenticated = true
        })
        .addCase(loginAdmin.rejected, (state, action) => {
            state.isLoading = false;
            
            state.error = action.payload; // Set the error message from response
            state.isAuthenticated = false; // Keep user unauthenticated
            console.log("Admin login failed");
    })
        .addCase(updateCarDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            console.log("update car details pending");
        })
        .addCase(updateCarDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Update Successfully");
        })
        .addCase(updateCarDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Set the error message from response
                console.log("Update failed");
        })
        .addCase(insertNewCar.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            console.log("insert car details pending");
        })
        .addCase(insertNewCar.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("insert Successfully");
        })
        .addCase(insertNewCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Set the error message from response
                console.log("insert failed");
        })
    }
})

export default adminSlice.reducer;
export const { logout } = adminSlice.actions;