import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { create } from '../services/comment';

// Async thunk for adding comment to the backend
export const addCommentAsync = createAsyncThunk(
  'comments/addCommentAsync',
  async (comment) => {
    const response = await create(comment);
    return response.data;  // Assuming your backend returns the new comment as response data
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments: (state, action) => {
      return action.payload;
    },
    removeComment: (state, action) => {
      return state.filter(comment => comment.id !== action.payload);
    },
    updateComment: (state, action) => {
      const index = state.findIndex(comment => comment.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(addCommentAsync.rejected, (state, action) => {
        console.error("Failed to add comment:", action.error);
      });
  }
});

export const { setComments, removeComment, updateComment } = commentSlice.actions;
export default commentSlice.reducer;
