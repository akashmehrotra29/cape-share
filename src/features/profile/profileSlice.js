import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfilePosts = createAsyncThunk(
  "profile/getProfilePosts",
  async (userId) => {
    const response = await axios.get(`/posts?userId=${userId}`);
    return response.data;
  }
);

export const getUser = createAsyncThunk("profile/getUser", async (userId) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
});

export const likeProfilePost = createAsyncThunk(
  "profile/likeProfilePost",
  async (postId) => {
    const response = await axios.post(`/posts/${postId}/likes`);
    return response.data;
  }
);

export const unlikeProfilePost = createAsyncThunk(
  "profile/unlikeProfilePost",
  async (postId) => {
    const response = await axios.delete(`/posts/${postId}/likes`);
    return response.data;
  }
);

export const commentProfilePost = createAsyncThunk(
  "profile/commentProfilePost",
  async (requestData) => {
    const response = await axios.post(
      `/posts/${requestData.postId}/comment`,
      requestData.comment
    );
    return response.data;
  }
);

export const follow = createAsyncThunk(
  "profile/follow",
  async (requestData) => {
    const response = await axios.post(`/user-links`, requestData);
    return response.data;
  }
);

export const unFollow = createAsyncThunk(
  "profile/unFollow",
  async (_, { getState }) => {
    const response = await axios.delete(
      `/user-links/${getState().profile.following._id}`
    );
    return response.data;
  }
);

const initialState = {
  user: null,
  posts: [],
  following: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile(state, action) {
      state.user = null;
      state.following = false;
      state.posts = [];
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.following = action.payload.following;
    },

    [getProfilePosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },

    [likeProfilePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => action.payload.post._id === post._id
      );
      state.posts[postIndex] = action.payload.post;
    },

    [unlikeProfilePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => action.payload.post._id === post._id
      );
      state.posts[postIndex] = action.payload.post;
    },

    [commentProfilePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => action.payload.post._id === post._id
      );
      state.posts[postIndex] = action.payload.post;
    },

    [follow.fulfilled]: (state, action) => {
      state.following = action.payload.following;
      state.user.followerCount = state.user.followerCount + 1;
    },

    [unFollow.fulfilled]: (state, action) => {
      state.following = null;
      state.user.followerCount = state.user.followerCount - 1;
    },
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
