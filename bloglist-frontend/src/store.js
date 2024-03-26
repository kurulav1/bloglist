import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationSlice';
import blogReducer from './reducers/blogSlice';
import userReducer from './reducers/userSlice';
import userListSlice from './reducers/userListSlice';
import currentBlogReducer from './reducers/currentBlogSlice';
import commentReducer from './reducers/commentSlice';  // Import the comment slice

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer,
        userList: userListSlice,
        currentBlog: currentBlogReducer,
        comments: commentReducer,  // Add the comment reducer here
      }
});

export default store;