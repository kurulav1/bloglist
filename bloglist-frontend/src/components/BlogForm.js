import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlogAsync } from '../reducers/blogSlice';  // Import the async action

const BlogForm = () => {
  const dispatch = useDispatch();

  const [blogName, setBlogName] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    
    const blogObject = {
      author: blogAuthor,
      url: blogUrl,
      title: blogName,
      likes: 0,
    };

    dispatch(addBlogAsync(blogObject));  // Dispatch the async action to the Redux store

    setBlogName('');
    setBlogAuthor('');
    setBlogUrl('');
  }

  return (
    <div className="container">
      <h2 className="my-4">Create a new blog</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="blogName">Blog name:</label>
          <input
            type="text"
            value={blogName}
            name="blogName"
            onChange={event => setBlogName(event.target.value)}
            className="form-control"
            id="blogName"
          />
        </div>

        <div className="form-group">
          <label htmlFor="blogAuthor">Blog author:</label>
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            onChange={event => setBlogAuthor(event.target.value)}
            className="form-control"
            id="blogAuthor"
          />
        </div>

        <div className="form-group">
          <label htmlFor="blogUrl">Blog URL:</label>
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            onChange={event => setBlogUrl(event.target.value)}
            className="form-control"
            id="blogUrl"
          />
        </div>

        <button type="submit" name="save" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  )
}

export default BlogForm;
