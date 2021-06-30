import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {
    name: "akash",
    photo: "a",
  },
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
