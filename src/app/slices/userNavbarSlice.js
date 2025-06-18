import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios"



export const fetchMessages = createAsyncThunk('fetchMessages', async (payload, { rejectWithValue }) => {
    try {
        const messages = await api.get('/messages');
        const data = messages.data;
        const activeUserMessages = data.filter(user => user.employee_id === payload);
        if (activeUserMessages) {
            return activeUserMessages;
        } else {
            return rejectWithValue('No messages found')
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong')
    }
})

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        userMessages: [],
        userMessagesError: {}
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state, action) => {
                return { ...state };
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                return { userMessages: action.payload, userMessagesError: null }
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                return { userMessages: null, userMessagesError: action.payload }
            })
    }
})

export default navbarSlice.reducer;