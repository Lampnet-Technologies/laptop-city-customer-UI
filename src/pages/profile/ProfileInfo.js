import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const activeStyles = ({ isActive }) => {
  if (isActive) {
    return {
      color: "#009F7F",
      fontWeight: 600,
      borderBottom: "2px solid #009F7F",
    };
  }
};

function ProfileInfo() {
  return (
    <div className="border border-solid border-green rounded">
      <div className="border-b border-b-solid border-b-gray-400 p-4 text-center text-lg font-semibold capitalize">
        account details
      </div>
      <div className="border-b border-b-solid border-b-gray-400 px-2 font-medium text-gray-400 capitalize flex justify-around items-center gap-4">
        <NavLink
          to="/personal-info"
          className="inline-block w-full md:w-fit ease-in duration-700 hover:text-green hover:font-semibold hover:border-b-2 hover:border-b-solid hover:border-b-green focus:text-green focus:font-semibold focus:border-b-2 focus:border-b-solid focus:border-b-green active:text-green active:font-semibold active:border-b-2 active:border-b-solid active:border-b-green"
          // style={{ transition: "linear 0.6s" }}
          style={activeStyles}
        >
          <div className="py-4 text-center">personal information</div>
        </NavLink>
        <NavLink
          to="/contact-info"
          className="inline-block w-full md:w-fit ease-in duration-700 hover:text-green hover:font-semibold hover:border-b-2 hover:border-b-solid hover:border-b-green focus:text-green focus:font-semibold focus:border-b-2 focus:border-b-solid focus:border-b-green active:text-green active:font-semibold active:border-b-2 active:border-b-solid active:border-b-green"
          // style={{ transition: "linear 0.6s" }}
          style={activeStyles}
        >
          <div className="py-4 text-center">contact info</div>
        </NavLink>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileInfo;
