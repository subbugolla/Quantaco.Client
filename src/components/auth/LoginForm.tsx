import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Alert,
} from '@mui/material';
import { AppDispatch, RootState } from '../../store';
import { login } from '../../store/authSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const validationSchema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (values: { username: string, password: string }) => {
        const result = await dispatch(login(values));
        if (login.fulfilled.match(result)) {
            navigate('/');
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
        >
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login
                </Typography>

                {error && (
                    <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>
                )}

                <Formik initialValues={{
                    username: '',
                    password: ''
                }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <TextField fullWidth id="username" name="username" label="Username" value={values.username}
                                onChange={handleChange} onBlur={handleBlur} error={touched.username && Boolean(errors.username)} margin="normal" 
                                helperText={touched.username && errors.username}/>
                            <TextField fullWidth id="password" name="password" label="Password" value={values.password} type="password"
                                onChange={handleChange} onBlur={handleBlur} error={touched.password && Boolean(errors.password)} margin="normal" 
                                helperText={touched.password && errors.password}/>
                            <Button type="submit" fullWidth variant="contained" color="primary" size="large" disabled={isLoading} sx={{mt:3}}>
                                {isLoading? <LoadingSpinner/> : "Login"}
                            </Button>
                            <Box mt={2} textAlign="center">
                                <Button color="primary" onClick={()=>navigate('/register')}>
                                    Register
                                </Button>
                            </Box>
                        </Form>
                    )}

                </Formik>
            </Paper>
        </Box>
    );
};

export default LoginForm;