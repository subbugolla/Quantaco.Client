import React from "react";
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store";
import Layout from "../common/Layout";

const PrivateRoute: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if(!user) {
        return <Navigate to="/login" replace/>
    }

    return (<Layout>
        <Outlet/>
    </Layout>);
}

export default PrivateRoute;