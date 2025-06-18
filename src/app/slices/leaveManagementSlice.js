import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios"
import { fetchAllMessagesInDB } from "./userDashboardSlice";



export const leaveActions = createAsyncThunk('leaveActions', async (payload, { rejectWithValue }) => {
    try {
        const leaveUpdation = await api.patch(`/leavesApplications/${payload.leave.id}`, { status: payload.action });
        return leaveUpdation.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const getAllLeaveRecalls = createAsyncThunk('getAllLeaveRecalls', async (payload, { rejectWithValue }) => {
    try {
        const responseAllRecalls = await api.get('/leave_recalls');
        const response = responseAllRecalls.data;
        if (response) {
            return response;
        } else {
            return rejectWithValue('No Recalls found');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const leaveRecallofEmp = createAsyncThunk('leaveRecallofEmp', async (payload, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const recallId = state.leaveManagement.totalLeaveRecalls.length + 1;

        const recallData = {
            id: `${recallId}`,
            employee_name: `${payload.leaveToRecall.name}`,
            employee_id: `${payload.leaveToRecall.id}`,
            leave_id: `${payload.leaveToRecall.id}`,
            resumption_date: `${payload.dataTopass.resumption_date}`,
            new_resumption_date: `${payload.dataTopass.new_resumption_date}`,
            days_remaining: `${payload.dataTopass.days_remaining}`,
            reason_for_recall: `${payload.dataTopass.reason_for_recall}`,
            releif_officer: `${payload.dataTopass.relief_officer_name}`,
            status: "created",
            reason_for_decline: ""
        };

        const recalledLeave = await api.post('/leave_recalls', recallData);
        const updateLeaveAppStatus = await api.patch(`/leavesApplications/${payload.leaveToRecall.id}`, { status: "Recalled" });
        const recallMessage = {
            id: `${state.leaveManagement.allMessagesInDB.length + 1}`,
            employee_id: `${payload.leaveToRecall.id}`,
            message: `Relief Officer ${payload.dataTopass.relief_officer_name} has recalled your leave and your new resumption date is ${payload.dataTopass.new_resumption_date}. Please check the Leave Dashboard.`,
        }
        const sendNotification = await api.post('/messages', recallMessage);
        return {
            recall: recalledLeave.data,
            updatedStatus: updateLeaveAppStatus.data,
            notification: sendNotification.data
        };
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
});



const leaveManagementSlice = createSlice({
    name: 'leaveManagementSlice',
    initialState: {
        isLoading: false,
        updatedLeaveApp: [],
        updatedLeaveError: null,
        totalLeaveRecalls: [],
        totalLeaveRecallsError: {},
        allMessagesInDB: [],
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllLeaveRecalls.pending, (state, action) => {
                return { ...state }
            })
            .addCase(getAllLeaveRecalls.fulfilled, (state, action) => {
                return { ...state, totalLeaveRecalls: action.payload, totalLeaveRecallsError: null }
            })
            .addCase(getAllLeaveRecalls.rejected, (state, action) => {
                return { ...state, totalLeaveRecalls: null, totalLeaveRecallsError: action.payload }
            })
            .addCase(fetchAllMessagesInDB.pending, (state, action) => {
                return { ...state }
            })
            .addCase(fetchAllMessagesInDB.fulfilled, (state, action) => {
                return { ...state, allMessagesInDB: action.payload }
            })
            .addCase(fetchAllMessagesInDB.rejected, (state, action) => {
                return { ...state, allMessagesInDB: [] }
            })
    }
})

export default leaveManagementSlice.reducer;