import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the click is outside the navbar and the menu is open
            if (isOpen && !event.target.closest('.navbar')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50 navbar">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/c0/ad/d9/c0add90c-3f9d-0a29-117d-09422c6ad5f7/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1024x1024bb.png" alt="Logo" className="h-8 w-8" />
                        <Link to="/" className="text-xl font-bold text-gray-900 ml-2">MangaApp</Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/about" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                            <div className="relative group">
                                <button className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none" onClick={toggleMenu}>
                                    Categories
                                    <svg className="w-5 h-5 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {isOpen && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform transition-all duration-200 ease-in-out">
                                        <Link to="/category/action" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Action</Link>
                                        <Link to="/category/romance" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Romance</Link>
                                        <Link to="/category/comedy" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Comedy</Link>
                                    </div>
                                )}
                            </div>
                            <Link to="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleMenu} className="text-gray-800 hover:text-gray-600 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50">Home</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50">About</Link>
                        <div className="relative group">
                            <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50" onClick={toggleMenu}>
                                Categories
                                <svg className="w-5 h-5 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {isOpen && (
                                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg py-2">
                                    <Link to="/category/action" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Action</Link>
                                    <Link to="/category/romance" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Romance</Link>
                                    <Link to="/category/comedy" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Comedy</Link>
                                </div>
                            )}
                        </div>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50">Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar
