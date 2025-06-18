import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const loginAdminApi = createAsyncThunk('loginAdmin', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get('/admins')
        const admins = response.data;
        const filteredAdmin = admins.find(admin => admin.email === payload.email && admin.password === payload.password);

        if (filteredAdmin) {
            localStorage.setItem("admin", JSON.stringify(filteredAdmin));
            return { success: true, filteredAdmin }
        } else {
            return rejectWithValue("Invalid email or password");
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
})

const loginAdminSlice = createSlice({
    name: 'loginAdmin',
    initialState: {
        isLoading: false,
        data: null,
        error: null
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginAdminApi.pending, (state, action) => {
                return { ...state, isLoading: true }
            })
            .addCase(loginAdminApi.fulfilled, (state, action) => {
                return { isLoading: false, data: action.payload, error: null }
            })
            .addCase(loginAdminApi.rejected, (state, action) => {
                return { isLoading: false, data: null, error: action.payload }
            })
    }
})

export default loginAdminSlice.reducer;