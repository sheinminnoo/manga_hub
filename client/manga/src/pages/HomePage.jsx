import React, { useEffect, useState } from 'react';
import axios from '../helpers/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import MangaCard from '../components/MangaCard';
import OngoingMangaCard from '../components/OngoingMangaCard';
import CompletedMangaCard from '../components/CompletedMangaCard';

const HomePage = () => {
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [ongoingManga, setOngoingManga] = useState([]);
    const [completedManga, setCompletedManga] = useState([]);

    useEffect(() => {
        const fetchOngoing = async () => {
            const res = await axios.get('/api/manga/status/ongoing');
            if (res.status === 200) {
                setOngoingManga(res.data);
            }
        };
        fetchOngoing();
    }, []);

    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const res = await axios.get('/api/manga');
                if (res.status === 200) {
                    setMangas(res.data);
                } else {
                    setErrors('Failed to fetch mangas');
                }
            } catch (error) {
                setErrors(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMangas();
    }, []);

    useEffect(() => {
        const fetchCompletedManga = async () => {
            const res = await axios.get('/api/manga/status/completed');
            if (res.status === 200) {
                setCompletedManga(res.data);
            }
        };
        fetchCompletedManga();
    }, []);

    const renderSection = (title, mangas, Component) => (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 smooth-scroll">
                {mangas.map(manga => (
                    <div className="flex-shrink-0 w-64" key={manga._id}>
                        <Component manga={manga} />
                    </div>
                ))}
            </div>
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
                <div className="flex items-center justify-center text-gray-600">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    Loading Manga...
                </div>
            ) : (
                <>
                    {errors && <div className="text-red-600 mb-4">{errors}</div>}
                    {renderSection('Ongoing Manga', ongoingManga, OngoingMangaCard)}
                    {renderSection('Completed Manga', completedManga, CompletedMangaCard)}
                    {renderSection('All Manga', mangas, MangaCard)}
                </>
            )}
        </motion.div>
    );
};

export default HomePage;
