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
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
    <div className="mb-8">
        <img src={manga.coverImage} alt={manga.title} className="w-full h-auto object-contain rounded-xl" />
    </div>
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{manga.title}</h2>
    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Author: {manga.author}</h3>
    <p className="text-lg text-gray-800 mb-4 leading-relaxed">{manga.description}</p>
    <div className="flex flex-wrap text-gray-600 mb-4">
        <div className="mr-4">
            <span className="font-medium">Genres:</span> {manga.genres.join(', ')}
        </div>
        <div className="mr-4">
            <span className="font-medium">Popularity:</span> {manga.popularity}
        </div>
        <div>
            <span className="font-medium">Ongoing:</span> {manga.ongoing ? 'Ongoing' : 'Completed'}
        </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {chapters.slice(0, showAllChapters ? chapters.length : 5).map((chapter) => (
            <div key={chapter._id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                <Link to={`/chapter/${chapter._id}`} className="block text-blue-600 hover:underline text-lg">
                    {chapter.title}
                </Link>
            </div>
        ))}
    </div>
    {!showAllChapters ? (
        <motion.button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 mt-8 rounded-lg transition duration-300"
            onClick={handleShowMoreChapters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Show More Chapters
        </motion.button>
    ) : (
        <motion.button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 mt-8 rounded-lg transition duration-300"
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

                    <h2 className="text-2xl font-semibold text-white mt-8">Related Manga</h2>
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
