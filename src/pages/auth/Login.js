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
    <div className="my-10">
      <Banner />

      <div className="my-8 p-4">
        <h1 className="text-3xl text-center font-bold mb-8">
          <span className="text-green">Log</span>in
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border border-green border-solid rounded-md px-4 py-14"
        >
          <div className="flex flex-col gap-3 mb-4">
            <label className="text-sm font-medium" htmlFor="email">
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

          <div className="mb-4">
            <Link to="" className="text-sm text-green">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center gap-10">
            <LaptopCityButton onClick={handleSubmit}>Login</LaptopCityButton>

            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green">
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
