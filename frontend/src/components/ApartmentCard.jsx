import React from "react";

import { BedSingle } from "lucide-react";
import { Link } from "react-router-dom";

const ApartmentCard = ({ apartment }) => {
  return (
    <Link to={`/apartment/${apartment?._id}`}>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <figure className="relative pt-[56.25%]">
          <img
            src={apartment?.images[0]?.secure_url}
            alt={apartment?.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">
            <span className="text-lg font-semibold truncate">
              {apartment?.name}
            </span>
          </h2>

          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-primary">
              ${Number(apartment.price)}
            </p>

            <span className="flex items-center gap-4">
              <BedSingle className="size-6" />
              {apartment?.rooms}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
