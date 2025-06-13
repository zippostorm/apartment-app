import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [90, "Name cannot exceed 90 characters"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [335, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    rooms: {
      type: Number,
      required: true,
      min: [0, "Rooms cannot be negative"],
    },
    images: [
      {
        secure_url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Apartment = mongoose.model("Apartment", apartmentSchema);
