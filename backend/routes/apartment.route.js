import express from "express";

import {
  getAllApartment,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
  deleteApartmentImage,
} from "../controllers/apartment.controller.js";

const router = express.Router();

router.get("/", getAllApartment);
router.get("/:id", getApartmentById);
router.post("/", createApartment);
router.patch("/:id", updateApartment);
router.delete("/:id", deleteApartment);
router.delete("/image/:id", deleteApartmentImage);

export default router;
