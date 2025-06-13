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
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/apartment`,
      formData
    );
    return response.data;
  }
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
  extraReducers: (builder) => {
    builder
      .addCase(createApartment.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createApartment.fulfilled, (state, action) => {
        state.createLoading = false;
      })
      .addCase(createApartment.rejected, (state) => {
        state.createLoading = false;
        state.error = "Error creating apartment";
      });
  },
});

export const { setFormData, resetFormData } = apartmentSlice.actions;
export default apartmentSlice.reducer;
