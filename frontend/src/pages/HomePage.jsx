import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllApartment,
  resetCurrentApartment,
} from "../store/apartment/apartmentSlice";
import { PackageIcon } from "lucide-react";
import ApartmentCard from "../components/ApartmentCard";

const HomePage = () => {
  const dispatch = useDispatch();

  const [sort, setSort] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const { apartments, error, loading, paginationLoading } = useSelector(
    (state) => state.apartment
  );

  const handleShowMore = async () => {
    const numberOfApartments = apartments.length;
    const startIndex = numberOfApartments;

    dispatch(getAllApartment({ sort, startIndex })).then((data) => {
      if (data?.payload?.apartments?.length < 6) setShowMore(false);
    });
  };

  useEffect(() => {
    dispatch(getAllApartment({ sort })).then((data) => {
      if (data?.payload?.apartments?.length >= 6) setShowMore(true);
    });
    dispatch(resetCurrentApartment());
  }, [dispatch, sort]);
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-end items-center mb-8">
        <div
          className="dropdown dropdown-end"
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 btn-accent"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Filters
          </div>

          {isOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2"
            >
              <li>
                <button
                  className={`${
                    sort === "" ? "bg-accent text-white font-bold" : ""
                  }`}
                  onClick={() => setSort("")}
                >
                  Newest first
                </button>
              </li>
              <li>
                <button
                  className={`${
                    sort === "rooms" ? "bg-accent text-white font-bold" : ""
                  }`}
                  onClick={() => setSort("rooms")}
                >
                  Sort by rooms
                </button>
              </li>
              <li>
                <button
                  className={`${
                    sort === "price" ? "bg-accent text-white font-bold" : ""
                  }`}
                  onClick={() => setSort("price")}
                >
                  Sort by price
                </button>
              </li>
            </ul>
          )}
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment._id} apartment={apartment} />
            ))}
          </div>

          {showMore && (
            <div className="flex justify-center mt-8">
              <button
                className="btn btn-primary w-[300px]"
                onClick={() => handleShowMore()}
              >
                {paginationLoading ? (
                  <div className="loading loading-spinner loading-lg" />
                ) : (
                  "Show more"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;
