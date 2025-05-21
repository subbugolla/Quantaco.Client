import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ErrorBoudary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import PrivateRoute from './components/auth/PrivateRoute';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const LoginForm = React.lazy(() => import('./components/auth/LoginForm'));
const RegisterForm = React.lazy(() => import('./components/auth/RegisterForm'));
const Dashboard = React.lazy(() => import('./components/teachers/Dashboard'));
const TeacherList = React.lazy(() => import('./components/teachers/TeacherList'));
const StudentList = React.lazy(() => import('./components/students/StudentList'));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoudary>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/teachers" element={<TeacherList />} />
                  <Route path="/students" element={<StudentList />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </ErrorBoudary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
