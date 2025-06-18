import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios"



// Fetch Leaves
export const fetchLeaves = createAsyncThunk('fetchLeaves', async (payload, { rejectWithValue }) => {
    try {
        const response = await api.get('/leavesApplications');
        const fetchedLeaves = response.data;
        const loggedInUserLeaves = fetchedLeaves.filter(leave => leave.employee_id === payload);
        if (loggedInUserLeaves) {
            const leaveCounts = loggedInUserLeaves.reduce((acc, leave) => {
                if (leave.status === 'Accepted' || leave.status === 'Recalled') {
                    switch (leave.leave_type) {
                        case 'Annual':
                            acc.annualLeaves += 1;
                            break;
                        case 'Sick':
                            acc.sickLeaves += 1;
                            break;
                        case 'Maternity':
                            acc.maternityLeaves += 1;
                            break;
                        case 'Compassionate':
                            acc.compassionateLeaves += 1;
                            break;
                    }
                }
                return acc;
            }, {
                annualLeaves: 0,
                sickLeaves: 0,
                maternityLeaves: 0,
                compassionateLeaves: 0
            });
            return leaveCounts;
        } else {
            return rejectWithValue("No user found to fetch leaves");
        }
    }
    catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong')
    }
})


// Fetch All Todos
export const fetchAllTodos = createAsyncThunk('fetchAllTodos', async (payload, { rejectWithValue }) => {
    try {
        const todosResponse = await api.get('/todos');
        const todos = todosResponse.data;
        const particularUserTodos = todos.filter(todo => todo.employee_id === payload);

        if (particularUserTodos) {
            return particularUserTodos;
        } else {
            return rejectWithValue('No user found to fetch Todos')
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong')
    }
})

// Toggle Task Status
export const toggleTaskStatus = createAsyncThunk('toggleTaskStatus', async (payload, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/todos/${payload.todoID}`, { isCompleted: payload.status });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});

// Fetch Announcements
export const fetchAnnouncements = createAsyncThunk('fetchAnnouncements', async (payload, { rejectWithValue }) => {
    try {
        const announcementResponse = await api.get('/announcements');
        const announcements = announcementResponse.data;

        if (announcements) {
            return announcements;
        } else {
            return rejectWithValue('Unable to fetch announcements');
        }
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

// Fetch Payslip Breakdown
export const fetchPayslipBreakdown = createAsyncThunk('fetchPayslipBreakdown', async (payload, { rejectWithValue }) => {
    try {
        const payslipResponse = await api.get('/payslip_breakdown');
        const data = payslipResponse.data;
        const particularUserPayslip = data.find(payslip => payslip.employee_id === payload);

        if (particularUserPayslip) {
            return particularUserPayslip;
        } else {
            return rejectWithValue('No pay slip breakdown found')
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

// Fetch Birthdays
export const fetchBirthdays = createAsyncThunk('fetchBirthdays', async (payload, { rejectWithValue }) => {
    try {
        const employeesData = await api.get('/employees');
        const data = employeesData.data;

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const formattedDate = `${day}-${month}`;

        const employeeBdayToday = data.filter(employee => {
            const dobParts = employee.date_of_birth.split('-');
            const dobDayMonth = `${dobParts[0]}-${dobParts[1]}`;
            if (dobDayMonth === formattedDate) {
                return true;
            }
            return false;
        });

        if (employeeBdayToday.length > 0) {
            return employeeBdayToday;
        } else {
            return rejectWithValue('No Employees Birthday Today');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
});

//fetchTotalMessages
export const fetchAllMessagesInDB = createAsyncThunk('fetchAllMessagesInDB', async (payload, { rejectWithValue }) => {
    try {
        const messages = await api.get('/messages');
        const data = messages.data;
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Unable to fetch total messages length')
    }
})

//Send wishes function 
export const sendBdayWishes = createAsyncThunk('sendBdayWishes', async (payload, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const allMessages = state.userDashboard.allMessagesInDB;
        const newMessage = {
            id: `${allMessages.length + 1}`,
            employee_id: `${payload.wishesReceiverID}`,
            message: `${payload.message} 🎉`
        };

        const wishesResponse = await api.post(`/messages`, newMessage);
        return wishesResponse.data;
    } catch (error) {
        console.log('Error:', error)
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})

// Fetch Performance Appraisal
export const fetchPerformaceAppraisal = createAsyncThunk('fetchPerformaceAppraisal', async (payload, { rejectWithValue }) => {
    try {
        const performaceResponse = await api.get('/performance_appraisal');
        const performaceData = performaceResponse.data;
        const activeUserAppraisal = performaceData.find(user => user.employee_id === payload);
        if (activeUserAppraisal) {
            return activeUserAppraisal;
        } else {
            return rejectWithValue('No data found')
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})


export const userDashboard = createSlice({
    name: 'userDashboard',
    initialState: {
        isLoading: false,
        leaves: {
            annualLeaves: 0,
            sickLeaves: 0,
            compassionateLeaves: 0,
            maternityLeaves: 0,
        },
        error: {},
        todos: [],
        todosError: {},
        announcements: [],
        announcementsError: {},
        payslips: {},
        payslipsError: {},
        employeeBirthday: [],
        employeeBirthdayError: {},
        performanceAppraisal: {},
        performanceAppError: {},
        allMessagesInDB: [],
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            // Leaves extraReducers
            .addCase(fetchLeaves.pending, (state, action) => {
                return { ...state }
            })
            .addCase(fetchLeaves.fulfilled, (state, action) => {
                return { ...state, leaves: action.payload, error: null }
            })
            .addCase(fetchLeaves.rejected, (state, action) => {
                return { ...state, leaves: null, error: action.payload }
            })

            // Todo extraReducers
            .addCase(fetchAllTodos.pending, (state, action) => {
                return { ...state, todosError: null }
            })
            .addCase(fetchAllTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.todosError = null;
            })
            .addCase(fetchAllTodos.rejected, (state, action) => {
                state.todos = null;
                state.todosError = action.payload;
            })

            // Announcements extraReducers
            .addCase(fetchAnnouncements.pending, (state, action) => {
                return { ...state }
            })
            .addCase(fetchAnnouncements.fulfilled, (state, action) => {
                return { ...state, announcements: action.payload, announcementsError: null }
            })
            .addCase(fetchAnnouncements.rejected, (state, action) => {
                return { ...state, announcements: null, announcementsError: action.payload }
            })

            // Payslips extraReducers
            .addCase(fetchPayslipBreakdown.pending, (state, action) => {
                return { ...state };
            })
            .addCase(fetchPayslipBreakdown.fulfilled, (state, action) => {
                return { ...state, payslips: action.payload, payslipsError: null }
            })
            .addCase(fetchPayslipBreakdown.rejected, (state, action) => {
                return { ...state, payslips: null, payslipsError: action.payload }
            })

            // Employee Birthday extraReducers
            .addCase(fetchBirthdays.pending, (state, action) => {
                return { ...state };
            })
            .addCase(fetchBirthdays.fulfilled, (state, action) => {
                return { ...state, employeeBirthday: action.payload, employeeBirthdayError: null }
            })
            .addCase(fetchBirthdays.rejected, (state, action) => {
                return { ...state, employeeBirthday: null, employeeBirthdayError: action.payload }
            })

            // Performance Appraisal extraReducers
            .addCase(fetchPerformaceAppraisal.pending, (state, action) => {
                return { ...state }
            })
            .addCase(fetchPerformaceAppraisal.fulfilled, (state, action) => {
                return { ...state, performanceAppraisal: action.payload, performanceAppError: null }
            })
            .addCase(fetchPerformaceAppraisal.rejected, (state, action) => {
                return { ...state, performanceAppraisal: null, performanceAppError: action.payload }
            })

            //all messages fetch extrareducers
            .addCase(fetchAllMessagesInDB.pending, (state, action) => {
                return { ...state }
            })
            .addCase(fetchAllMessagesInDB.fulfilled, (state, action) => {
                return { ...state, allMessagesInDB: action.payload, allMessagesInDBError: null }
            })
            .addCase(fetchAllMessagesInDB.rejected, (state, action) => {
                return { ...state, allMessagesInDB: null, allMessagesInDBError: action.payload }
            })
    }
})

export default userDashboard.reducer;
