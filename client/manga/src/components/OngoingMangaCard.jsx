import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../contexts/AuthContext';
import { faReact } from '@fortawesome/free-brands-svg-icons';

const OngoingMangaCard = ({ manga, onDelete }) => {
    const { user } = useContext(AuthContext);

    const deleteManga = (event) => {
        event.preventDefault();
        const confirmDelete = window.confirm("Are you sure to delete this manga??") ;
        if(confirmDelete){
            onDelete(manga._id); 
        }
    };

    return (
        <Link to={`/manga/${manga._id}`} key={manga._id} className="block group">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
                <div className="relative w-full h-64">
                    <img src={manga.coverImage} alt={manga.title} className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
                { (user.role === "CEO" || user.role === "admin") && (
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Link to={`/edit/${manga._id}`} className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
                            <FontAwesomeIcon icon={faEdit} size="lg" className="text-gray-500 hover:text-gray-900 transition-colors duration-300" />
                        </Link>
                        <button onClick={deleteManga} className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" className="text-gray-500 hover:text-gray-900 transition-colors duration-300" />
                        </button>
                    </div>
                )}

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

export default OngoingMangaCard;
