import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const personalDetailsUpdation = createAsyncThunk('personalDetailsUpdation', async (payload, { rejectWithValue }) => {
    try {
        const isUserNameUpdated = await axios.patch(`/employees/${payload.userID}`, payload.modifiedFieldsObj);
        if (isUserNameUpdated) {
            return isUserNameUpdated.data;
        } else {
            return rejectWithValue('Updation failed')
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

export const contactDetailsUpdation = createAsyncThunk('contactDetailsUpdation', async (payload, { rejectWithValue }) => {
    try {
        const isContactDetUpdated = await axios.patch(`/employees/${payload.userId}`, { contact_details: payload.updatedContactDetails })
        if (isContactDetUpdated) {
            return isContactDetUpdated.data;
        } else {
            return rejectWithValue('Contact details updation failed')
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

export const updateAcademicRecord = createAsyncThunk('updateAcademicRecord', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/employees/${payload.userID}`);
        const employeeData = response.data;

        const allAcadRecords = employeeData.educational_qualifications.academic_records;

        const updatedAcadRecords = allAcadRecords.map(record => record.id === payload.eduRecordToUpdate.clickedRecord.id ? payload.updatedEduRecord : record);

        const patchPayload = {
            educational_qualifications: {
                ...employeeData.educational_qualifications,
                academic_records: updatedAcadRecords
            }
        }

        const isRecordUpdated = await axios.patch(`/employees/${payload.userID}`, patchPayload);

        if (isRecordUpdated) {
            return isRecordUpdated.data;
        } else {
            return rejectWithValue('Record not updated');
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

export const updateProfessionalRecord = createAsyncThunk('updateProfessionalRecord', async (payload, { rejectWithValue }) => {
    try {
        const userResponse = await axios.get(`/employees/${payload.userID}`);

        const employeeFullData = userResponse.data;

        const allProfQualsArray = employeeFullData.educational_qualifications.professional_qualifications;

        const updatedProfQualArray = allProfQualsArray.map(object => object.id === payload.eduRecordToUpdate.clickedRecord.id ? payload.updatedProfObj : object);

        const patchPayload = {
            educational_qualifications: {
                ...employeeFullData.educational_qualifications,
                professional_qualifications: updatedProfQualArray
            }
        }

        const isProfRecordUpdated = await axios.patch(`/employees/${payload.userID}`, patchPayload);
        if (isProfRecordUpdated) {
            return isProfRecordUpdated.data;
        } else {
            return rejectWithValue("Professional Record Updation failed");
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

export const updateGuarantorDetails = createAsyncThunk('updateGuarantorDetails', async (payload, { rejectWithValue }) => {
    try {
        const getUser = await axios.get(`/employees/${payload.userID}`);
        const userFullData = getUser.data;
        const allUserGuarantors = userFullData.guarantor_details;

        const updatedGuarantorsArray = allUserGuarantors.map(guarantor => guarantor.id === payload.updatedGuarantorObj.id ? payload.updatedGuarantorObj : guarantor);

        const isGuarantorsUpdated = await axios.patch(`/employees/${payload.userID}`, { guarantor_details: updatedGuarantorsArray });
        if (isGuarantorsUpdated) {
            return isGuarantorsUpdated.data;
        } else {
            return rejectWithValue('Guarantor Updation failed');
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong')
    }
})

export const updateFinancialDetails = createAsyncThunk('updatedFinancialDetails', async (payload, { rejectWithValue }) => {
    try {
        const getCurrentUser = await axios.get(`/employees/${payload.userID}`);
        const userCompleteData = getCurrentUser.data;
        const allFinancialDetails = userCompleteData.financial_details;

        const updatedFinancialsArray = allFinancialDetails.map(record => record.id === payload.updatedFinObject.id ? payload.updatedFinObject : record);

        const isFinUpdated = await axios.patch(`/employees/${payload.userID}`, { financial_details: updatedFinancialsArray });
        if (isFinUpdated) {
            return isFinUpdated.data;
        } else {
            return rejectWithValue('Financial Record Updation Failed');
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Something went wrong');
    }
})

const updateProfileSlice = createSlice({
    name: 'updateProfileSlice',
    initialState: {
        eduRecordToUpdate: {},
        guarantorToUpdate: {},
        finRecordToUpdate: {}
    },

    reducers: {
        setClickedRecord(state, action) {
            return { ...state, eduRecordToUpdate: action.payload };
        },
        setClickedGuarantor(state, action) {
            return { ...state, guarantorToUpdate: action.payload };
        },
        setClickedFinRecord(state, action) {
            return { ...state, finRecordToUpdate: action.payload };
        }
    }
})


export const { setClickedRecord, setClickedGuarantor, setClickedFinRecord } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
