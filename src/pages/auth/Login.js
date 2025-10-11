import { useState, useContext } from "react";
import { Banner } from "../../component/homepage";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../App";
import CustomAlert from "../../component/CustomAlert";

const baseUrl = process.env.REACT_APP_BASE_URL;
const loginAPI = `${baseUrl}/login`;

function Login() {
  const { loggedIn, setLoggedIn, setToken, isLoading: globalLoading, refreshUserData } = useContext(LoginContext);
  
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

  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

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
        body: JSON.stringify({
          usernameOrEmail: values.usernameOrEmail,
          password: values.password,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid username/email/phone number or password");
        }
        throw new Error(`Login failed: ${res.status}`);
      }

      const result = await res.json();

      // ✅ Update both localStorage and context state immediately
      localStorage.setItem("token", result.accessToken);
      setToken(result.accessToken); // This triggers the data fetch in App.js
      setLoggedIn(true);

      // ✅ Optional: Manually trigger data refresh for immediate effect
      if (refreshUserData) {
        await refreshUserData();
      }

      // Show success alert
      setAlert({
        open: true,
        severity: "success",
        title: "Login Successful",
        message: `Welcome back 🎉`,
      });

      // Navigate after short delay so user sees alert
      setTimeout(() => {
        navigate(location?.state?.previousUrl || "/products");
      }, 800);
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        title: "Login Failed",
        message: error.message || "Invalid credentials",
      });
      setValues({ usernameOrEmail: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  // Show loading state during data fetching after login
  const isProcessing = loading || globalLoading;

  return (
    <div className="my-10 md:my-16 lg:my-20">
      <Banner />

      {alert && alert.severity && (
        <CustomAlert open={alert.open} details={alert} close={handleCloseAlert} />
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
              Phone Number or Email or Username *
            </label>
            <input
              required
              autoFocus
              autoComplete="username"
              name="usernameOrEmail"
              type="text"
              id="usernameOrEmail"
              value={values.usernameOrEmail}
              onChange={handleChange("usernameOrEmail")}
              disabled={isProcessing}
              className="w-full h-11 md:h-14 md:rounded rounded-sm bg-[#ECF3F9] p-3 outline-0 font-light text-sm disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-3 mb-4 md:gap-5 md:mb-8">
            <label className="text-sm font-medium md:text-lg" htmlFor="password">
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
                autoComplete="current-password"
                disabled={isProcessing}
                className="w-full h-11 md:h-14 md:rounded rounded-sm bg-[#ECF3F9] p-3 pr-12 outline-0 font-light text-sm disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                disabled={isProcessing}
                className="outline-0 text-green absolute top-1/4 right-[3%] cursor-pointer disabled:opacity-50"
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
            <Link to="" className="text-sm text-green font-normal underline md:text-lg">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-14 flex flex-col items-center gap-10 text-sm font-normal md:text-base md:gap-12 lg:gap-16">
            <button
              disabled={isProcessing}
              className="capitalize font-semibold text-white text-sm lg:text-base md:px-16 lg:py-4 lg:px-[86px] rounded bg-green py-[11px] px-12 hover:bg-dark-green disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
              type="submit"
            >
              {loading ? "Logging in..." : globalLoading ? "Loading your data..." : "Login"}
            </button>

            <p>
              Don't have an account?{" "}
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