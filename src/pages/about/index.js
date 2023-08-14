import React from "react";
import { Outlet } from "react-router-dom";

function Company() {
  return (
    <div className="my-10 p-4 md:px-0 md:mx-12 lg:py-0 lg:mx-24">
      <Outlet />
    </div>
  );
}

export default Company;
