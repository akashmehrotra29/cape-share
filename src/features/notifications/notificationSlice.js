import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotifications = createAsyncThunk(
  "user/getNotifications",
  async () => {
    const response = await axios.get(`/notifications`);
    return response.data;
  }
);

const initialState = {
  notifications: [],
  status: "idle",
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetNotification(state, action) {
      state.notifications = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.notifications;
      state.status = "idle";
    },
    [getNotifications.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default notificationSlice.reducer;
