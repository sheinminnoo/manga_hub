import React, { useEffect, useState } from 'react';
import axios from '../helpers/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import MangaCard from '../components/MangaCard';
import OngoingMangaCard from '../components/OngoingMangaCard';
import CompletedMangaCard from '../components/CompletedMangaCard';

const HomePage = () => {
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [ongoingManga, setOngoingManga] = useState([]);
    const [completedManga, setCompletedManga] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [filteredMangas, setFilteredMangas] = useState([]);
    const [filteredOngoingManga, setFilteredOngoingManga] = useState([]);
    const [filteredCompletedManga, setFilteredCompletedManga] = useState([]);

    // Fetch all mangas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ongoingRes, allRes, completedRes] = await Promise.all([
                    axios.get('/api/manga/status/ongoing'),
                    axios.get('/api/manga'),
                    axios.get('/api/manga/status/completed')
                ]);

                if (ongoingRes.status === 200) {
                    setOngoingManga(ongoingRes.data);
                    setFilteredOngoingManga(ongoingRes.data);
                } else {
                    setErrors('Failed to fetch ongoing mangas');
                }

                if (allRes.status === 200) {
                    setMangas(allRes.data);
                    setFilteredMangas(allRes.data);
                } else {
                    setErrors('Failed to fetch all mangas');
                }

                if (completedRes.status === 200) {
                    setCompletedManga(completedRes.data);
                    setFilteredCompletedManga(completedRes.data);
                } else {
                    setErrors('Failed to fetch completed mangas');
                }
            } catch (error) {
                setErrors(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle manga deletion
    const handleDelete = async (mangaId) => {
        try {
            const res = await axios.delete(`/api/manga/${mangaId}`);
            if (res.status === 200) {
                // Update state to reflect deletion
                setMangas(mangas.filter(manga => manga._id !== mangaId));
                setFilteredMangas(filteredMangas.filter(manga => manga._id !== mangaId));
                setOngoingManga(ongoingManga.filter(manga => manga._id !== mangaId));
                setFilteredOngoingManga(filteredOngoingManga.filter(manga => manga._id !== mangaId));
                setCompletedManga(completedManga.filter(manga => manga._id !== mangaId));
                setFilteredCompletedManga(filteredCompletedManga.filter(manga => manga._id !== mangaId));
                console.log(`Deleted manga with ID: ${mangaId}`);
            } else {
                console.error('Failed to delete manga');
            }
        } catch (error) {
            console.error('Error deleting manga:', error);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);

        // Filter each category based on search input
        const filteredAll = mangas.filter(manga =>
            manga.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        const filteredOngoing = ongoingManga.filter(manga =>
            manga.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        const filteredCompleted = completedManga.filter(manga =>
            manga.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredMangas(filteredAll);
        setFilteredOngoingManga(filteredOngoing);
        setFilteredCompletedManga(filteredCompleted);
    };

    // Render a section of manga cards
    const renderSection = (title, mangas, Component) => (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
            {mangas.length > 0 ? (
                <div className="flex overflow-x-auto space-x-4 pb-4 smooth-scroll">
                    <AnimatePresence>
                        {mangas.map(manga => (
                            <motion.div
                                key={manga._id}
                                className="flex-shrink-0 w-64"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Component manga={manga} onDelete={handleDelete} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="text-white text-center">No {title.toLowerCase()} found</div>
            )}
        </section>
    );

    return (
        <motion.div
            className="container mx-auto px-4 mt-8 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? (
                <motion.div
                    className="flex items-center justify-center h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="flex items-center justify-center space-x-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
                    >
                        <div className="w-8 h-8 bg-blue-500 rounded-full animate-ping"></div>
                        <div className="w-8 h-8 bg-green-500 rounded-full animate-ping"></div>
                        <div className="w-8 h-8 bg-red-500 rounded-full animate-ping"></div>
                    </motion.div>
                </motion.div>
            ) : (
                <>
                    {errors && <div className="text-red-600 mb-4">{errors}</div>}
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-2 pr-10 text-black rounded-md"
                                placeholder="Search Manga..."
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>
                    {renderSection('Ongoing Manga', filteredOngoingManga, OngoingMangaCard)}
                    {renderSection('Completed Manga', filteredCompletedManga, CompletedMangaCard)}
                    {renderSection('All Manga', filteredMangas, MangaCard)}
                </>
            )}
        </motion.div>
    );
};

export default HomePage;
