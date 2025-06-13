import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  apartments: [],
  loading: false,
  error: null,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default apartmentSlice.reducer;
