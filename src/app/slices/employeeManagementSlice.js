import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllEmployees = createAsyncThunk('fetchAllEmployees', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get('/employees');
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
        const isDetailsUpdated = await axios.patch(`/employees/${payload.employeeToUpdate.id}`, payload.modifiedValuesObj);
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
        const isContactsUpdated = await axios.patch(`/employees/${payload.employeeToUpdate.id}`, { contact_details: payload.updEmpContactDetails });
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
        const response = await axios.get(`/employees/${payload.empID}`);
        const fullEmpData = response.data;

        const allAcadRecords = fullEmpData.educational_qualifications.academic_records;

        const updatedAcadRecords = allAcadRecords.map(record => record.id === payload.updatedAcadRecord.id ? payload.updatedAcadRecord : record);

        const patchPayload = {
            educational_qualifications: {
                ...fullEmpData.educational_qualifications,
                academic_records: updatedAcadRecords
            }
        }

        const empUpdation = await axios.patch(`/employees/${payload.empID}`, patchPayload);
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
        const responseEmp = await axios.get(`/employees/${payload.employeeID}`);
        const completeEmpData = responseEmp.data;

        const allProfRecords = completeEmpData.educational_qualifications.professional_qualifications;

        const updatedProfRecords = allProfRecords.map(record => record.id === payload.updatedProfRecord.id ? payload.updatedProfRecord : record);

        const patchPayloadData = {
            educational_qualifications: {
                ...completeEmpData.educational_qualifications,
                professional_qualifications: updatedProfRecords
            }
        }

        const employeeUpdation = await axios.patch(`/employees/${payload.employeeID}`, patchPayloadData);
        if (employeeUpdation) {
            return employeeUpdation.data;
        } else {
            return rejectWithValue('Professional record updation failed');
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})


export const empGuarantorUpdation = createAsyncThunk('empGuarantorUpdation', async (payload, { rejectWithValue }) => {
    try {
        const emp = await axios.get(`/employees/${payload.empID}`);
        const fullEmployeeObj = emp.data;

        const allGuarantors = fullEmployeeObj.guarantor_details;
        const updatedGuarantors = allGuarantors.map(guarantor => guarantor.id === payload.updatedGuarantor.id ? payload.updatedGuarantor : guarantor);

        const empUpdate = await axios.patch(`/employees/${payload.empID}`, { guarantor_details: updatedGuarantors });
        if (empUpdate) {
            return empUpdate.data;
        } else {
            return rejectWithValue('Guarantor Updation Failed');
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
        empEducRecordToUpdate: {},
        empGuarantorToUpdate: {}
    },
    reducers: {
        setClickedEmployee(state, action) {
            return { ...state, employeeToUpdate: action.payload };
        },
        setClickedEducRecord(state, action) {
            return { ...state, empEducRecordToUpdate: action.payload };
        },
        setClickedGuarantorRecord(state, action) {
            return { ...state, empGuarantorToUpdate: action.payload };
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

export const { setClickedEmployee, setClickedEducRecord, setClickedGuarantorRecord } = employeeManagementSlice.actions;
export default employeeManagementSlice.reducer;