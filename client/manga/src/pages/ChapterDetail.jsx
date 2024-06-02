import axios from '../helpers/axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

const ChapterDetail = () => {
  const { chapterId } = useParams();
  const { user } = useContext(AuthContext);

  const [chapter, setChapter] = useState(null);
  const [relatedChapters, setRelatedChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const range = 5;

  useEffect(() => {
    const fetchChapterDetail = async () => {
      try {
        const res = await axios.get(`/api/chapters/detail/${chapterId}`);
        if (res.status === 200) {
          setChapter(res.data);
          setLoading(false);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchChapterDetail();
  }, [chapterId]);

  useEffect(() => {
    const fetchRelatedChapters = async () => {
      try {
        if (chapter) {
          const res = await axios.get(`/api/chapters/${chapter.mangaId}`);
          if (res.status === 200) {
            const allChapters = res.data;
            const currentIndex = allChapters.findIndex(c => c._id === chapter._id);
            const start = Math.max(0, currentIndex - Math.floor(range / 2));
            const end = Math.min(allChapters.length, start + range);
            setRelatedChapters(allChapters.slice(start, end));
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRelatedChapters();
  }, [chapter]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${chapterId}/comments`);
        if (res.status === 200) {
          setComments(res.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchComments();
  }, [chapterId]);

  const handleCreateComment = async () => {
    try {
      const res = await axios.post(`/api/comments/${chapterId}/comments`, { text: newComment }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.status === 201) {
        setComments([...comments, res.data]);
        setNewComment('');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const res = await axios.put(`/api/comments/${chapterId}/comments/${commentId}`, { text: editedComment }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.status === 200) {
        setComments(comments.map(comment => comment._id === commentId ? res.data : comment));
        setEditingComment(null);
        setEditedComment('');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`/api/comments/${chapterId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.status === 200) {
        setComments(comments.filter(comment => comment._id !== commentId));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-2xl text-gray-600 mt-20">Loading...</div>;
  if (error) return <div className="text-center text-2xl text-red-600 mt-20">Error: {error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">{chapter.title}</h1>
      <div className="space-y-4 pb-20">
        {chapter.pages.map((page, index) => (
          <img key={index} src={page} alt={`Page ${index + 1}`} className="w-full rounded-lg shadow-md" />
        ))}
      </div>
      <div className="mt-8 pb-20">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Comments</h2>
  {user && (
    <div className="mb-6 flex flex-col space-y-4">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a comment..."
      ></textarea>
      <button
        onClick={handleCreateComment}
        className="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Post Comment
      </button>
    </div>
  )}
  <div className="space-y-6">
    {comments.map((comment) => (
      <div key={comment._id} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md">
        <img
          src={comment.userAvatar || 'https://media1.tenor.com/m/wRY6wTo2rOwAAAAC/hajime-hinata.gif'}
          alt={comment.username}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-800 font-semibold">{comment.username}</p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
            {user && user._id === comment.userId && (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingComment(comment._id);
                    setEditedComment(comment.text);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          {editingComment === comment._id && (
            <div className="mt-2 flex flex-col space-y-2">
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                onClick={() => handleUpdateComment(comment._id)}
                className="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Comment
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>


      {relatedChapters.length > 0 && (
        <div className="mt-8 pb-20">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Related Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedChapters.map(chap => (
              <Link to={`/chapter/${chap._id}`} key={chap._id} className="block bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-700">{chap.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChapterDetail;
