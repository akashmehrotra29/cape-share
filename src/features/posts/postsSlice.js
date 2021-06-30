import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postData) => {
    const response = await axios.post(`/posts`, postData);
    return response.data;
  }
);

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  cursor: null,
  hasMore: true,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default postsSlice.reducer;
