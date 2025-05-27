import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from './slices/loginSliceUser';
import loginAdminReducer from '../app/slices/loginSliceAdmin';
import registerUserReducer from '../app/slices/userRegisterSlice';
import adminDashboardRedcuer from '../app/slices/adminDashboardSlice';
import userDashboardReducer from '../app/slices/userDashboardSlice';
import userNavbarReducer from './slices/userNavbarSlice';
import leaveApplicationReducer from './slices/userApplyLeaveSlice';
import leaveManagementReducer from './slices/leaveManagementSlice';
import updateProfileReducer from './slices/userUpdateProfileSlice';
import employeeManagementReducer from './slices/employeeManagementSlice';

export const store = configureStore({
    reducer: {
        loginUser: loginUserReducer,
        loginAdmin: loginAdminReducer,
        registerUser: registerUserReducer,
        adminDashboard: adminDashboardRedcuer,
        userDashboard: userDashboardReducer,
        userNavbar: userNavbarReducer,
        leaveApplication: leaveApplicationReducer,
        leaveManagement: leaveManagementReducer,
        updateProfile: updateProfileReducer,
        employeeManagement: employeeManagementReducer
    }
})