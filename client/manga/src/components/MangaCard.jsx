import React from 'react';
import { Link } from 'react-router-dom';

const MangaCard = ({ manga }) => {
    return (
        <Link to={`/manga/${manga._id}`} key={manga._id} className="block group">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative w-full h-64">
                    <img src={manga.coverImage} alt={manga.title} className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
                <div className="p-4">
                    <h2 className="text-gray-900 font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors duration-300 truncate">{manga.title}</h2>
                    <p className="text-gray-700 text-sm mb-2 truncate">by {manga.author}</p>
                    <div className="text-gray-600 text-sm truncate flex items-center">
                        <svg className="w-4 h-4 fill-current text-gray-600 mr-1" viewBox="0 0 24 24">
                            <path d="M20 9H4V5h16v4zM4 15h16v-4H4v4z"></path>
                        </svg>
                        {manga.genres.join(', ')}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MangaCard;
