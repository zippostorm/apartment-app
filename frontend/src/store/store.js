import { configureStore } from "@reduxjs/toolkit";

import apartmentSlice from "./apartment/apartmentSlice";

const store = configureStore({
  reducer: {
    apartment: apartmentSlice,
  },
});

export default store;
