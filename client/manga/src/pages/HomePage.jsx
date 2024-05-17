import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import MangaCard from '../components/MangaCard';

const HomePage = () => {
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/manga');
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

    return (
        <div className="container mx-auto mt-8 pb-20">
            {loading ? (
                <div className="flex items-center justify-center text-gray-600">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    Loading Manga...
                </div>
            ) : (
                <>
                    {errors && <div className="text-red-600">{errors}</div>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mangas.map(manga => (
                            <MangaCard key={manga._id} manga={manga} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
