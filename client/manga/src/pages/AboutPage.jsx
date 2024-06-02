import React from 'react';
import { FaRegBookmark, FaUsers, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-semibold mb-4">About MangaHub</h1>
                <p className="text-lg mb-6">
                    Welcome to MangaHub, your go-to destination for manga lovers worldwide. Our platform offers a vast collection of manga titles spanning various genres, providing an immersive reading experience for enthusiasts of all ages.
                </p>
                <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                <p className="text-lg mb-6">
                    At MangaHub, our mission is to connect manga enthusiasts with their favorite stories while also introducing them to new and exciting titles. We strive to make manga accessible to everyone, fostering a community where readers can discover, explore, and share their passion for manga.
                </p>
                <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
                <ul className="list-disc pl-6">
                    <li className="text-lg mb-2 flex items-center"><FaRegBookmark className="mr-2" /> Extensive Collection: Access thousands of manga titles across various genres.</li>
                    <li className="text-lg mb-2 flex items-center"><FaUsers className="mr-2" /> User-friendly Interface: Enjoy a seamless reading experience with our intuitive interface.</li>
                    {/* Add more features with icons */}
                </ul>
                <h2 className="text-2xl font-semibold mb-2">Meet the Team</h2>
                <div className="flex flex-wrap justify-center">
                    {/* Add team members with their names, roles, and images */}
                    <motion.div 
                        className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <img src="https://media1.tenor.com/m/wRY6wTo2rOwAAAAC/hajime-hinata.gif" alt="Team Member 1" className="w-full h-auto" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Shein Minn Oo</h3>
                                <p className="text-lg">Co-Founder & CEO</p>
                                {/* Add social media links or other interactive elements */}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <img src="https://media.tenor.com/mWOA0c_KSgIAAAAi/chibi-anime.gif" alt="Team Member 1" className="w-full h-auto" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Sawako</h3>
                                <p className="text-lg">Manager & Admin</p>
                                {/* Add social media links or other interactive elements */}
                            </div>
                        </div>
                    </motion.div>
                    {/* Add more team members */}
                </div>
                {/* Add testimonials, partnerships, or other relevant sections */}
            </motion.div>
        </div>
    );
};

export default AboutPage;
