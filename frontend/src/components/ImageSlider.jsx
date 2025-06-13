import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  deleteApartmentImage,
  getApartmentById,
} from "../store/apartment/apartmentSlice";

const ImageSlider = ({ images, apartmentId }) => {
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const hasMultipleImages = images.length > 1;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleDelete = async () => {
    if (images.length === 1) {
      toast.error(
        "Apartment must have at least one image. Please add another first."
      );
      return;
    }

    dispatch(
      deleteApartmentImage({
        public_id: images[currentIndex].public_id,
        id: apartmentId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Image deleted successfully");
        dispatch(getApartmentById(apartmentId));
      } else {
        toast.error("Error deleting image:", error);
      }
    });
  };

  return (
    <div className="relative w-full min-h-[500px] h-full overflow-hidden rounded-lg shadow-lg bg-base-100">
      <img
        src={images[currentIndex]?.secure_url || images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-10"
        title="Delete this image"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {hasMultipleImages && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black p-2 rounded-full shadow"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black p-2 rounded-full shadow"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {hasMultipleImages && (
        <div className="absolute bottom-4 w-full flex justify-center items-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
