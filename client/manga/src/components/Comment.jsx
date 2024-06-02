useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${chapterId}`);
        if (res.status === 200) {
          setComments(res.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchComments();
  }, [chapterId]);

  const handlePostComment = async () => {
    try {
      const res = await axios.post(
        `/api/comments/${chapterId}`,
        { text: newComment,
          chapterid : chapterId
         }
      );
      if (res.status === 200) {
        // Update comments state with the new comment
        setComments([...comments, res.data]);
        setNewComment('');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditComment = async () => {
    try {
      const res = await axios.put(
        `/api/comments/${editingComment._id}`,
        { text: editedComment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (res.status === 200) {
        const updatedComments = comments.map(comment =>
          comment._id === res.data._id ? res.data : comment
        );
        setComments(updatedComments);
        setEditingComment(null);
        setEditedComment('');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.status === 200) {
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        setComments(updatedComments);
      }
    } catch (err) {
      setError(err.message);
    }
  };