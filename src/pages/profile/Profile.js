import React, { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Banner } from "../../component/homepage";
import ProfileMenu from "./ProfileMenu";
import SignOutAlert from "../../component/SignOutAlert";
import { LoginContext, UserProfileContext } from "../../App";

const getProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/my-profile";
const accessToken = () => localStorage.getItem("token");

function Profile() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [profile, setProfile] = useContext(UserProfileContext);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  });

  const handleToggleAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/products");
  };

  return (
    <div className="my-10 md:my-20">
      <Banner />

      <div className="my-10 md:my-20">
        <h1 className="text-2xl text-center font-semibold capitalize mb-12 tracking-tight flex items-center justify-center gap-2">
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

        {openAlert && (
          <SignOutAlert logOut={handleLogOut} closeAlert={handleCloseAlert} />
        )}

        <div className="md:hidden">
          <Outlet onLogOut={handleToggleAlert} />
        </div>

        <div
          className="hidden md:flex md:justify-between lg:justify-start md:gap-12 lg:gap-24 items-start pl-6 md:pr-12 lg:pr-24"
          // style={{ border: "4px solid red" }}
        >
          <ProfileMenu onLogOut={handleToggleAlert} />

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
