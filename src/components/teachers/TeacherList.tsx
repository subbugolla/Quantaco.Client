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
} from '@mui/material';
import { AppDispatch, RootState } from '../../store';
import { fetchTeachers } from '../../store/teacherSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const TeacherList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { teachers, totalCount, isLoading, error } = useSelector(
        (state: RootState) => state.teachers
    );
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const loadTeachers = useCallback(() => {
        dispatch(fetchTeachers({ page: page, pageSize: rowsPerPage }));

    }, [dispatch, page, rowsPerPage]);

    useEffect(() => {
        loadTeachers();
    }, [loadTeachers]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    if (isLoading && !teachers.length) {
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
            <Typography variant="h4" component="h1" gutterBottom>
                Teachers
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Number of Students</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers && teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell>
                                    {teacher.firstName} {teacher.lastName}
                                </TableCell>
                                <TableCell>{teacher.email}</TableCell>
                                <TableCell align="right">
                                    {teacher.studentCount}
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
        </Box>
    );
}

export default React.memo(TeacherList);