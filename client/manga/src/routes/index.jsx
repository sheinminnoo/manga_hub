import React, { useContext } from 'react';
import App from '../App';
import HomePage from '../pages/HomePage';
import MangaDetail from '../pages/MangaDetailPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ChapterDetail from '../pages/ChapterDetail';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import CreateManga from '../pages/CreateManga';
import CreateChapter from '../pages/CreateChapter';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../routes/ProtectedRoute ';
import Message from '../components/Message';
import NotFoundPage from '../pages/404Page';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
    );
};

const Routes = () => {
    let { user, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingSpinner />;
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <ProtectedRoute element={<HomePage />} />
                },
                {
                    path: '/manga/:id',
                    element: <ProtectedRoute element={<MangaDetail />} />
                },
                {
                    path: '/chapter/:chapterId',
                    element: <ProtectedRoute element={<ChapterDetail />} />
                },
                {
                    path: '/about',
                    element: <AboutPage />
                },
                {
                    path: '/contact',
                    element: <ProtectedRoute element={<ContactPage />} />
                },
                {
                    path: '/message',
                    element: <ProtectedRoute element={<Message />} allowedRoles={['admin', 'CEO']} />
                },
                {
                    path: '/login',
                    element: !user ? <LoginPage /> : <Navigate to="/" />
                },
                {
                    path: '/register',
                    element: !user ? <RegisterPage /> : <Navigate to="/" />
                },
                {
                    path: '/create',
                    element: <ProtectedRoute element={<CreateManga />} allowedRoles={['admin', 'CEO']} />
                },
                {
                    path: '/create/chapter',
                    element: <ProtectedRoute element={<CreateChapter />} allowedRoles={['admin', 'CEO']} />
                },
                {
                    path: '/:role/dashboard',
                    element: <ProtectedRoute element={<Dashboard />} />
                },
                {
                    path: '*',
                    element: <NotFoundPage />
                }
            ]
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default Routes;
