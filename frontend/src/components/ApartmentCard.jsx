import React from "react";

import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const ApartmentCard = ({ apartment }) => {
  console.log(apartment);
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative pt-[56.25%]">
        <img
          src={apartment?.images[0]?.secure_url}
          alt={apartment?.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{apartment.name}</h2>

        <div className="card-actions mt-auto justify-end">
          <p className="text-2xl font-bold text-primary">
            ${Number(apartment.price).toFixed(2)}
          </p>
          <Link
            to={`/apartment/${apartment._id}`}
            className="btn btn-sm btn-info btn-outline"
          >
            <EditIcon className="size-4" />
          </Link>

          <button className="btn btn-sm btn-error  btn-outline">
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
