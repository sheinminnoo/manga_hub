import React, { useState } from 'react';
import axios from '../helpers/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateManga = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genres, setGenres] = useState([]);
  const [genreInput, setGenreInput] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [chapters, setChapters] = useState([]);
  const [chapterInput, setChapterInput] = useState('');
  const [ongoing, setOngoing] = useState(true);
  const [popularity, setPopularity] = useState(0);
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGenre = () => {
    if (genreInput.trim() !== '') {
      setGenres([...genres, genreInput.trim()]);
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (index) => {
    const updatedGenres = [...genres];
    updatedGenres.splice(index, 1);
    setGenres(updatedGenres);
  };

  const handleAddChapter = () => {
    if (chapterInput.trim() !== '') {
      setChapters([...chapters, chapterInput.trim()]);
      setChapterInput('');
    }
  };

  const handleRemoveChapter = (index) => {
    const updatedChapters = [...chapters];
    updatedChapters.splice(index, 1);
    setChapters(updatedChapters);
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setGenres([]);
    setDescription('');
    setCoverImage('');
    setChapters([]);
    setOngoing(true);
    setPopularity(0);
    setCreatedAt(new Date().toISOString());
  };

  const handleErrors = (error) => {
    console.error("Error:", error);
    if (error.response) {
      console.error("Oops :((:", error.response.data);
      toast.error("Oops :((: " + error.response.data.error);
    } else if (error.request) {
      console.error("No response received from the server.");
      toast.error("Error registering. Please try again later.");
    } else {
      console.error("Error setting up the request:", error.message);
      toast.error("Error registering. Please try again later.");
    }
  };

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const newManga = {
        title,
        author,
        genres,
        description,
        coverImage,
        chapters,
        ongoing,
        popularity: parseInt(popularity, 10),
        createdAt
      };
      const res = await axios.post('/api/manga', newManga);
      if (res.status === 201) {
        toast.success("Manga Created Successfully.");
        await new Promise(resolve =>setTimeout(resolve,1000))
        clearForm();
        navigate('/')
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
    className="container mx-auto px-4 py-8 text-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
>
    <div className="min-h-screen flex items-center justify-center pt-10 pb-10">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Create New Manga</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Title"
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">Author</label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Author"
              />
            </div>
          </div>
          <div>
            <label htmlFor="genres" className="block text-gray-700 font-semibold mb-2">Genres</label>
            <div className="flex flex-wrap items-center mb-4">
              {genres.map((genre, index) => (
                <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 mr-2 mb-2">
                  {genre}
                  <button
                    type="button"
                    onClick={() => handleRemoveGenre(index)}
                    className="ml-2 font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input
                id="genreInput"
                type="text"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add Genre"
              />
              <button
                type="button"
                onClick={handleAddGenre}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-
              500"
              placeholder="Description"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label htmlFor="coverImage" className="block text-gray-700 font-semibold mb-2">Cover Image URL</label>
            <input
              id="coverImage"
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Cover Image URL"
            />
          </div>
          <div>
            <label htmlFor="chapters" className="block text-gray-700 font-semibold mb-2">Chapters</label>
            <div className="flex flex-wrap items-center mb-4">
              {chapters.map((chapter, index) => (
                <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 mr-2 mb-2">
                  {chapter}
                  <button
                    type="button"
                    onClick={() => handleRemoveChapter(index)}
                    className="ml-2 font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input
                id="chapterInput"
                type="text"
                value={chapterInput}
                onChange={(e) => setChapterInput(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add Chapter"
              />
              <button
                type="button"
                onClick={handleAddChapter}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="ongoing"
              type="checkbox"
              checked={ongoing}
              onChange={(e) => setOngoing(e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="ongoing" className="ml-2 block text-sm text-gray-900">
              Ongoing
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="popularity" className="block text-gray-700 font-semibold mb-2">Popularity</label>
              <input
                id="popularity"
                type="number"
                value={popularity}
                onChange={(e) => setPopularity(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Popularity"
              />
            </div>
            <div>
              <label htmlFor="createdAt" className="block text-gray-700 font-semibold mb-2">Created At</label>
              <input
                id="createdAt"
                type="date"
                value={new Date(createdAt).toISOString().split('T')[0]}
                onChange={(e) => setCreatedAt(new Date(e.target.value).toISOString())}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Created At"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? "Creating Manga..." : "Create Manga"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="bg-gray-800 text-white rounded-md shadow-lg"
        bodyClassName="font-semibold"
      />
    </div>
    </motion.div>
  );
};

export default CreateManga;
