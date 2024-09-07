import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faGithub, faDiscord, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../helpers/axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import a spinner from React Spinners

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    const form = event.target;
    const formData = new FormData(form);
  
    try {
      // Sending the form data using fetch API
      await fetch(form.action, {
        method: form.method,
        body: formData,
      });
  
      // Reset the form fields
      form.reset();
  
      // Reset the message state to clear the textarea
      setMessage('');
  
      // Show success notification
      toast.success("Your message was sent successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
  
      // Show error notification
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      // Set submitting status to false
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
          <form
            action="https://getform.io/f/blljqvvb"
            method="POST"
            id="form"
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-900 p-6 rounded-lg"
          >
            <p className="text-gray-100 font-bold text-xl mb-2">Let's connect!</p>
            <input
              type="text"
              id="name"
              placeholder="Your Name ..."
              name="name"
              className="w-full rounded-md border border-purple-600 py-2 px-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Your Email ..."
              name="email"
              className="w-full rounded-md border border-purple-600 py-2 px-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <textarea
              id="message"
              placeholder="Your Message ..."
              className="w-full rounded-md border border-purple-600 py-2 px-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-md text-gray-100 font-semibold text-xl bg-purple-600 hover:bg-purple-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ClipLoader size={24} color="#ffffff" />
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
