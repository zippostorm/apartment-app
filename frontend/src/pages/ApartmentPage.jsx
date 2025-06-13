import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteApartment,
  getApartmentById,
  resetCurrentApartment,
  setFormData,
} from "../store/apartment/apartmentSlice";
import { ArrowLeftIcon, Pencil, Trash2 } from "lucide-react";
import ImageSlider from "../components/ImageSlider";
import ApartmentModal from "../components/ApartmentModal";
import toast from "react-hot-toast";

const ApartmentPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentApartment, loading, error } = useSelector(
    (state) => state.apartment
  );

  const handleEditClick = () => {
    dispatch(
      setFormData({
        name: currentApartment?.name || "",
        description: currentApartment?.description || "",
        price: currentApartment?.price || "",
        rooms: currentApartment?.rooms || "",
        images: [],
      })
    );

    document.getElementById("apartment_modal").showModal();
  };

  const handleDeleteApartment = () => {
    dispatch(deleteApartment(id)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Apartment deleted successfully");
        dispatch(resetCurrentApartment());
        document.getElementById("confirm_delete_modal").close();
        navigate("/");
      } else {
        toast.error("Error deleting apartment:", error);
      }
    });
  };
  useEffect(() => {
    dispatch(getApartmentById(id));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <button
        onClick={() => navigate("/")}
        className="btn btn-ghost mb-8 text-lg"
      >
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Home page
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <ImageSlider
            images={currentApartment?.images || []}
            apartmentId={currentApartment?._id}
          />
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Apartment Information</h2>

            <div className="flex flex-col justify-center text-lg">
              <div className="flex flex-col gap-9 mb-8">
                <span className="font-medium">
                  <span className="text-primary font-bold">Title: </span>
                  <span className="break-words">{currentApartment?.name}</span>
                </span>

                <span className="font-medium">
                  <span className="text-primary font-bold">Description: </span>
                  <span className="break-words">
                    {currentApartment?.description}
                  </span>
                </span>

                <span className="font-medium">
                  <span className="text-primary font-bold">Rooms: </span>
                  <span>{currentApartment?.rooms}</span>
                </span>

                <span className="font-medium">
                  <span className="text-primary font-bold">Price: </span>
                  <span>{currentApartment?.price}$</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 justify-end h-full">
              <button className="btn btn-primary" onClick={handleEditClick}>
                <Pencil />
                Edit
              </button>
              <ApartmentModal EditMode={true} />
              <button
                className="btn btn-error"
                onClick={() =>
                  document.getElementById("confirm_delete_modal").showModal()
                }
              >
                <Trash2 />
                Delete
              </button>

              <dialog id="confirm_delete_modal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Are you sure?</h3>
                  <p className="py-4">
                    Do you really want to delete this apartment?
                  </p>
                  <div className="modal-action">
                    <form method="dialog" className="flex gap-4">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          document
                            .getElementById("confirm_delete_modal")
                            .close()
                        }
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={handleDeleteApartment}
                      >
                        Yes, delete
                      </button>
                    </form>
                  </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentPage;
