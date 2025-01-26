import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "users",
  initialState: {
    token: null,
  },
  reducers: {
    storeToken_user: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { storeToken_user } = userSlice.actions;
export default userSlice.reducer;
