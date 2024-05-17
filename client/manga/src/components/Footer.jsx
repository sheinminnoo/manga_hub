import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} MangaApp. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
