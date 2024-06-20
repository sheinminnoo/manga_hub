import axios from '../helpers/axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineInbox, AiOutlineSend } from 'react-icons/ai';

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axios.get('api/contact');
            if (res.status === 200) {
                // Reverse the order of messages to display the most recent first
                setMessages(res.data.reverse());
            }
        };
        fetchMessages();
    }, []);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        // Save the current scroll position
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        sessionStorage.setItem('scrollPosition', scrollTop);
    };

    const handleBackToMessages = () => {
        setSelectedMessage(null);
        // Restore the scroll position
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 pb-20">
            <main className="flex-1 p-6 overflow-y-auto mt-10 pt-10">
                {selectedMessage ? (
                    <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                        <button
                            onClick={handleBackToMessages}
                            className="text-sm text-gray-400 hover:underline mb-4"
                        >
                            Back to messages
                        </button>
                        <div className="flex items-center mb-4">
                            <img
                                //src={import.meta.env.VITE_BACKEND_URL + selectedMessage.profile}
                                src='https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LnBuZw.png'
                                alt={selectedMessage.username}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">{selectedMessage.username}</h3>
                                <span className="text-sm text-gray-400">{new Date(selectedMessage.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <p className="text-white">{selectedMessage.message}</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">Inbox</h2>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message._id}
                                    onClick={() => handleSelectMessage(message)}
                                    className="bg-gray-800 shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transform transition-all duration-300 ease-in-out"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-white">{message.username}</h3>
                                        <span className="text-sm text-gray-400">{new Date(message.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-300 truncate">{message.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Message;
