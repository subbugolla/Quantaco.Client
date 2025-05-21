import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import { School as SchoolIcon, Group as GroupIcon } from '@mui/icons-material';
import { AppDispatch, RootState } from '../../store';
import { fetchTeachers } from '../../store/teacherSlice';
import { fetchStudents } from '../../store/studentSlice';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {user} = useSelector((state:RootState)=>state.auth);
    const studentTotalCount = useSelector((state:RootState)=>state.students.totalCount);
    const teacherTotalCount = useSelector((state:RootState)=>state.teachers.totalCount);

    const loadTeachers = useCallback(() => {
        dispatch(fetchTeachers({page:0 ,pageSize:10}));
    }, [dispatch]);

    useEffect(() => {
        loadTeachers();
    }, [loadTeachers]);

    const loadStudents = useCallback(() => {
        dispatch(fetchStudents({page:0 ,pageSize:10}));
    }, [dispatch]);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);
    
    const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                    {icon}
                    <Box>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div">
                            {value}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome, {user?.teacher.firstName}!
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                    <StatCard
                        title="My Students"
                        value={studentTotalCount}
                        icon={<SchoolIcon fontSize="large" color="primary" />}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <StatCard
                        title="Total Teachers"
                        value={teacherTotalCount}
                        icon={<GroupIcon fontSize="large" color="primary" />}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;