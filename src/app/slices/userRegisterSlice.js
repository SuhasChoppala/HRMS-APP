import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/axios"



export const userResgistration = createAsyncThunk('userResgistration', async (payload, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const totalEmployeesLength = state.registerUser.allEmployees;
        const newUser = {
            id: `${totalEmployeesLength.length + 1}`,
            name: `${payload.name}`,
            password: `${payload.password}`,
            contact_details: {
                phoneNumber: `${payload.phone_number}`,
                phoneNumber2: "",
                email: `${payload.email}`,
                address: `${payload.address}`,
                state: "",
                city: ""
            },
            educational_qualifications: {
                academic_records: [
                    {
                        institution_name: "",
                        degree: "",
                        department: "",
                        enroll_date: "",
                        passout_date: ""
                    }
                ],
                professional_qualifications: [
                    {
                        company_name: "",
                        location: "",
                        start_date: "",
                        end_date: ""
                    }
                ]
            },
            guarantor_details: [
                {
                    guarantors_name: "",
                    occupation: "",
                    mobile_number: ""
                }
            ],
            financial_details: [
                {
                    bank_name: "",
                    account_number: "",
                    account_holder_name: ""
                }
            ],
            department: `${payload.department}`,
            job_title: `${payload.job_title}`,
            start_date: `${payload.start_date}`,
            category: `${payload.category}`,
            gender: `${payload.gender}`,
            salary_amount: `${payload.salary}`,
            salary_status: "Not Paid",
            date_of_birth: `${payload.date_of_birth}`
        };

        console.log("Registering new user:", newUser);

        const regResponse = await api.post('/employees', newUser);
        if (regResponse.data) {
            return { success: true }
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const fetchingAllEmployees = createAsyncThunk('fetchingAllEmployees', async (payload, { rejectWithValue }) => {
    try {
        const empResponse = await api.get('/employees');
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