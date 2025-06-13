import cloudinary from "../lib/cloudinary.js";

import { Apartment } from "../models/apartment.model.js";

export const getAllApartment = async (req, res) => {
  try {
    const { sortBy } = req.query;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 6;

    let sortQuery = { createdAt: -1 };

    if (sortBy === "rooms") {
      sortQuery = { rooms: -1 };
    } else if (sortBy === "price") {
      sortQuery = { price: -1 };
    }
    const apartments = await Apartment.find({})
      .sort(sortQuery)
      .limit(limit)
      .skip(startIndex);
    const totalApartment = await Apartment.countDocuments();
    res.status(200).json({ success: true, apartments, totalApartment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getAllApartment controller: " + error.message,
    });
  }
};

export const getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res
        .status(404)
        .json({ success: false, message: "Apartment not found" });
    }
    res.status(200).json({ success: true, apartment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getApartmentById controller: " + error.message,
    });
  }
};

export const createApartment = async (req, res) => {
  try {
    const { name, description, price, rooms, images } = req.body;
    let uploadedImages = [];

    if (images && images.length > 0) {
      for (const img of images) {
        const uploadRes = await cloudinary.uploader.upload(img, {
          folder: "apartments",
        });
        uploadedImages.push({
          secure_url: uploadRes.secure_url,
          public_id: uploadRes.public_id,
        });
      }
    }

    const apartment = await Apartment.create({
      name,
      description,
      price,
      rooms,
      images: uploadedImages,
    });

    res.status(201).json({ success: true, apartment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in createApartment controller: " + error.message,
    });
  }
};

export const deleteApartmentImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res
        .status(404)
        .json({ success: false, message: "Apartment not found" });
    }

    await cloudinary.uploader.destroy(public_id);

    apartment.images = apartment.images.filter(
      (img) => img.public_id !== public_id
    );

    await apartment.save();

    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleteApartmentImage controller: " + error.message,
    });
  }
};

export const updateApartment = async (req, res) => {
  try {
    const { name, description, price, rooms, images } = req.body;

    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res
        .status(404)
        .json({ success: false, message: "Apartment not found" });
    }

    apartment.name = name || apartment.name;
    apartment.description = description || apartment.description;
    apartment.price = price || apartment.price;
    apartment.rooms = rooms || apartment.rooms;

    if (images && images.length > 0) {
      for (const img of images) {
        const uploadRes = await cloudinary.uploader.upload(img, {
          folder: "apartments",
        });
        apartment.images.push({
          secure_url: uploadRes.secure_url,
          public_id: uploadRes.public_id,
        });
      }
    }

    await apartment.save();

    res.status(200).json({ success: true, apartment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updateApartment controller: " + error.message,
    });
  }
};

export const deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      return res
        .status(404)
        .json({ success: false, message: "Apartment not found" });
    }

    if (apartment.images && apartment.images.length > 0) {
      for (const img of apartment.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Apartment.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Apartment deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleteApartment controller: " + error.message,
    });
  }
};
