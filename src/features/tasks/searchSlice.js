import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearchTerm: (state, action) => action.payload,
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
