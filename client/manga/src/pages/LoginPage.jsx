import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading animation
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        setLoading(true); // Set loading state to true when login process starts
        const data = { email, password };
        try {
            const res = await axios.post('/api/users/sign-in', data, {
                withCredentials: true
            });
            if (res.status === 200) {
                toast.success("Login successful");
                await new Promise(resolve => setTimeout(resolve, 1000));
                dispatch({ type: "LOGIN", payload: res.data.user });
                navigate('/');
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                const errorMessage = error.response.data.error || "Unknown error";
                toast.error("Oops :((: " + errorMessage);
            } else if (error.request) {
                toast.error("Error logging in. Please try again later.");
            } else {
                toast.error("Error logging in. Please try again later.");
            }
        } finally {
            setLoading(false); // Set loading state to false when login process completes
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 pb-20">
            <motion.div 
                className="w-full max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                autoComplete="off"
                                id="email"
                                name="email"
                                type="email"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input
                                autoComplete="off"
                                id="password"
                                name="password"
                                type="password"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button 
                                type="submit" 
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                                disabled={loading} // Disable the button when loading is true
                            >
                                {loading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                        Logging in...
                                    </>
                                ) : (
                                    <>Login</>
                                )}
                            </button>
                            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800">
                                Don't have an account? Register
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default Login;
