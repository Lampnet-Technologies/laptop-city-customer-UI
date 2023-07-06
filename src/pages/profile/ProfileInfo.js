import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

function ProfileInfo() {
  return (
    <div className="border border-solid border-green rounded">
      <div className="border-b border-b-solid border-b-gray-400 p-4 text-center text-lg font-semibold capitalize">
        account details
      </div>
      <div className="border-b border-b-solid border-b-gray-400 px-2 font-medium text-gray-400 capitalize flex gap-4">
        <NavLink
          to="/personal-info"
          className="inline-block w-full hover:text-green hover:font-semibold hover:border-b-2 hover:border-b-solid hover:border-b-green active:text-green active:font-semibold active:border-b-2 active:border-b-solid active:border-b-green"
          style={{ transition: "linear 1s" }}
        >
          <div className="py-4 text-center">personal information</div>
        </NavLink>
        <NavLink
          to="/contact-info"
          className="inline-block w-full hover:text-green hover:font-semibold hover:border-b-2 hover:border-b-solid hover:border-b-green active:text-green active:font-semibold active:border-b-2 active:border-b-solid active:border-b-green"
          style={{ transition: "linear 1s" }}
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
