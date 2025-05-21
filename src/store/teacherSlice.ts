import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Teacher, PaginatedResponse } from '../types';

interface TeacherState {
    teachers: Teacher[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: TeacherState = {
    teachers: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    isLoading: false,
    error: null,
};

export const fetchTeachers = createAsyncThunk(
    "teachers/fetchTeachers",
    async ({page,pageSize} : {page:number,pageSize:number}, {rejectWithValue}) => {
        try{
            const response = await axios.get<PaginatedResponse<Teacher>>(`${process.env.REACT_APP_API_BASE_URL}api/teacher/get-all-teachers?offset=${page}&limit=${pageSize}`);
            return response.data;
        }
        catch(error:any){
            return rejectWithValue(error.response?.data?.message || "Failed to fetch teachers");
        }
    }
);

const teacherSlice = createSlice({
    name:'teachers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teachers = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.currentPage = action.payload.currentPage;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export default teacherSlice.reducer;