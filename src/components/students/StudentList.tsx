import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    IconButton,
    Dialog,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { AppDispatch, RootState } from '../../store';
import { fetchStudents, deleteStudent } from '../../store/studentSlice';
import StudentForm from './StudentForm';
import LoadingSpinner from '../common/LoadingSpinner';


const StudentList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { students, totalCount, isLoading, error } = useSelector((state: RootState) => state.students);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openForm, setOpenForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const loadStudents = useCallback(() => {
        dispatch(fetchStudents({ page: page, pageSize: rowsPerPage }));
    }, [dispatch, page, rowsPerPage]);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await dispatch(deleteStudent(id));
            loadStudents();
        }
    }

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedStudent(null);
        loadStudents();
    }

    if (isLoading && !students.length) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Typography color="error" align="center">
                {error}
            </Typography>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    My Students
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenForm(true)}
                >
                    Add New Student
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.firstName}</TableCell>
                                <TableCell>{student.lastName}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={totalCount}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Dialog
                open={openForm}
                onClose={handleCloseForm}
                maxWidth="sm"
                fullWidth
            >
                <StudentForm
                    student={selectedStudent}
                    onClose={handleCloseForm}
                />
            </Dialog>
        </Box>
    );
};

export default React.memo(StudentList);
