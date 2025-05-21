import {configureStore} from "@reduxjs/toolkit";
import authReducer from './authSlice';
import teacherReducer from './teacherSlice';
import studentReducer from './studentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        teachers: teacherReducer,
        students: studentReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;