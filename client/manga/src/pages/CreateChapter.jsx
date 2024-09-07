import React, { useEffect, useState } from 'react';
import axios from '../helpers/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles.css';

const CreateChapter = () => {
  const { id } = useParams();
  const [mangaId, setMangaId] = useState('');
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState(1);
  const [pages, setPages] = useState([]);
  const [pageInput, setPageInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/chapters/detail/${id}`);
          if (res.status === 200) {
            const chapter = res.data;
            setMangaId(chapter.mangaId);
            setTitle(chapter.title);
            setNumber(chapter.number);
            setPages(chapter.pages);
          }
        } catch (error) {
          console.error('Error fetching chapter:', error);
        }
      }
    };
    fetchChapter();
  }, [id]);

  const handleAddOrEditPage = () => {
    if (pageInput.trim() !== '') {
      if (editIndex !== null) {
        const updatedPages = [...pages];
        updatedPages[editIndex] = pageInput.trim();
        setPages(updatedPages);
        setEditIndex(null);
      } else {
        setPages([...pages, pageInput.trim()]);
      }
      setPageInput('');
    }
  };

  const handleEditPage = (index) => {
    setPageInput(pages[index]);
    setEditIndex(index);
  };

  const handleRemovePage = (index) => {
    const updatedPages = [...pages];
    updatedPages.splice(index, 1);
    setPages(updatedPages);
  };

  const clearForm = () => {
    setTitle('');
    setNumber(1);
    setPages([]);
    setPageInput('');
    setEditIndex(null);
  };

  const handleErrors = (error) => {
    console.error('Error:', error);
    if (error.response) {
      console.error('Oops :((:', error.response.data);
      toast.error('Oops :((: ' + error.response.data.error);
    } else if (error.request) {
      console.error('No response received from the server.');
      toast.error('Error creating chapter. Please try again later.');
    } else {
      console.error('Error setting up the request:', error.message);
      toast.error('Error creating chapter. Please try again later.');
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const chapterData = {
      mangaId,
      title,
      number,
      pages,
    };
    try {
      let res;
      if (id) {
        res = await axios.patch(`/api/chapters/detail/${id}`, chapterData);
        if (res.status === 200) {
          toast.success('Chapter Updated Successfully.');
        }
      } else {
        res = await axios.post('/api/chapters', chapterData);
        if (res.status === 201) {
          toast.success('Chapter Created Successfully.');
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      clearForm();
      navigate(`/manga/${mangaId}`);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center pb-10">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">{id ? 'Edit Chapter' : 'Create New Chapter'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="mangaId" className="block font-semibold mb-2">
                Manga ID
              </label>
              <input
                id="mangaId"
                type="text"
                value={mangaId}
                onChange={(e) => setMangaId(e.target.value)}
                required
                className="input-field"
                placeholder="Manga ID"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-field"
                placeholder="Title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="number" className="block font-semibold mb-2">
                Number
              </label>
              <input
                id="number"
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
                required
                className="input-field"
                placeholder="Number"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pages" className="block font-semibold mb-2">
                Pages
              </label>
              <div className="mb-4 overflow-auto max-h-40">
                {Array.isArray(pages) && pages.map((page, index) => (
                  <div key={index} className="page-badge">
                    {page}
                    <button
                      type="button"
                      onClick={() => handleEditPage(index)}
                      className="edit-button"
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemovePage(index)}
                      className="remove-button"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  id="pageInput"
                  type="text"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  className="input-field"
                  placeholder="Add or Edit Page"
                />
                <button
                  type="button"
                  onClick={handleAddOrEditPage}
                  className="add-button"
                >
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : id ? 'Update Chapter' : 'Create Chapter'}
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
          toastClassName="toast-notification"
          bodyClassName="font-semibold"
        />
      </div>
    </motion.div>
  );
};

export default CreateChapter;
