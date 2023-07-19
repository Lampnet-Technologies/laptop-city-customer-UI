import React, { useState } from "react";
import { Banner } from "../../component/homepage";
import { Link } from "react-router-dom";
import LaptopCityButton from "../../component/button";

function Login() {
  const [values, setValues] = useState({
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

    console.log(values);
  };

  return (
    <div className="my-10 md:my-16 lg:my-20">
      <Banner />

      <div className="my-8 p-4 lg:my-20 md:w-4/5 lg:w-3/5 md:mx-auto">
        <h1 className="text-3xl text-center font-bold mb-8 md:text-4xl lg:text-[45px] lg:mb-12">
          <span className="text-green">Log</span>in
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border border-green border-solid rounded-md px-4 py-14 md:px-40 md:py-24"
        >
          <div className="flex flex-col gap-3 mb-4 md:gap-5 md:mb-8">
            <label className="text-sm font-medium md:text-lg" htmlFor="email">
              Email address *
            </label>
            <input
              required
              autoFocus
              name="email"
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange("email")}
              className="w-full h-11 md:h-14 md:rounded rounded-sm bg-pagination p-3 outline-0 font-light text-sm"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4 md:gap-5 md:mb-8">
            <label
              className="text-sm font-medium md:text-lg"
              htmlFor="password"
            >
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
                className="w-full h-11 md:h-14 md:rounded rounded-sm bg-pagination p-3 pr-12 outline-0 font-light text-sm"
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

          <div className="mb-4 md:mb-8">
            <Link to="" className="text-sm text-green md:text-lg">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-14 flex flex-col items-center gap-10 text-sm font-normal md:text-base md:gap-12 lg:gap-16">
            <LaptopCityButton onClick={handleSubmit}>Login</LaptopCityButton>

            <p>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green font-semibold">
                Sign up
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
