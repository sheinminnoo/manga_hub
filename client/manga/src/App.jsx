import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the footer component

function App() {
    return (
        <>
            <div className="pt-16">
                <Navbar />
                <Outlet />
            </div>
            <Footer /> {/* Include the footer component */}
        </>
    );
}

export default App;
