import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const filters = ["active", "inactive"];

function Coupons() {
  const [defaultFilter, setDefaultFilter] = useState("active");

  return (
    <div className="border border-solid border-green rounded w-full">
      <div className="border-b border-b-solid border-b-gray-400 p-4 text-center text-xl font-semibold capitalize md:p-8 lg:text-[27px]">
        Coupons
      </div>
      <div className="w-4/5 mx-auto border-b border-b-solid border-b-gray-400 py-2 px-6 font-medium text-green capitalize flex justify-between gap-4 lg:justify-center items-center lg:gap-16">
        {filters.map((filter, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`inline-block rounded px-4 transition-all ease-in-out duration-500 bg-transparent outline-0 hover:text-white hover:bg-green ${
                defaultFilter == filter && "bg-dark-green text-white"
              } focus:text-white focus:bg-green`}
              onClick={() => setDefaultFilter(filter)}
            >
              <div className="py-3 text-center capitalize">{filter}</div>
            </button>
          );
        })}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Coupons;
