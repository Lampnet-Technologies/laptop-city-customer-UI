import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserProfileContext } from "../../App";

const getProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/my-profile";
const updateProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/edit-profile";
const accessToken = () => localStorage.getItem("token");

function PersonalInfo() {
  const [profile, setProfile] = useContext(UserProfileContext);
  const [values, setValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setValues({
      ...values,
      firstName: profile.firstName,
      // middleName: profile.middleName,
      lastName: profile.lastName,
      username: profile.username,
      // phoneNumber: toNumber(profile.phoneNumber),
      email: profile.email,
      // password: profile.password,
    });
  }, [profile]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(updateProfile, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + accessToken(),
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        alert("Profile Updated Successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to update profile", error.message);
      });
  };

  return (
    <form className="px-4 py-8 md:px-10 lg:px-[120px] md:py-4">
      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="firstName">
          First Name
        </label>
        <input
          name="firstName"
          type="text"
          value={values.firstName}
          onChange={handleChange("firstName")}
          className="capitalize w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="middleName">
          Middle Name
        </label>
        <input
          name="middleName"
          type="text"
          value={values.middleName || ""}
          onChange={handleChange("middleName")}
          className="capitalize w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="lastName">
          Last Name
        </label>
        <input
          name="lastName"
          type="text"
          value={values.lastName}
          onChange={handleChange("lastName")}
          className="capitalize w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange("username")}
          className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="email">
          Email address
        </label>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password || ""}
            onChange={handleChange("password")}
            className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
          />
          <button
            type="button"
            onClick={handleShowPassword}
            className="outline-0 text-gray-600 absolute top-1/4 right-[3%] cursor-pointer"
          >
            {showPassword ? (
              <i className="bx bx-hide bx-sm text-[#6D7D8B]"></i>
            ) : (
              <i className="bx bx-show bx-sm text-[#6D7D8B]"></i>
            )}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <Link to="" className="text-sm text-green">
          Change Password
        </Link>
      </div>

      <div className="text-center my-8">
        <button
          type="button"
          className="bg-transparent outline-0 font-semibold text-green tracking-tight underline lg:text-lg"
          onClick={handleSubmit}
        >
          {" "}
          Save changes
        </button>
      </div>
    </form>
  );
}

export default PersonalInfo;
