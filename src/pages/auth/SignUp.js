import React, { useState } from "react";
import { Banner } from "../../component/homepage";
import { Link } from "react-router-dom";
import LaptopCityButton from "../../component/button";

function SignUp() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (values.password !== values.confirmPassword) {
      alert("Confirm your password!!!");
    } else {
      console.log(values);
    }
  };

  return (
    <div className="my-10">
      <Banner />

      <div className="my-8 p-4">
        <h1 className="text-3xl text-center font-bold mb-8">
          <span className="text-green">Sign</span> up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border border-green border-solid rounded-md px-4 py-14"
        >
          <div className="flex flex-col gap-3 mb-4">
            <label className="text-sm font-medium" htmlFor="firstName">
              First Name *
            </label>
            <input
              required
              autoFocus
              name="firstName"
              type="text"
              id="firstName"
              value={values.firstName}
              onChange={handleChange("firstName")}
              className="w-full h-11 rounded-sm bg-pagination p-3 outline-0 font-light text-sm"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <label className="text-sm font-medium" htmlFor="lastName">
              Last Name *
            </label>
            <input
              required
              name="lastName"
              type="text"
              id="lastName"
              value={values.lastName}
              onChange={handleChange("lastName")}
              className="w-full h-11 rounded-sm bg-pagination p-3 outline-0 font-light text-sm"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <label className="text-sm font-medium" htmlFor="email">
              Email address *
            </label>
            <input
              required
              name="email"
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange("email")}
              className="w-full h-11 rounded-sm bg-pagination p-3 outline-0 font-light text-sm"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <label className="text-sm font-medium" htmlFor="password">
              Password *
            </label>
            <div className="relative">
              <input
                required
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                className="w-full h-11 rounded-sm bg-pagination p-3 pr-12 outline-0 font-light text-sm"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="outline-0 text-green absolute top-1/4 right-2 cursor-pointer"
              >
                {showPassword ? (
                  <i className="bx bx-hide bx-sm"></i>
                ) : (
                  <i className="bx bx-show bx-sm"></i>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <label className="text-sm font-medium" htmlFor="confirmPassword">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                required
                name="confirmPassword"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                className="w-full h-11 rounded-sm bg-pagination p-3 pr-12 outline-0 font-light text-sm"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="outline-0 text-green absolute top-1/4 right-2 cursor-pointer"
              >
                {showPassword ? (
                  <i className="bx bx-hide bx-sm"></i>
                ) : (
                  <i className="bx bx-show bx-sm"></i>
                )}
              </button>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center gap-10 text-sm">
            <LaptopCityButton onClick={handleSubmit}>Sign up</LaptopCityButton>

            <p className="font-light">
              Already have an account?{" "}
              <Link to="/login" className="text-green font-semibold">
                Login
              </Link>{" "}
            </p>

            <p className="self-start font-light">
              By clicking “Sign up” above, you acknowledge that you have read
              and understood, and agree to Laptop city’s{" "}
              <Link to="" className="text-green font-medium">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="" className="text-green font-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
