import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import RelatedMangaCard from '../components/RelatedMangaCard';

const MangaDetail = () => {
    const [manga, setManga] = useState(null);
    const [relatedManga, setRelatedManga] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [showAllChapters, setShowAllChapters] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const res = await axios.get(`/api/manga/${id}`);
                setManga(res.data);
            } catch (error) {
                console.error('Error fetching manga:', error);
                setErrors('Failed to fetch manga details');
            } finally {
                setLoading(false);
            }
        };
        fetchManga();
    }, [id]);

    useEffect(() => {
        const fetchRelatedManga = async () => {
            try {
                const res = await axios.get(`/api/manga/${id}/related`);
                if (res.status === 200) {
                    setRelatedManga(res.data);
                } else {
                    setErrors('Failed to fetch related manga');
                }
            } catch (error) {
                setErrors(error.message);
            }
        };
        fetchRelatedManga();
    }, [id]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await axios.get(`/api/chapters/${id}`);
                setChapters(res.data);
            } catch (error) {
                console.error('Error fetching chapters:', error);
                setErrors('Failed to fetch chapters');
            }
        };
        fetchChapters();
    }, [id]);

    const handleShowMoreChapters = () => {
        setShowAllChapters(true);
    };

    const handleShowLessChapters = () => {
        setShowAllChapters(false);
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
                    Loading Manga...
                </div>
            ) : (
                <>
                    {errors && <div className="text-red-600">{errors}</div>}
                    {manga ? (
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <img src={manga.coverImage} alt={manga.title} className="w-full h-64 object-cover mb-8 rounded-md" />
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{manga.title}</h2>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Author: {manga.author}</h3>
                            <div className="text-lg text-gray-700 mb-4">{manga.description}</div>
                            <div className="text-sm text-gray-600">Genres: {manga.genres.join(', ')}</div>
                            <div className="text-sm text-gray-600 mt-2">Popularity: {manga.popularity}</div>
                            <div className="text-sm text-gray-600 mt-2">Ongoing: {manga.ongoing ? 'Ongoing' : 'Completed'}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                                {chapters.slice(0, showAllChapters ? chapters.length : 5).map((chapter) => (
                                    <div key={chapter._id} className="bg-gray-100 p-4 rounded-md hover:bg-gray-200">
                                        <Link to={`/chapter/${chapter._id}`} className="block text-blue-500 hover:underline">
                                            {chapter.title}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            {!showAllChapters ? (
                                <motion.button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                                    onClick={handleShowMoreChapters}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Show More Chapters
                                </motion.button>
                            ) : (
                                <motion.button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded"
                                    onClick={handleShowLessChapters}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Show Less Chapters
                                </motion.button>
                            )}
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}

                    <h2 className="text-2xl font-semibold text-gray-800 mt-8">Related Manga</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {relatedManga.map((relatedManga) => (
                            <RelatedMangaCard key={relatedManga._id} relatedManga={relatedManga} />
                        ))}
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default MangaDetail;
