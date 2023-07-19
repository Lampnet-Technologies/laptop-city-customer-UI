import React from "react";
import { Outlet } from "react-router-dom";
import { Banner } from "../../component/homepage";
import ProfileMenu from "./ProfileMenu";

function Profile() {
  return (
    <div className="my-10 md:my-20">
      <Banner />

      <div className="my-10 md:my-20">
        <h1 className="text-2xl text-center font-semibold capitalize mb-12 tracking-tight flex items-start justify-center gap-2">
          <span className="text-green">Welcome</span> "Username"!{" "}
          <i className="bx bxs-user-circle text-green lg:text-3xl"></i>
        </h1>

        <div className="lg:hidden">
          <Outlet />
        </div>

        <div className="hidden lg:flex items-start pl-6 pr-24">
          <ProfileMenu />

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
