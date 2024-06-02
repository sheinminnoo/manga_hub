import React from 'react';
import { Link } from 'react-router-dom';

const CompletedMangaCard = ({ manga }) => {
    return (
        <Link to={`/manga/${manga._id}`} key={manga._id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
                <img src={manga.coverImage} alt={manga.title} className="w-full h-64 object-cover object-center" />
                <div className="p-4">
                    <h2 className="text-gray-800 font-semibold text-lg truncate">{manga.title}</h2>
                    <p className="text-gray-600 text-sm mt-1 truncate">by {manga.author}</p>
                    <div className="mt-2">
                        <p className="text-gray-600 text-sm flex items-center">
                            <svg className="w-4 h-4 fill-current text-gray-600 mr-1" viewBox="0 0 24 24">
                                <path d="M20 9H4V5h16v4zM4 15h16v-4H4v4z"></path>
                            </svg>
                            {manga.genres.join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CompletedMangaCard;
