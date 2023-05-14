import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  isLoading: false,
  error: '',
};
const baseURL = 'https://randomuser.me/api/?results=10';
export const fetchUsers = createAsyncThunk(
  'users/fetchUser',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseURL);
      return data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export default usersSlice;
