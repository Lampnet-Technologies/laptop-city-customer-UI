import React from "react";
import IMAGES from "../assets";
import LaptopCityButton from "./button";

function SearchBox() {
  return (
    <div className="h-20 max-w-3xl bg-filter-green p-5 flex justify-center items-center gap-4">
      <div className="bg-white w-full h-full p-2 rounded flex justify-between items-center gap-2">
        <img src={IMAGES.icons.search} alt="search icon" />
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
