import React, { useContext, useEffect, useState } from 'react';
import axios from '../helpers/axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

const ViewFavorites = () => {
    const { user: me } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const userId = me._id;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await axios.get(`/api/favorite/${userId}`);
                console.log(res.data)
                setFavorites(res.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setErrors('Failed to fetch favorite manga');
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [userId]);

    const handleRemoveFavorite = async (mangaId) => {
        try {
            await axios.delete(`/api/favorite/${mangaId}`);
            setFavorites(favorites.filter(fav => fav.manga._id !== mangaId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <motion.div
            className="container mx-auto mt-8 pb-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? (
                <div className="flex items-center justify-center text-gray-600">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    Loading Favorites...
                </div>
            ) : (
                <>
                    {errors && <div className="text-red-600">{errors}</div>}
                    <h2 className="text-4xl font-extrabold text-white mb-8">Your Favorite Manga</h2>
                    {favorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map((favorite) => (
                            <div key={favorite.manga._id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                                <img
                                    src={favorite.manga.coverImage}
                                    alt={favorite.manga.title}
                                    className="w-full h-64 object-cover object-center"
                                />
                                <div className="p-4">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{favorite.manga.title}</h3>
                                    <Link
                                        to={`/manga/${favorite.manga._id}`}
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                                <div className="absolute top-2 left-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-red-900 cursor-pointer hover:text-yellow-600 transition duration-300"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        onClick={() => handleRemoveFavorite(favorite.manga._id)}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18.3l-1.45-1.32C3.75 12.48 1 9.35 1 6.5 1 4.42 2.42 3 4.5 3c1.54 0 3.04.99 4.5 2.4C10.96 3.99 12.46 3 14 3c2.08 0 3.5 1.42 3.5 3.5 0 2.85-2.75 5.98-8.55 10.48L10 18.3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="text-gray-600">You have no favorite manga yet.</div>
                    )}
                </>
            )}
        </motion.div>
    );
};

export default ViewFavorites;
