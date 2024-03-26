import { createSlice } from '@reduxjs/toolkit';

export const userListSlice = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUsers } = userListSlice.actions;

export const selectUsers = (state) => state.userList;

export default userListSlice.reducer;
