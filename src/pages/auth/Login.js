import React, { useState, useContext, useEffect } from "react";
import { Banner } from "../../component/homepage";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import LaptopCityButton from "../../component/button";
import { LoginContext } from "../../App";
import CustomAlert from "../../component/CustomAlert";

const loginAPI = "https://apps-1.lampnets.com/ecommb-staging/login";

function Login() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [values, setValues] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ ...alert, open: false }); // close any existing alert

    try {
      const res = await fetch(loginAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Login failed");
      }

      const result = await res.json();
      localStorage.setItem("token", result.accessToken);
      setLoggedIn(true);
      navigate(location?.state?.previousUrl || "/products");
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        title: "Login Failed",
        message: error.message,
      });
      setValues({ usernameOrEmail: "", password: "" });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="my-10 md:my-16 lg:my-20">
      <Banner />

      {alert && alert.severity && (
        <CustomAlert
          open={alert.open}
          details={alert}
          close={handleCloseAlert}
        />
      )}

      <div className="my-8 p-4 lg:my-20 md:w-4/5 lg:w-3/5 md:mx-auto">
        <h1 className="text-3xl text-center font-bold mb-8 md:text-4xl lg:text-[45px] lg:mb-20">
          <span className="text-green">Log</span>in
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border border-green border-solid rounded-md px-4 py-14 md:px-36 md:py-24"
        >
          <div className="flex flex-col gap-3 mb-4 md:gap-5 md:mb-8">
            <label className="text-sm font-medium md:text-lg" htmlFor="usernameOrEmail">
              Email address or Username *
            </label>
            <input
              required
              autoFocus
              name="usernameOrEmail"
              type="text"
              id="usernameOrEmail"
              value={values.usernameOrEmail}
              onChange={handleChange("usernameOrEmail")}
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

          <div className="mb-4 md:mb-8">
            <Link
              to=""
              className="text-sm text-green font-normal underline md:text-lg"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-14 flex flex-col items-center gap-10 text-sm font-normal md:text-base md:gap-12 lg:gap-16">
            <button
              disabled={loading}
              className="capitalize font-semibold text-white text-sm lg:text-base md:px-16 lg:py-4 lg:px-[86px] rounded bg-green py-[11px] px-12 hover:bg-dark-green"
              type="submit"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

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
