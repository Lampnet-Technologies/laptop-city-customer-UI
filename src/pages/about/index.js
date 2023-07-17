import React from "react";
import { Outlet } from "react-router-dom";

function Company() {
  return (
    <div className="my-16 p-4 md:px-0 md:my-20 md:mx-12 lg:py-0 lg:my-32 lg:mx-24">
      <Outlet />
    </div>
  );
}

export default Company;
