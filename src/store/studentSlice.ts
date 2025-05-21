import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Student, PaginatedResponse } from '../types';

interface StudentState {
    students: Student[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: StudentState = {
    students: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    isLoading: false,
    error: null,
};

export const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async ({page,pageSize}: {page:number,pageSize:number}, {rejectWithValue}) => {
        try {
            const response = await axios.get<PaginatedResponse<Student>>(
                `${process.env.REACT_APP_API_BASE_URL}api/student/get-students-by-teacher?offset=${page}&limit=${pageSize}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
        }
    }
);

export const createStudent = createAsyncThunk(
    'students/createStudent',
    async (student: Omit<Student, 'id' | 'teacherId'>, { rejectWithValue }) => {
        try {
            const response = await axios.post<Student>(
                `${process.env.REACT_APP_API_BASE_URL}api/student/create-student`,
                student
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create student');
        }
    }
);

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}api/student/delete-student/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete student');
        }
    }
);

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.currentPage = action.payload.currentPage;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(createStudent.fulfilled, (state, action) => {
                state.students.push(action.payload);
                state.totalCount += 1;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.students = state.students.filter(s => s.id !== action.payload);
                state.totalCount -= 1;
            });
        }
});

export default studentSlice.reducer;