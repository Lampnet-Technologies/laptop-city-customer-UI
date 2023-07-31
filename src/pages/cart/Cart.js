import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import RenderedCart from "./RenderedCart";

const localCart = [
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: 350000,
    brand:
      "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764541/apple-logo_v1oqh1.png",
    quantity: 1,
  },
  {
    name: "Alienware-X15-R1-Gaming-Laptop",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
    category: "new",
    price: 350000,
    brand:
      "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764541/Alienware-Logo_vvili4.png",
    quantity: 1,
  },
];

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
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(localCart);
  }, []);

  return (
    <div className="border border-solid border-green rounded w-full lg:ml-24">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-2xl">
        shopping Cart
      </div>

      <div>
        {cart.length < 1 ? <EmptyCart /> : <RenderedCart items={cart} />}
      </div>
    </div>
  );
}

export default Cart;
