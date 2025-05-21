export interface RegisterRequest {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    teacherId: string;
}

export interface Teacher {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    studentCount: number;
    students: Student[];
}

export interface AuthResponse {
    token: string;
    teacher: Teacher;
}

export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
}
