import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios"



export const applyLeave = createAsyncThunk('applyLeave', async (payload, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const leaveID = state.leaveApplication.totalLeaveApplications.length + 1;
        const leaveApplication = {
            id: `${leaveID}`,
            employee_id: `${payload.userID}`,
            name: `${payload.userName}`,
            leave_type: `${payload.leaveType}`,
            start_date: `${payload.formattedData.start_date}`,
            end_date: `${payload.formattedData.end_date}`,
            duration: `${payload.formattedData.duration}`,
            resumption_date: `${payload.formattedData.resumption_date}`,
            reason: `${payload.formattedData.reason}`,
            status: 'created'
        }
        console.log(leaveApplication);
        const leavesResponse = await api.post('/leavesApplications', leaveApplication);
        return leavesResponse.data;
    } catch (error) {
        console.log('Error:', error)
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const leaveWithdraw = createAsyncThunk('leaveWithdraw', async (payload, { rejectWithValue }) => {
    try {
        console.log('Deleting leave with ID:', payload.id);
        const withdrawResponse = await api.delete(`/leavesApplications/${payload.id}`);
        return withdrawResponse.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const allLeaveApplications = createAsyncThunk('allLeaveApplications', async (payload, { rejectWithValue }) => {
    try {
        const allLeavesResp = await api.get('/leavesApplications');
        const allLeaves = allLeavesResp.data;
        if (allLeaves) {
            return allLeaves;
        } else {
            return rejectWithValue('No leave applications found');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const filterRecallLeave = createAsyncThunk('filterRecallLeave', async (payload, { rejectWithValue }) => {
    try {
        const leaveRecalls = await api.get('/leave_recalls');
        const resp = leaveRecalls.data;
        const filteredRecall = resp.find(leaveObj => leaveObj.leave_id === payload.id && leaveObj.employee_id === payload.employee_id);
        if (filteredRecall) {
            return filteredRecall;
        } else {
            return rejectWithValue('No leave found to respond');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const updateUserRecallResp = createAsyncThunk('updateUserRecallResp', async (payload, { rejectWithValue }) => {
    try {
        const dataToUpdate = payload.userDecision === 'Approve' ? { status: "Approved", reason_for_decline: "" } : { status: "Declined", reason_for_decline: `${payload.reason}` }
        const isRecallStatUpdated = await api.patch(`/leave_recalls/${payload.id}`, dataToUpdate);
        const isLeaveDataUpdated = await api.patch(`/leavesApplications/${payload.id}`, { end_date: payload.end_date, resumption_date: payload.resumption_date, duration: payload.duration });
        return {
            recallStatus: isRecallStatUpdated.data,
            leaveDataUpdation: isLeaveDataUpdated.data
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

export const leaveApplication = createSlice({

    name: 'leaveApplication',

    initialState: {
        isLoading: false,
        totalLeaveApplications: [],
        totalLeaveAppError: {},
        recalledLeaveToRespond: {},
        recalledLeaveToRespondError: {}
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            //All Leave Applications fetch
            .addCase(allLeaveApplications.pending, (state, action) => {
                return { ...state }
            })
            .addCase(allLeaveApplications.fulfilled, (state, action) => {
                return { ...state, totalLeaveApplications: action.payload, totalLeaveAppError: null }
            })
            .addCase(allLeaveApplications.rejected, (state, action) => {
                return { ...state, totalLeaveApplications: null, totalLeaveAppError: action.payload };
            })

            //Onload prepolulation of data in recall-appr-form. 
            .addCase(filterRecallLeave.pending, (state, action) => {
                return { ...state }
            })
            .addCase(filterRecallLeave.fulfilled, (state, action) => {
                return { ...state, recalledLeaveToRespond: action.payload, recalledLeaveToRespondError: null }
            })
            .addCase(filterRecallLeave.rejected, (state, action) => {
                return { ...state, recalledLeaveToRespond: null, recalledLeaveToRespondError: action.payload }
            })
    }
})

export default leaveApplication.reducer;