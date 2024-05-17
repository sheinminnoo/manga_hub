import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faGithub, faDiscord, faTelegram } from '@fortawesome/free-brands-svg-icons';


const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
            <p className="text-lg mb-6">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you! Reach out to us using the contact information below or fill out the form, and we'll get back to you as soon as possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                    <ul className="text-lg">
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email: sheinminnoojdev@gmail.com</li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone: +66 82 291 9040</li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Address: 123 Manga Street, Washington, MV 12345</li>
                    </ul>
                    <h2 className="text-2xl font-semibold mb-2 mt-6">Social Media</h2>
                    <ul className="text-lg">
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faFacebookSquare} className="mr-2" /> Facebook: <a href="www.facebook.com/SheinnMinnO" target="_blank" rel="noopener noreferrer">MangaHub</a></li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram: <a href="https://www.instagram.com/mangahub" target="_blank" rel="noopener noreferrer">@mangahub</a></li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faGithub} className="mr-2" /> GitHub: <a href="https://github.com/mangahub" target="_blank" rel="noopener noreferrer">MangaHub</a></li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faDiscord} className="mr-2" /> Discord: MangaHub Community</li>
                        <li className="flex items-center mb-2"><FontAwesomeIcon icon={faTelegram} className="mr-2" /> Telegram: MangaHub Channel</li>
                    </ul>
                </div>
                {/* Contact Form Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
                    <form className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2">Name</label>
                            <input type="text" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block mb-2">Email</label>
                            <input type="email" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block mb-2">Message</label>
                            <textarea className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32 resize-none focus:outline-none focus:border-blue-500"></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
