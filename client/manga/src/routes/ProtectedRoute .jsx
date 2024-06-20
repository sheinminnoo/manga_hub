import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
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

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
