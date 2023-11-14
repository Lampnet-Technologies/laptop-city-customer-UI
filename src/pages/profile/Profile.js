import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Banner } from "../../component/homepage";
import ProfileMenu from "./ProfileMenu";
import { LoginContext, UserProfileContext } from "../../App";

function Profile() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [profile, setProfile] = useContext(UserProfileContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  });

  return (
    <div className="my-10 md:my-20">
      <Banner />

      <div className="my-10 md:my-20">
        <h1 className="px-2 text-2xl text-center font-semibold capitalize mb-12 tracking-tight flex items-center justify-center gap-2 flex-wrap">
          <span className="text-green">Welcome</span> "{profile?.username}"!{" "}
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.username}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
            />
          ) : (
            <i className="bx bxs-user-circle text-green lg:text-3xl"></i>
          )}
        </h1>

        <div className="md:hidden">
          <Outlet />
        </div>

        <div className="hidden md:flex md:justify-between xl:justify-start md:gap-12 xl:gap-20 items-start pl-6 md:pr-12 xl:pr-24">
          <ProfileMenu />

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
