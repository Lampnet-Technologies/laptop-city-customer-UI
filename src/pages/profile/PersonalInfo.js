import React, { useState } from "react";
import { Link } from "react-router-dom";

function PersonalInfo() {
  const [values, setValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(values);
  };

  return (
    <form
      onClick={handleSubmit}
      className="px-4 py-8 md:px-10 lg:px-[120px] md:py-4"
    >
      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="firstName">
          First Name
        </label>
        <input
          name="firstName"
          type="text"
          id="firstName"
          value={values.firstName}
          onChange={handleChange("firstName")}
          className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="middleName">
          Middle Name
        </label>
        <input
          name="middleName"
          type="text"
          id="middleName"
          value={values.middleName}
          onChange={handleChange("middleName")}
          className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="lastName">
          Last Name
        </label>
        <input
          name="lastName"
          type="text"
          id="lastName"
          value={values.lastName}
          onChange={handleChange("lastName")}
          className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          name="username"
          type="text"
          id="username"
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
          id="email"
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
            id="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
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
        >
          {" "}
          Save changes
        </button>
      </div>
    </form>
  );
}

export default PersonalInfo;
