import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const loginUserApi = createAsyncThunk('loginUserApi', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:4000/employees");
        const users = response.data;
        const filteredUser = users.find((user) => user.contact_details.email === payload.userEmail && user.password === payload.userPassword);
        if (filteredUser) {
            localStorage.setItem("user", JSON.stringify(filteredUser));
            return { loginSuccess: true, filteredUser }
        } else {
            return rejectWithValue('Incorrect Email or Password');
        }
    }

    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
})


const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        data: null,
        error: null
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUserApi.pending, (state, action) => {
                return { ...state, isLoading: true }
            })
            .addCase(loginUserApi.fulfilled, (state, action) => {
                return { isLoading: false, data: action.payload, error: null }
            })
            .addCase(loginUserApi.rejected, (state, action) => {
                return { isLoading: false, data: null, error: action.payload }
            })
    }
})

export default loginSlice.reducer;