import React, { useState } from 'react';
import axios from '../helpers/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file first!');
      return;
    }

    setLoading(true); 

    const formData = new FormData();
    formData.append('image', file);
    formData.append('filename', filename); 

    try {
      const response = await axios.post('/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Image uploaded successfully!', { autoClose: 3000 });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error uploading file: ', error);
      toast.error('Error uploading file');
    } finally {
      setLoading(false); 
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFilenameChange = (e) => {
    setFilename(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Image</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 p-2 mb-2 rounded border border-gray-300"
        />
        <input
          type="text"
          value={filename}
          onChange={handleFilenameChange}
          placeholder="Enter custom filename (optional)"
          className="block w-full text-sm text-gray-500 p-2 mb-2 rounded border border-gray-300"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-32 h-32 rounded-lg object-cover"
          />
        )}
        <button
          type="submit"
          className={`mt-6 w-full py-2 px-4 bg-blue-500 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83A10 10 0 002 12h2zm2 8a8 8 0 018-8H4v2a6 6 0 006 6V20z"></path>
            </svg>
          ) : (
            'Upload'
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadImage;
