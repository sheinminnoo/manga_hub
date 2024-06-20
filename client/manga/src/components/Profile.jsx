import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../helpers/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user: me } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.set('profile', file);

    try {
      await axios.post('/api/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated', { autoClose: 3000 });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Error uploading file');
    }
  };

  const upload = (e) => {
    let file = e.target.files[0];
    setFile(file);

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Profile Picture</h2>
        <input
          type="file"
          onChange={upload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {!!preview && (
          <img
            src={preview}
            alt="Profile Preview"
            className="mt-4 w-32 h-32 rounded-full object-cover"
          />
        )}
        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Profile;
