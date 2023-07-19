import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const activeStyles = ({ isActive }) => {
  if (isActive) {
    return {
      color: "#FFFFFF",
      fontWeight: 600,
      backgroundColor: "#009F7F",
    };
  }
};

function Coupons() {
  return (
    <div className="border border-solid border-green rounded w-full lg:ml-24">
      <div className="border-b border-b-solid border-b-gray-400 p-4 text-center text-lg font-semibold capitalize">
        Coupons
      </div>
      <div className="w-4/5 mx-auto border-b border-b-solid border-b-gray-400 py-2 px-6 font-medium text-green capitalize flex justify-between gap-4 lg:justify-center items-center lg:gap-16">
        <NavLink
          to="/coupons/active"
          id="active"
          className="inline-block rounded px-4 transition-all ease-in duration-700 bg-transparent hover:text-white hover:bg-green active:text-white active:bg-green"
          // style={{ transition: "ease 0.6s" }}
          style={activeStyles}
        >
          <div className="py-4 text-center">Active</div>
        </NavLink>
        <NavLink
          to="/coupons/inactive"
          id="inactive"
          className="inline-block rounded px-4 transition-all ease-in duration-700 bg-transparent hover:text-white hover:bg-green active:text-white active:bg-green"
          // style={{ transition: "ease 0.6s" }}
          style={activeStyles}
        >
          <div className="py-4 text-center">Inactive</div>
        </NavLink>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Coupons;
