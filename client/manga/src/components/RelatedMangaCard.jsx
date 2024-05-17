import React from 'react';
import { Link } from 'react-router-dom';

const RelatedMangaCard = ({ relatedManga }) => {
    const genres = relatedManga && relatedManga.genres ? relatedManga.genres.join(', ') : '';

    return (
        <Link to={`/manga/${relatedManga._id}`} className="block">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img src={relatedManga.coverImage} alt={relatedManga.title} className="w-full h-64 object-cover object-center" />
                <div className="p-4">
                    <h2 className="text-gray-800 font-semibold text-lg">{relatedManga.title}</h2>
                    <p className="text-gray-600 text-sm mt-1">by {relatedManga.author}</p>
                    <div className="mt-2">
                        <p className="text-gray-600 text-sm flex items-center">
                            <svg className="w-4 h-4 fill-current text-gray-600 mr-1" viewBox="0 0 24 24">
                                <path d="M20 9H4V5h16v4zM4 15h16v-4H4v4z"></path>
                            </svg>
                            {genres}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RelatedMangaCard;
