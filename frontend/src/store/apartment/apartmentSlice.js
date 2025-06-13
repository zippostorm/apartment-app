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

export const editApartment = createAsyncThunk(
  "apartment/edit",
  async ({ id, formData }) => {
    console.log(formData, id);
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/apartment/${id}`,
      formData
    );
    return response.data;
  }
);

export const deleteApartment = createAsyncThunk(
  "apartment/delete",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/apartment/${id}`
    );
    return response.data;
  }
);

export const deleteApartmentImage = createAsyncThunk(
  "apartment/deleteImage",
  async ({ public_id, id }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/apartment/image/${id}`,
      {
        data: { public_id },
      }
    );
    return response.data;
  }
);

export const getAllApartment = createAsyncThunk(
  "apartment/getAll",
  async ({ sort, startIndex, limit = 6 } = {}) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/apartment`,
      {
        params: { sortBy: sort, startIndex, limit },
      }
    );
    return response.data;
  }
);

export const getApartmentById = createAsyncThunk(
  "apartment/getById",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/apartment/${id}`
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

    resetCurrentApartment: (state) => {
      state.currentApartment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApartment.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createApartment.fulfilled, (state, action) => {
        state.createLoading = false;
        state.error = null;
      })
      .addCase(createApartment.rejected, (state) => {
        state.createLoading = false;
        state.error = "Error creating apartment";
      })
      .addCase(getAllApartment.pending, (state, action) => {
        if (action.meta.arg?.startIndex >= 6) {
          state.createLoading = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getAllApartment.fulfilled, (state, action) => {
        state.loading = false;
        state.createLoading = false;
        if (action.meta.arg?.startIndex >= 6) {
          state.apartments = [
            ...state.apartments,
            ...action.payload.apartments,
          ];
        } else {
          state.apartments = action.payload.apartments;
        }
        state.error = null;
      })
      .addCase(getAllApartment.rejected, (state) => {
        state.loading = false;
        state.createLoading = false;
        state.error = "Error fetching apartments";
      })
      .addCase(getApartmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApartmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApartment = action.payload.apartment;
        state.error = null;
      })
      .addCase(getApartmentById.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching apartment";
      })
      .addCase(editApartment.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(editApartment.fulfilled, (state, action) => {
        state.createLoading = false;
        state.error = null;
      })
      .addCase(editApartment.rejected, (state) => {
        state.createLoading = false;
        state.error = "Error editing apartment";
      })
      .addCase(deleteApartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteApartment.rejected, (state) => {
        state.loading = false;
        state.error = "Error deleting apartment";
      })
      .addCase(deleteApartmentImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApartmentImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteApartmentImage.rejected, (state) => {
        state.loading = false;
        state.error = "Error deleting apartment image";
      });
  },
});

export const { setFormData, resetFormData, resetCurrentApartment } =
  apartmentSlice.actions;
export default apartmentSlice.reducer;
