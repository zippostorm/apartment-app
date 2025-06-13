import React from "react";

const ApartmentModal = ({ EditMode }) => {
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
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ApartmentModal;
