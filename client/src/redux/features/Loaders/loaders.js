import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  loginLoader: false,
  registerLoader: false,

  // data loader
  getLoader: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    setLoader(state, action) {
      Object.keys(action.payload).forEach((keys) => {
        state[keys] = action.payload[keys];
      });
    },
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
