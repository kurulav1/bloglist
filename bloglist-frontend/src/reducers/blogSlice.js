import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

// Async thunk for adding a blog to the backend
export const addBlogAsync = createAsyncThunk(
  'blogs/addBlogAsync',
  async (blog) => {
    const response = await blogService.create(blog);
    return response;
  }
);

export const likeBlogAsync = createAsyncThunk(
  'blogs/likeBlogAsync',
  async (blogId) => {
    const updatedBlog = await blogService.like(blogId);
    return updatedBlog;
  }
);

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {  // You can keep this if needed elsewhere, but prefer addBlogAsync
      state.push(action.payload);
    },
    removeBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.findIndex(blog => blog.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBlogAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      // Optional: Add rejected case for error handling
      .addCase(addBlogAsync.rejected, (state, action) => {
        console.error("Failed to add blog:", action.error);
      })
      .addCase(likeBlogAsync.fulfilled, (state, action) => {
        const index = state.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
  }
});

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;
