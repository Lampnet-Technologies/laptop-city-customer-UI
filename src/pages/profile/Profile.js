import React from "react";
import { Outlet } from "react-router-dom";
import { Banner } from "../../component/homepage";

function Profile() {
  return (
    <div className="my-10">
      <Banner />

      <div className="my-10">
        <h1 className="text-2xl text-center font-semibold capitalize mb-12 tracking-tight">
          <span className="text-green">Welcome</span> "Username"!{" "}
          <i className="bx bxs-user-circle text-green"></i>
        </h1>

        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
