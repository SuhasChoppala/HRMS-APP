import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllEmployees = createAsyncThunk('fetchAllEmployees', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:4000/employees');
        const allEmployees = response.data;

        if (allEmployees) {
            return allEmployees;
        } else {
            return rejectWithValue('No employees data found');
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

const employeeManagementSlice = createSlice({
    name: 'employeeManagementSlice',
    initialState: {
        allEmployees: [],
        allEmployeesError: {},
        employeeToUpdate: {}
    },
    reducers: {
        setClickedEmployee(state, action) {
            return { ...state, employeeToUpdate: action.payload };
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployees.pending, (state, action) => {
                return { ...state }
            })
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                return { ...state, allEmployees: action.payload, allEmployeesError: null };
            })
            .addCase(getAllEmployees.rejected, (state, action) => {
                return { ...state, allEmployees: null, allEmployeesError: action.payload };
            })
    }
})

export const { setClickedEmployee } = employeeManagementSlice.actions;
export default employeeManagementSlice.reducer;