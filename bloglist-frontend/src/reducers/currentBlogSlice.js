// reducers/currentBlogSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blog: null,
    status: 'idle',  
    error: null,
};

const currentBlogSlice = createSlice({
    name: 'currentBlog',
    initialState,
    reducers: {
        fetchBlogStart: (state) => {
            state.status = 'loading';
        },
        fetchBlogSuccess: (state, action) => {
            state.status = 'succeeded';
            state.blog = action.payload;
        },
        fetchBlogFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        clearCurrentBlog: (state) => {
            state.blog = null;
        }
    },
});

export const { 
    fetchBlogStart, 
    fetchBlogSuccess, 
    fetchBlogFailure, 
    clearCurrentBlog 
} = currentBlogSlice.actions;

export default currentBlogSlice.reducer;
