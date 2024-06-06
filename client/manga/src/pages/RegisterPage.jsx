import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Disable scrolling when the component is mounted
        document.body.style.overflow = 'hidden';
        
        // Enable scrolling when the component is unmounted
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !cpassword) {
            toast.error("Please fill in all fields");
            return;
        }
        const data = {
            username,
            email,
            password,
            cpassword,
            role // Include the selected role in the data object
        };
        try {
            setLoading(true); // Start loading animation
            const res = await axios.post('/api/users/sign-up', data, {
                withCredentials: true
            });
            if (res.status === 200) {
                toast.success("Registration successful");
                setUsername('');
                setEmail('');
                setPassword('');
                setCpassword('');
                await new Promise(resolve => setTimeout(resolve, 1000));
                navigate('/');
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                console.error("Oops :((:", error.response.data);
                const errorMessage = error.response.data.error || "Unknown error";
                toast.error("Oops :((: " + errorMessage);
            } else if (error.request) {
                console.error("No response received from the server.");
                toast.error("Error logging in. Please try again later.");
            } else {
                console.error("Error setting up the request:", error.message);
                toast.error("Error logging in. Please try again later.");
            }
        } finally {
            setLoading(false); // Stop loading animation
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen pb-20 ">
            <motion.div 
                className="w-full max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                            <input
                                autoComplete="off"
                                id="username"
                                name="username"
                                type="text"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
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
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input
                                autoComplete="off"
                                id="password"
                                name="password"
                                type="password"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                            <input
                                autoComplete="off"
                                id="cpassword"
                                name="cpassword"
                                type="password"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Confirm your password"
                                value={cpassword}
                                onChange={e => setCpassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                        <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Role</label>
                            <select
                                id="role"
                                name="role"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button 
                                type="submit" 
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={loading} // Disable the button when loading
                            >
                                {loading ? (
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                ) : (
                                    "Register"
                                )}
                            </button>
                            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800">
                                Already have an account? Login
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default Register;
