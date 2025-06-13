import React, { useRef } from "react";

import {
  BedDouble,
  Captions,
  CircleDollarSign,
  MessageSquareMore,
  Image,
  PlusCircleIcon,
  PencilIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  resetFormData,
  createApartment,
  getAllApartment,
  getApartmentById,
  editApartment,
} from "../store/apartment/apartmentSlice";
import { toast } from "react-hot-toast";

const ApartmentModal = ({ EditMode }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { formData, createLoading, error, currentApartment } = useSelector(
    (state) => state.apartment
  );

  const resetFileInputRef = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      EditMode
        ? dispatch(editApartment({ id: currentApartment?._id, formData })).then(
            (data) => {
              if (data?.payload?.success) {
                document.getElementById("apartment_modal").close();
                toast.success("Apartment updated successfully");
                dispatch(resetFormData());
                dispatch(getApartmentById(currentApartment?._id));
                resetFileInputRef();
              } else {
                toast.error("Error updating apartment:", error);
              }
            }
          )
        : dispatch(createApartment(formData)).then((data) => {
            if (data?.payload?.success) {
              document.getElementById("apartment_modal").close();
              toast.success("Apartment created successfully");
              dispatch(resetFormData());
              dispatch(getAllApartment());
              resetFileInputRef();
            } else {
              toast.error("Error creating apartment:", error);
            }
          });
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // base64 string
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((base64Images) => {
        dispatch(
          setFormData({
            images: base64Images,
          })
        );
      })
      .catch((err) => {
        console.error("Error reading files", err);
      });
  };

  return (
    <dialog id="apartment_modal" className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("apartment_modal").close()}
        >
          X
        </button>

        <h3 className="font-bold text-xl mb-8">
          {EditMode ? "Edit" : "Add"} Apartment
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Title</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Captions className="size-5" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-base-content/50">
                  {formData.name.length}/90
                </div>
                <input
                  type="text"
                  maxLength={90}
                  placeholder="Enter apartment title"
                  className="input input-bordered w-full pl-10 pr-14 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) =>
                    dispatch(setFormData({ name: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Description
                </span>
              </label>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <MessageSquareMore className="size-5" />
                </div>
                <div className="absolute top-3 right-0 pr-3 text-sm text-base-content/50">
                  {formData.description.length}/335
                </div>
                <textarea
                  maxLength={335}
                  placeholder="Enter apartment description"
                  className="textarea textarea-bordered w-full h-[100px] pl-10 pr-14 pt-3 focus:input-primary transition-colors duration-200 resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    dispatch(setFormData({ description: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <CircleDollarSign className="size-5" />
                </div>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={10000000}
                  step="1000"
                  placeholder="Enter apartment price"
                  className="input input-bordered w-full pl-10 pr-8 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= 10000000) {
                      dispatch(setFormData({ price: e.target.value }));
                    }
                  }}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Rooms</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <BedDouble className="size-5" />
                </div>
                <select
                  className="select select-bordered w-full pl-10 pr-4 focus:select-primary transition-colors duration-200"
                  value={formData.rooms}
                  onChange={(e) =>
                    dispatch(setFormData({ rooms: e.target.value }))
                  }
                >
                  <option disabled value="">
                    Select number of rooms
                  </option>
                  <option value="1">1 room</option>
                  <option value="2">2 rooms</option>
                  <option value="3">3 rooms</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Images</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Image className="size-5" />
                </div>
                <input
                  type="file"
                  multiple
                  className="file-input file-input-bordered w-full pl-10 focus:input-primary transition-colors duration-200"
                  accept="image/*"
                  onChange={handleImagesChange}
                  ref={fileInputRef}
                />
              </div>
            </div>
          </div>

          <div className="modal-action flex justify-between">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                document.getElementById("apartment_modal").close();
                dispatch(resetFormData());
                resetFileInputRef();
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.name ||
                !formData.description ||
                !formData.price ||
                !formData.rooms ||
                (!EditMode && formData.images.length === 0) ||
                createLoading
              }
            >
              {createLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  {EditMode ? (
                    <>
                      <PencilIcon className="size-5 mr-2" /> Edit Apartment
                    </>
                  ) : (
                    <>
                      <PlusCircleIcon className="size-5 mr-2" />
                      Add Apartment
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <form
        method="dialog"
        className="modal-backdrop"
        onClick={() => {
          dispatch(resetFormData());
          resetFileInputRef();
        }}
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ApartmentModal;
