import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import userReducer from "../features/user/userSlice";
import profileReducer from "../features/profile/profileSlice";
import notificationReducer from "../features/notifications/notificationSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    profile: profileReducer,
    notification: notificationReducer,
  },
});
