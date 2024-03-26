import React from 'react';
import { Link } from 'react-router-dom';
import Togglable from '../components/Togglable';

const Blog = ({ blog, user, handleDelete, handleLike }) => {
  const { id, title, author, url, likes } = blog;

  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      handleDelete(id);
    }
  };

  return (
    <div className="blog card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/api/blogs/${id}`} className="card-link">{title}</Link> 
          <span className="text-muted">by {author}</span>
        </h5>
        
        <Togglable buttonLabel="View Details" className="btn btn-primary">
          <div className="card-text">
            {url && (
              <div>
                URL: <a href={url} className="card-link">{url}</a>
              </div>
            )}
            {likes !== undefined && <div>Likes: {likes}</div>}
            <div className="mt-2">
              {user && user.username && user.username === blog.user?.username && (
                <button onClick={handleDeleteClick} className="btn btn-danger mr-2">
                  Delete
                </button>
              )}
              <button onClick={() => handleLike(blog)} className="btn btn-success">
                Like
              </button>
            </div>
          </div>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;