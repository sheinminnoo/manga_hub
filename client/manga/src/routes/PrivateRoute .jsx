import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ element }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/login' && location.pathname !== '/register') {
            localStorage.setItem('lastVisitedUrl', location.pathname);
        }
    }, [location]);

    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
