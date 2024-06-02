import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Navbar />
            <div className="flex-grow pt-16">
                <Outlet />
            </div>
            <Footer /> 
        </>

    );
}

export default App;
