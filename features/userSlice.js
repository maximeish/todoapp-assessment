import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "mary.elliot@gmail.com",
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getCurrentEmail = (state) => state.user.email;

export default userSlice.reducer;
