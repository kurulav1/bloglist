import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Reducers
import { setBlogs, addBlog, likeBlogAsync} from './reducers/blogSlice';
import { setUsers } from './reducers/userListSlice';
import { setUser, clearUser } from './reducers/userSlice';
import { setNotification, clearNotification } from './reducers/notificationSlice';
import userService from './services/users';
import blogService from './services/blogs';
import loginService from './services/login';
import { setToken } from './services/comment';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import UserListView from './components/UserListView';
import UserDetailView from './components/UserDetailView';
import BlogDetailView from './components/BlogDetailView';
import CommentsSection from './components/CommentSection';

import './index.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const notification = useSelector(state => state.notification);

  const dispatch = useDispatch();

  const displayNotification = (message, type, timeout = 5000) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };

  useEffect(() => {
    userService.getAll().then(fetchedUsers => {
      dispatch(setUsers(fetchedUsers));
    });
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => {
      dispatch(setBlogs(fetchedBlogs));
    });
  }, [dispatch]);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user));
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
      setToken(user.token);
    } catch (exception) {
      displayNotification('Wrong credentials', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser');
    dispatch(clearUser());
    blogService.setToken(null);
    setToken(null);
  };

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlogAsync(blog.id));
    } catch (exception) {
    }
  };

  
  return (
    <Router>
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <Link className="navbar-brand" to="/">Home</Link>
        <Link className="nav-link" to="/users">Users</Link>
      </nav>
      
      <h1 className="mb-3">Blogs</h1>

      <Notification message={notification.message} type={notification.type} />

      {user ? (
        <UserSection user={user} handleLogout={handleLogout} />
      ) : (
        <LoginSection username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
      )}

        <Routes>
          <Route path="/" element={<BlogsView blogs={blogs} handleLike={handleLike} />} />
          <Route path="/users" element={<UserListView />} />
          <Route path="/users/:id" element={<UserDetailView />} />
          <Route path="/api/blogs/:id" element={<BlogDetailView />} />
        </Routes>

        <CommentsSection />
      </div>
    </Router>
  );
};

const UserSection = ({ user, handleLogout }) => {
  const blogFormRef = useRef();

  return (
    <div className="mb-3">
      <p className="d-inline mr-2">{user.name} logged in</p>
      <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    </div>
  );
};

const LoginSection = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <Togglable buttonLabel="Log in" defaultVisible={true}>
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  </Togglable>
);

const BlogsView = ({ blogs, handleLike }) => {
  return (
    <div className="container">
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </div>
  );
};


export default App;