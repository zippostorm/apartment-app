import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  apartments: [],
  loading: false,
  createLoading: false,
  currentApartment: null,
  error: null,

  formData: {
    name: "",
    description: "",
    price: "",
    rooms: "",
    images: [],
  },
};

export const createApartment = createAsyncThunk(
  "apartment/create",
  async (formData) => {}
);

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
  extraReducers: (builder) => {},
});

export const { setFormData, resetFormData } = apartmentSlice.actions;
export default apartmentSlice.reducer;
