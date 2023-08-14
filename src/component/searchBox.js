import React, { useState } from "react";
import IMAGES from "../assets";
import LaptopCityButton from "./button";

function SearchBox({ show, search }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="h-20 md:h-auto max-w-3xl bg-filter-green p-5 flex justify-center items-center gap-4 rounded-md md:py-8 md:px-14 lg:px-20">
      <button className="outline-0 p-0 lg:hidden" onClick={show}>
        <i className="bx bxs-grid text-3xl"></i>
      </button>

      {/* <form onSubmit={search}> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(searchTerm);
        }}
        className="bg-white w-full h-full p-2 lg:py-4 lg:px-4 rounded flex justify-between items-center gap-2"
      >
        <i className="bx bx-search bx-sm text-[#BBC8D4]"></i>
        <input
          placeholder="search for gadget..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder:text-[#BBC8D4] rounded h-full px-2 py-1 text-sm outline-none w-full "
        />
        <button
          type="button"
          className="flex-shrink-0 p-0 object-contain  outline-none bg-transparent"
        >
          <img src={IMAGES.icons.filter} alt="filter" />
        </button>
      </form>
      {/* </form> */}

      <LaptopCityButton onClick={() => search(searchTerm)}>
        search
      </LaptopCityButton>
    </div>
  );
}

export default SearchBox;
