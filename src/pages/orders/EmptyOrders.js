import React from "react";
import { Link } from "react-router-dom";

function EmptyOrders() {
  return (
    <div className="h-screen text-center flex flex-col justify-center items-center gap-4 px-8 lg:space-y-6">
      <div className="w-60 h-60 rounded-full mb-6 bg-pagination text-green flex justify-center items-center">
        <i className="bx bx-cart-add" style={{ fontSize: "150px" }}></i>
      </div>

      <p className="text-lg font-normal lg:text-2xl">
        You have not placed any order yet
      </p>

      <button className="capitalize font-medium text-white text-sm lg:text-base md:font-semibold md:px-6 lg:py-3 lg:px-10 rounded bg-green py-2 px-4 hover:bg-dark-green">
        <Link to="/products">start ordering</Link>
      </button>
    </div>
  );
}

export default EmptyOrders;
