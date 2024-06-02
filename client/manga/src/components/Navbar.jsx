import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../helpers/axios';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const { user, dispatch } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const categoriesRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
    };

    const handleOutsideClick = (event) => {
        if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
            setIsCategoriesOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const logout = async () => {
        const res = await axios.post('/api/users/logout');
        if (res.status === 200) {
            dispatch({ type: 'LOGOUT' });
            navigate('/login');
        }
    };

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img
                            src="https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/c0/ad/d9/c0add90c-3f9d-0a29-117d-09422c6ad5f7/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1024x1024bb.png"
                            alt="Logo"
                            className="h-8 w-8"
                        />
                        <Link to="/" className="text-xl font-bold text-gray-900 ml-2">
                            MangaHub
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                to="/"
                                className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                About
                            </Link>
                            <div className="relative">
                                <button
                                    className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none"
                                    onClick={toggleCategories}
                                >
                                    Categories
                                    <svg
                                        className="w-5 h-5 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </button>
                                <div className={`absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 ${isCategoriesOpen ? 'block' : 'hidden'}`}>
                                    <Link
                                        to="/category/action"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        Action
                                    </Link>
                                    <Link
                                        to="/category/romance"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        Romance
                                    </Link>
                                    <Link
                                        to="/category/comedy"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        Comedy
                                    </Link>
                                </div>
                            </div>
                            <Link
                                to="/contact"
                                className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Contact
                            </Link>
                            {user && (user.role === 'admin' || user.role === 'CEO') && (
                                <>
                                    <Link
                                        to="/create"
                                        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Create
                                    </Link>
                                    <Link
                                        to="/create/chapter"
                                        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        CreateChapter
                                    </Link>
                                </>
                            )}
                            {!!user && (
                                <Link
                                    to={`/${user.username}/dashboard`}
                                    className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                            )}
                            {!user && (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                            {user && (
                                <button
                                    onClick={logout}
                                    className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-800 hover:text-gray-600 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                        >
                            <svg
                                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsCategoriesOpen(false);
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsCategoriesOpen(false);
                            }}
                        >
                            About
                        </Link>
                        <div className="relative group" ref={categoriesRef}>
                            <button
                                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-between"
                                onClick={toggleCategories}
                            >
                                Categories
                                <svg
                                    className={`w-5 h-5 ml-1 transition-transform duration-300 ${
                                        isCategoriesOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </button>
                            {isCategoriesOpen && (
                                <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                                    <Link
                                        to="/category/action"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setIsCategoriesOpen(false);
                                        }}
                                    >
                                        Action
                                    </Link>
                                    <Link
                                        to="/category/romance"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setIsCategoriesOpen(false);
                                        }}
                                    >
                                        Romance
                                    </Link>
                                    <Link
                                        to="/category/comedy"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setIsCategoriesOpen(false);
                                        }}
                                    >
                                        Comedy
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link
                            to="/contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsCategoriesOpen(false);
                            }}
                        >
                            Contact
                        </Link>
                        {user && (user.role === 'admin' || user.role === 'CEO') && (
                            <>
                                <Link
                                    to="/create"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsCategoriesOpen(false);
                                    }}
                                >
                                    Create
                                </Link>
                                <Link
                                    to="/create/chapter"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsCategoriesOpen(false);
                                    }}
                                >
                                    CreateChapter
                                </Link>
                            </>
                        )}
                        {!!user && (
                            <Link
                                to={`/${user?.username}/dashboard`}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsCategoriesOpen(false);
                                }}
                            >
                                Dashboard
                            </Link>
                        )}
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsCategoriesOpen(false);
                                    }}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsCategoriesOpen(false);
                                    }}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        {user && (
                            <button
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                    setIsCategoriesOpen(false);
                                }}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
