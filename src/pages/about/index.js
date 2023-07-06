import React from "react";
import { Outlet } from "react-router-dom";

function Company() {
  return (
    <div className="my-20 p-4">
      <Outlet />
    </div>
  );
}

export default Company;
