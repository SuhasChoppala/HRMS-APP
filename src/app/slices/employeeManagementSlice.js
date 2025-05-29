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

export const empPersonalsUpdation = createAsyncThunk('empPersonalsUpdation', async (payload, { rejectWithValue }) => {
    try {
        const isDetailsUpdated = await axios.patch(`http://localhost:4000/employees/${payload.employeeToUpdate.id}`, payload.modifiedValuesObj);
        if (isDetailsUpdated) {
            return isDetailsUpdated.data;
        } else {
            return rejectWithValue('User Details Updation failed')
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

export const empContactsUpdation = createAsyncThunk('empContactsUpdation', async (payload, { rejectWithValue }) => {
    try {
        const isContactsUpdated = await axios.patch(`http://localhost:4000/employees/${payload.employeeToUpdate.id}`, { contact_details: payload.updEmpContactDetails });
        if (isContactsUpdated) {
            return isContactsUpdated.data;
        } else {
            return rejectWithValue('User Details Updation failed')
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

export const empAcadRecordUpdation = createAsyncThunk('empAcadRecordUpdation', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:4000/employees/${payload.empID}`);
        const fullEmpData = response.data;

        const allAcadRecords = fullEmpData.educational_qualifications.academic_records;

        const updatedAcadRecords = allAcadRecords.map(record => record.id === payload.updatedAcadRecord.id ? payload.updatedAcadRecord : record);

        const patchPayload = {
            educational_qualifications: {
                ...fullEmpData.educational_qualifications,
                academic_records: updatedAcadRecords
            }
        }

        const empUpdation = await axios.patch(`http://localhost:4000/employees/${payload.empID}`, patchPayload);
        if (empUpdation) {
            return empUpdation.data;
        } else {
            return rejectWithValue('Academic record updation failed');
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

export const empProfRecordUpdation = createAsyncThunk('empProfRecordUpdation', async (payload, { rejectWithValue }) => {
    try {
        const responseEmp = await axios.get(`http://localhost:4000/employees/${payload.employeeID}`);
        const completeEmpData = responseEmp.data;

        const allProfRecords = completeEmpData.educational_qualifications.professional_qualifications;

        const updatedProfRecords = allProfRecords.map(record => record.id === payload.updatedProfRecord.id ? payload.updatedProfRecord : record);

        const patchPayloadData = {
            educational_qualifications: {
                ...completeEmpData.educational_qualifications,
                professional_qualifications: updatedProfRecords
            }
        }

        const employeeUpdation = await axios.patch(`http://localhost:4000/employees/${payload.employeeID}`, patchPayloadData);
        if (employeeUpdation) {
            return employeeUpdation.data;
        } else {
            return rejectWithValue('Professional record updation failed');
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
        employeeToUpdate: {},
        empEducRecordToUpdate: {}
    },
    reducers: {
        setClickedEmployee(state, action) {
            return { ...state, employeeToUpdate: action.payload };
        },
        setClickedEducRecord(state, action) {
            return { ...state, empEducRecordToUpdate: action.payload };
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

export const { setClickedEmployee, setClickedEducRecord } = employeeManagementSlice.actions;
export default employeeManagementSlice.reducer;