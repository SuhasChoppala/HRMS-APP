import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllEmployees = createAsyncThunk('fetchAllEmployees', async (payload, { rejectWithValue }) => {
    try {
        const fetchEmp = await axios.get('http://localhost:4000/employees');
        const employees = fetchEmp.data;
        return employees;
    } catch (error) {
        return rejectWithValue(error.fetchEmp?.data || "Something went wrong");
    }
})

export const fetchAllAppliedJobs = createAsyncThunk('fetchAllAppliedJobs', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:4000/applied_jobs');
        const fetchedJobs = await response.data;
        return fetchedJobs;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong")
    }
})

const fetchLoggedInAdmin = () => {
    if (typeof window !== 'undefined') {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            return JSON.parse(storedAdmin);
        }
    }
    return null;
}

export const adminDasboard = createSlice({
    name: 'adminDasboard',
    initialState: {
        loggedInAdmin: fetchLoggedInAdmin(),
        employeesData: [],
        error: {},
        appliedJobs: [],
        jobsError: {},
        totalEmployees: 0,
        totalJobs: 0
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEmployees.pending, (state) => {
                return { ...state };
            })
            .addCase(fetchAllEmployees.fulfilled, (state, action) => {
                return { ...state, employeesData: action.payload, totalEmployees: action.payload.length };
            })
            .addCase(fetchAllEmployees.rejected, (state, action) => {
                return { ...state, employeesData: null, error: action.payload };
            })
            .addCase(fetchAllAppliedJobs.pending, (state) => {
                return { ...state, jobsError: null };
            })
            .addCase(fetchAllAppliedJobs.fulfilled, (state, action) => {
                return { ...state, appliedJobs: action.payload, jobsError: null, totalJobs: action.payload.length };
            })
            .addCase(fetchAllAppliedJobs.rejected, (state, action) => {
                return { ...state, appliedJobs: null, jobsError: action.payload };
            });
    }
})

export default adminDasboard.reducer;