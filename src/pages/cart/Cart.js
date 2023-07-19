import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import RenderedCart from "./RenderedCart";

const activeStyles = ({ isActive }) => {
  if (isActive) {
    return {
      color: "#FFFFFF",
      fontWeight: 600,
      backgroundColor: "#009F7F",
    };
  }
};

function Cart() {
  const [cart, setCart] = useState(false);
  return (
    <div className="border border-solid border-green rounded w-full lg:ml-24">
      <div className="border-b border-b-solid border-b-gray-400 p-4 text-center text-lg font-semibold capitalize md:text-xl lg:text-2xl lg:py-6">
        shopping Cart
      </div>

      <div>{!cart ? <EmptyCart /> : <RenderedCart />}</div>
    </div>
  );
}

export default Cart;
