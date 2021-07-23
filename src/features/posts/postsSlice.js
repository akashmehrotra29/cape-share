import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postData) => {
    const response = await axios.post(`/posts`, postData);
    return response.data;
  }
);

export const getUserFeed = createAsyncThunk(
  "posts/getUserFeed",
  async (_, thunk) => {
    const {
      posts: { cursor, hasMore },
    } = thunk.getState();

    if (hasMore) {
      try {
        let response;
        if (cursor) {
          response = await axios.get(`/feed?cursor=${cursor}`);
        } else {
          response = await axios.get("/feed");
        }
        return response.data;
      } catch (error) {
        console.error(error.message);
      }
    }
  }
);

export const likeFeedPost = createAsyncThunk(
  "profile/likeFeedPost",
  async (postId) => {
    const response = await axios.post(`/posts/${postId}/likes`);
    return response.data;
  }
);

export const unlikeFeedPost = createAsyncThunk(
  "profile/unlikeFeedPost",
  async (postId) => {
    const response = await axios.delete(`/posts/${postId}/likes`);
    return response.data;
  }
);

export const commentFeedPost = createAsyncThunk(
  "profile/commentFeedPost",
  async (requestData) => {
    const response = await axios.post(
      `/posts/${requestData.postId}/comment`,
      requestData.comment
    );
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
  extraReducers: {
    [getUserFeed.pending]: (state, action) => {
      state.status = "loading";
    },

    [getUserFeed.fulfilled]: (state, action) => {
      state.status = "idle";
      if (action.payload && action.payload.success) {
        state.cursor = action.payload.next_cursor;
        state.hasMore = action.payload.hasMore;
        if (action.payload.posts.length) {
          const uniquePosts = action.payload.posts.filter((post) =>
            state.posts.filter((obj) => obj._id !== post._id)
          );
          state.posts = state.posts.concat(uniquePosts);
        }
      }
    },

    [likeFeedPost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => action.payload.post._id === post._id
      );
      state.posts[postIndex] = action.payload.post;
    },

    [unlikeFeedPost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => action.payload.post._id === post._id
      );
      state.posts[postIndex] = action.payload.post;
    },

    [commentFeedPost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => action.payload.post._id === post._id
      );
      state.posts[postIndex] = action.payload.post;
    },
  },
});

export default postsSlice.reducer;
