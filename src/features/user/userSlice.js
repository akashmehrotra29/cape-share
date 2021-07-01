import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

import {
  removeUser,
  saveUser,
  setupAuthHeadersForApiCalls,
} from "./user.utils";

export const login = createAsyncThunk("user/login", async (userCredentials) => {
  const response = await axios.post("/login", userCredentials);
  if (response.data) {
    saveUser(response.data.user, response.data.token);
    setupAuthHeadersForApiCalls(response.data.token);
  }
  return response.data;
});

export const signup = createAsyncThunk(
  "user/signup",
  async (userCredentials) => {
    const response = await axios.post("/signup", userCredentials);
    return response.data;
  }
);

// to persist login
export const getUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await axios.get("/user");
  return response.data;
});

const initialState = {
  loggedInUser: null,
  status: "idle",
  signupStatus: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.loggedInUser = null;
      state.status = "idle";
      state.error = null;
      removeUser();
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.loggedInUser = action.payload.user;
      state.status = "idle";
    },
    [login.rejected]: (state, action) => {
      state.status = "error";
    },

    [signup.pending]: (state, action) => {
      state.signupStatus = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      state.signupStatus = "idle";
    },
    [signup.rejected]: (state, action) => {
      state.signupStatus = "error";
    },

    [getUserData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.loggedInUser = action.payload.user;
      state.status = "idle";
    },
    [getUserData.rejected]: (state, action) => {
      console.log("rejected", current(state), current(action));
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
