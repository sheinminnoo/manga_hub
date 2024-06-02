import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faGithub, faDiscord, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        senderEmail: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/contact', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                toast.success('Message sent successfully!');
                setFormData({
                    name: '',
                    senderEmail: '',
                    message: ''
                });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="container mx-auto px-4 py-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ToastContainer />
            <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
            <p className="text-lg mb-6">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you! Reach out to us using the contact information below or fill out the form, and we'll get back to you as soon as possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-7">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                    <ul className="text-lg">
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email: sheinminnoojdev@gmail.com</li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone: +66 82 291 9040</li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Address: 123 Manga Street, Washington, MV 12345</li>
                    </ul>
                    <h2 className="text-2xl font-semibold mb-2 mt-6">Social Media</h2>
                    <ul className="text-lg">
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faFacebookSquare} className="mr-2" /> Facebook: <a className='text-black' href="www.facebook.com/SheinnMinnO" target="_blank" rel="noopener noreferrer">SheinMinnOo</a></li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram: <a className='text-black' href="https://www.instagram.com/mangahub" target="_blank" rel="noopener noreferrer">@mangahub</a></li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faGithub} className="mr-2" /> GitHub: <a className='text-black' href="https://github.com/SHEINMINNOOJDEV/mangahub" target="_blank" rel="noopener noreferrer">SheinMinnOo</a></li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faDiscord} className="mr-2" /> Discord: MangaHub Community</li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faTelegram} className="mr-2" /> Telegram: MangaHub Channel</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
                    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Email</label>
                            <input 
                                type="email" 
                                name="senderEmail"
                                value={formData.senderEmail}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Message</label>
                            <textarea 
                                name="message" 
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32 resize-none focus:outline-none focus:border-blue-500"
                            ></textarea>
                        </div>
                        <motion.button 
                            type="submit" 
                            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                'Send Message'
                            )}
                        </motion.button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
