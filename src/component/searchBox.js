import React from "react";
import IMAGES from "../assets";
import LaptopCityButton from "./button";

function SearchBox({ show }) {
  return (
    <div className="h-20 max-w-3xl bg-filter-green p-5 flex justify-center items-center gap-4 rounded-md md:py-4 md:px-14">
      <button className="outline-0 p-0 lg:hidden" onClick={show}>
        <i className="bx bxs-grid bx-md"></i>
      </button>

      <div className="bg-white w-full h-full p-2 lg:px-4 rounded flex justify-between items-center gap-2">
        {/* <img src={IMAGES.icons.search} alt="search icon" /> */}
        <i className="bx bx-search bx-sm text-gray-400"></i>
        <input
          placeholder="search"
          className="rounded px-2 py-1 text-sm outline-none w-full "
        />
        <button
          type="button"
          className="flex-shrink-0 p-0 object-contain  outline-none bg-transparent"
        >
          <img src={IMAGES.icons.filter} alt="filter" />
        </button>
      </div>

      <LaptopCityButton>search</LaptopCityButton>
    </div>
  );
}

export default SearchBox;
