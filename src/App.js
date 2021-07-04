import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/toast";

import { Home } from "./app/Home/Home";
import { Navbar } from "./app/Navbar/Navbar";
import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { Profile } from "./features/profile/Profile";
import {
  setAxiosBaseURL,
  setupAuthExceptionHandler,
  setupAuthHeadersForApiCalls,
} from "./features/user/user.utils";
import { getUserData, logout } from "./features/user/userSlice";
import { Following } from "./features/profile/Following";
import { Followers } from "./features/profile/Followers";
import { Notification } from "./features/notifications/Notification";
import { UpdateUserProfile } from "./features/profile/UpdateUserProfile";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    setAxiosBaseURL();
    (async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setupAuthHeadersForApiCalls(userData.token);
        setupAuthExceptionHandler(dispatch, logout, navigate, toast);
        dispatch(getUserData());
      } else {
        navigate("/login");
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/following" element={<Following />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/edit-profile" element={<UpdateUserProfile />} />
      </Routes>
    </>
  );
}

export default App;
