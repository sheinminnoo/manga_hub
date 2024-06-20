import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faGithub, faDiscord, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../helpers/axios';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const { user: me } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message,setMessage] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!message.trim()) {
      toast.error("Please enter a message before sending.");
      return;
    }
  
    let data = {
      message,
      userId: me._id,
      profile : me.profile
    };
  
    try {
      const res = await axios.post('/api/contact', data);
      if (res.status === 201) {
        toast.success("Message sent successfully!");
        setMessage('');
      }
    } catch (error) {
      toast.error("Failed to send a message.");
    } finally {
      setIsSubmitting(false);
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
            <li className="flex items-center mb-2 text-white"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email: sheinminnoojdev@gmail.com</li>
            <li className="flex items-center mb-2 text-white"><FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone: +66 82 291 9040</li>
            <li className="flex items-center mb-2 text-white"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Address: 123 Manga Street, Washington, MV 12345</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-2 mt-6">Social Media</h2>
          <ul className="text-lg">
            <li className="flex items-center mb-2 text-white"><FontAwesomeIcon icon={faFacebookSquare} className="mr-2" /> Facebook: <Link className='text-blue-500' to="https://www.facebook.com/SheinnMinnO" target="_blank" rel="noopener noreferrer">SheinMinnOo</Link></li>
            <li className="flex items-center mb-2 text-white"><FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram: <Link className='text-blue-500' to="https://www.instagram.com/mangahub" target="_blank" rel="noopener noreferrer">@mangahub</Link></li>
            <li className="flex items-center mb-2 text-white"><FontAwesomeIcon icon={faGithub} className="mr-2" /> GitHub: <Link className='text-blue-500' to="https://github.com/SHEINMINNOOJDEV/mangahub" target="_blank" rel="noopener noreferrer">SheinMinnOo</Link></li>
            <li className="flex items-center mb-2 text-white"><FontAwesomeIcon icon={faDiscord} className="mr-2" /> Discord: MangaHub Community</li>
            <li className="flex items-center mb-2 text-white"><FontAwesomeIcon icon={faTelegram} className="mr-2" /> Telegram: MangaHub Channel</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Send Us a Message</h2>
          <form className="grid grid-cols-1 gap-4 pb-10" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={e=>setMessage(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32 resize-none focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <button className={`bg-yellow-500 text-red-700 py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition duration-300 ease-in-out'}`}
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> : null}
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
