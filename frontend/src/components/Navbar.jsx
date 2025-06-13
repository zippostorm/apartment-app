import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { House, PlusCircleIcon } from "lucide-react";
import ApartmentModal from "./ApartmentModal";

const Navbar = () => {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <House className="size-8 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl 
                bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  FLATBOARD
                </span>
              </div>
            </Link>
          </div>

          {isHomePage && (
            <div className="flex items-center gap-4">
              <button
                className="btn btn-primary"
                onClick={() =>
                  document.getElementById("apartment_modal").showModal()
                }
              >
                <PlusCircleIcon className="size-5" />
                <span className="hidden sm:inline ml-2">Add Apartment</span>
              </button>
              <ApartmentModal EditMode={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
