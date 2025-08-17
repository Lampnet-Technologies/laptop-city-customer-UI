import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LaptopCityButton from "../button";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const showSearchResult = (term) => {
    const encoded = encodeURI(term);
    navigate(`/products?filter=${encoded}`);
  };

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          showSearchResult(searchTerm);
        }}
        className="flex flex-row items-center justify-center gap-3 w-full max-w-3xl"
      >
        <div className="flex items-center w-full bg-white border-2 border-[#BBC8D4] rounded-lg px-4 h-[45px] md:h-[56px]">
          <i className="bx bx-search bx-sm text-[#94A3B1] mr-2"></i>
          <input
            id="searchGadget"
            type="text"
            placeholder="Search for gadgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 placeholder:text-[#BBC8D4] text-sm md:text-base font-medium outline-none"
          />
        </div>
        <LaptopCityButton className="min-w-[90px] px-6 py-3">
          Search
        </LaptopCityButton>
      </form>
    </div>
  );
}
