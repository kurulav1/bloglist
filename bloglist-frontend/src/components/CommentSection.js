import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAsync } from '../reducers/commentSlice';
import Comment from './Comment';
import { setComments } from '../reducers/commentSlice';
import { getAll } from '../services/comment';

const CommentsSection = () => {
  const comments = useSelector(state => state.comments) || [];
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getAll();
        dispatch(setComments(fetchedComments));
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, [dispatch]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(addCommentAsync({ content: newComment }));
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">Site Comments</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment"
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      <ul className="list-group">
        {comments && comments.filter(Boolean).map(comment =>
          <Comment key={comment.id} comment={comment} />
        )}
      </ul>
    </div>
  );
};

export default CommentsSection;
