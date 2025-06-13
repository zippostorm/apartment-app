import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllApartment,
  resetCurrentApartment,
} from "../store/apartment/apartmentSlice";
import { PackageIcon, RefreshCwIcon } from "lucide-react";
import ApartmentCard from "../components/ApartmentCard";

const HomePage = () => {
  const dispatch = useDispatch();

  const { apartments, error, loading } = useSelector(
    (state) => state.apartment
  );

  console.log(apartments);
  useEffect(() => {
    dispatch(getAllApartment());
    dispatch(resetCurrentApartment());
  }, [dispatch]);
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-ghost btn-circle">
          <RefreshCwIcon
            className="size-5"
            onClick={() => dispatch(getAllApartment())}
          />
        </button>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1 btn-accent">
            Filters
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {apartments.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No apartments found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first apartment to the market
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
            <ApartmentCard key={apartment._id} apartment={apartment} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
