import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userResgistration = createAsyncThunk('userResgistration', async (payload, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const totalEmployeesLength = state.registerUser.allEmployees;
        const newUser = {
            id: `${totalEmployeesLength.length + 1}`,
            name: `${payload.name}`,
            email: `${payload.email}`,
            password: `${payload.password}`,
            contact_details: {
                phone_number: `${payload.phone_number}`,
                address: `${payload.address}`
            },
            department: `${payload.department}`,
            job_title: `${payload.job_title}`,
            start_date: `${payload.start_date}`,
            category: `${payload.category}`,
            gender: `${payload.gender}`,
            salary_amount: `${payload.salary}`,
            salary_status: `${"Not Paid"}`,
            date_of_birth: `${payload.date_of_birth}`
        }

        console.log("Registering new user:", newUser);

        const regResponse = await axios.post('http://localhost:4000/employees', newUser);
        if (regResponse.data) {
            return { success: true }
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const fetchingAllEmployees = createAsyncThunk('fetchingAllEmployees', async (payload, { rejectWithValue }) => {
    try {
        const empResponse = await axios.get('http://localhost:4000/employees');
        const totalEmployeesArray = empResponse.data;
        return totalEmployeesArray;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'Unable to fetch all employees')
    }
})

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        isLoading: false,
        allEmployees: [],
        allEmployeesError: {}
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            // fetching all employees
            .addCase(fetchingAllEmployees.pending, (state, action) => {
                return { ...state, isLoading: true }
            })
            .addCase(fetchingAllEmployees.fulfilled, (state, action) => {
                return { ...state, allEmployees: action.payload, allEmployeesError: null }
            })
            .addCase(fetchingAllEmployees.rejected, (state, action) => {
                return { ...state, allEmployees: null, allEmployeesError: action.payload }
            })
    }
})

export default registerSlice.reducer;