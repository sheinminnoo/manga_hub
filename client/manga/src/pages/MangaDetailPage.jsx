import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import RelatedMangaCard from '../components/RelatedMangaCard';

const MangaDetail = () => {
    const [manga, setManga] = useState(null);
    const [relatedManga, setRelatedManga] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [errors, setErrors] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/manga/${id}`);
                setManga(res.data);
            } catch (error) {
                console.error('Error fetching manga:', error);
                setErrors('Failed to fetch manga details');
            } finally {
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };
        fetchManga();
    }, [id]);

    useEffect(() => {
        const fetchRelatedManga = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/manga/${id}/related`);
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
                    {manga ? (
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <img src={manga.coverImage} alt={manga.title} className="w-full h-64 object-cover mb-8 rounded-md" />
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{manga.title}</h2>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Author: {manga.author}</h3>
                            <div className="text-lg text-gray-700 mb-4">{manga.description}</div>
                            <div className="text-sm text-gray-600">Genres: {manga.genres.join(', ')}</div>
                            <div className="text-sm text-gray-600 mt-2">Popularity: {manga.popularity}</div>
                            <div className="text-sm text-gray-600 mt-2">Ongoing: {manga.ongoing ? 'Yes' : 'No'}</div>
                            <ul className="list-disc list-inside mt-4">
                                {manga.chapters.map((chapter) => (
                                    <li key={chapter._id}>
                                        <Link to={`/chapter/${chapter._id}`} className="text-blue-500 hover:underline">{chapter.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                    <h2 className="text-2xl font-semibold text-white mt-8">Related Manga</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {relatedManga.map(relatedManga => (
                            <RelatedMangaCard key={relatedManga._id} relatedManga={relatedManga} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MangaDetail;
