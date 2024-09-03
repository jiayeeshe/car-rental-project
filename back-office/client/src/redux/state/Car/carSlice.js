import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const initialState = {
    cars : [],
    isLoading : false,
};

//   
export const getAllCars = createAsyncThunk(
    "car/getAllCars",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get(`${backendUrl}/api/cars/getallcars`);
            return response.data;
        } catch (err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

const carSlice = createSlice({
    name : "car",
    initialState,
    reducers: {
        // get_all_cars: (state, action) => {
        //     state.cars = action.payload;
        //     console.log(state.cars);
        },
    extraReducers: (builder)=> {
        builder
        .addCase(getAllCars.pending, (state) =>{
            state.isLoading = true;
            console.log("getAllCars pending");
        })
        .addCase(getAllCars.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.cars = action.payload;
            console.log("getAllCars fulfilled");
        })
    }
})

export default carSlice.reducer;