import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname !== '/login' && location.pathname !== '/register') {
            localStorage.setItem('lastVisitedUrl', location.pathname);
        }
    }, [location]);

    useEffect(() => {
        const lastVisitedUrl = localStorage.getItem('lastVisitedUrl');
        if (user && lastVisitedUrl && lastVisitedUrl !== location.pathname) {
            navigate(lastVisitedUrl, { replace: true });
        }
    }, [user, navigate, location.pathname]);

    return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
