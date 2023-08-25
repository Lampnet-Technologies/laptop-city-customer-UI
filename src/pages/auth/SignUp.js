import React, { useState, useEffect, useContext } from "react";
import { Banner } from "../../component/homepage";
import { Link, useNavigate } from "react-router-dom";
import LaptopCityButton from "../../component/button";
import { LoginContext } from "../../App";

const signupAPI = "https://apps-1.lampnets.com/ecommb-staging/register";

function SignUp() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }, []);

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
      fetch(signupAPI, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          alert("Welcome onboard 🎊🎉");
          navigate("/login");
        })
        .catch((error) => {
          alert("Confirm Credentials", error.message);
        });
    }
  };

  return (
    <div className="my-10 md:my-16 lg:my-20">
      <Banner />

      <div className="my-8 p-4 lg:my-20 md:w-4/5 lg:w-3/5 md:mx-auto">
        <h1 className="text-3xl text-center font-bold mb-8 md:text-4xl lg:text-[45px] lg:mb-20">
          <span className="text-green">Sign</span> up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border border-green border-solid rounded-md px-4 py-14 md:px-36 md:py-24 lg:pb-60"
        >
          <div className="flex flex-col gap-3 mb-4 md:gap-5 md:mb-8">
            <label
              className="text-sm font-medium md:text-lg"
              htmlFor="firstName"
            >
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
              className="w-full h-11 md:h-14 md:rounded rounded-sm bg-[#ECF3F9] p-3 outline-0 font-light text-sm"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4 md:gap-5 md:mb-8">
            <label
              className="text-sm font-medium md:text-lg"
              htmlFor="lastName"
            >
              Last Name *
            </label>
            <input
              required
              name="lastName"
              type="text"
              id="lastName"
              value={values.lastName}
              onChange={handleChange("lastName")}
              className="w-full h-11 md:h-14 md:rounded rounded-sm bg-[#ECF3F9] p-3 outline-0 font-light text-sm"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4 md:gap-5 md:mb-8">
            <label className="text-sm font-medium md:text-lg" htmlFor="email">
              Email address *
            </label>
            <input
              required
              name="email"
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange("email")}
              className="w-full h-11 md:h-14 md:rounded rounded-sm bg-[#ECF3F9] p-3 outline-0 font-light text-sm"
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
                className="w-full h-11 md:h-14 md:rounded rounded-sm bg-[#ECF3F9] p-3 pr-12 outline-0 font-light text-sm"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="outline-0 text-green absolute top-1/4 right-[3%] cursor-pointer"
              >
                {showPassword ? (
                  <i className="bx bx-hide bx-sm text-[#6D7D8B]"></i>
                ) : (
                  <i className="bx bx-show bx-sm text-[#6D7D8B]"></i>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-4 md:gap-5 md:mb-8">
            <label
              className="text-sm font-medium md:text-lg"
              htmlFor="confirmPassword"
            >
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
                className="w-full h-11 md:h-14 md:rounded rounded-sm bg-[#ECF3F9] p-3 pr-12 outline-0 font-light text-sm"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="outline-0 text-green absolute top-1/4 right-[3%] cursor-pointer"
              >
                {showPassword ? (
                  <i className="bx bx-hide bx-sm text-[#6D7D8B]"></i>
                ) : (
                  <i className="bx bx-show bx-sm text-[#6D7D8B]"></i>
                )}
              </button>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center gap-10 text-sm font-normal md:text-base md:gap-12 lg:gap-16">
            <button
              className="capitalize font-semibold text-white text-sm lg:text-base md:px-16 lg:py-4 lg:px-[86px] rounded bg-green py-[11px] px-12 hover:bg-dark-green"
              onClick={handleSubmit}
            >
              Sign up
            </button>

            <p className="font-light">
              Already have an account?{" "}
              <Link to="/login" className="text-green font-semibold">
                Login
              </Link>{" "}
            </p>

            <p className="self-start font-normal lg:leading-10">
              By clicking <span className="md:font-medium">“Sign up”</span>{" "}
              above, you acknowledge that you have read and understood, and
              agree to Laptop city’s{" "}
              <Link
                to="/terms-&-conditions"
                className="text-green underline font-medium"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-green underline font-medium"
              >
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
