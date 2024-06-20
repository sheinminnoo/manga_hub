// NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden pb-24">
            <style>
                {`
                html, body {
                    overflow-y: hidden;
                }
                `}
            </style>
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-8">Oops! Page Not Found</p>
            </div>
            <div className="w-64 h-64 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-500 opacity-50 animate-ping"></div>
                <img src="https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png" alt="404" className="w-full h-full object-cover rounded-full shadow-2xl" />
            </div>
            <div className="mt-8 text-center">
                <p>It looks like you've stumbled upon a void in the digital universe.</p>
                <p>Let's find our way back together!</p>
                <div className='pt-8'>
                <Link to="/" className="text-blue-500 underline font-bold">
                    Go Back to Home
                </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
