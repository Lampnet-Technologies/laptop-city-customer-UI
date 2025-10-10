import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserCartDependency, UserProfileContext } from "../../App";
import CustomAlert from "../../component/CustomAlert";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ContactInfo() {
  const [profile, setProfile] = useContext(UserProfileContext);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [values, setValues] = useState({
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (profile) {
      setValues({
        address: profile.address || "",
        city: profile.city || "",
        state: profile.state || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  const toNumber = (str) => {
    if (typeof str === "number") return str;
    if (!str) return "";
    return parseInt(str);
  };

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ country: "Nigeria" }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data && result.data.states) {
          setStates(result.data.states);
        }
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, [location.pathname, cartDep]);

  useEffect(() => {
    if (values.state) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ country: "Nigeria", state: values.state }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.data) {
            setCities(result.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [values.state]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Build proper update payload with all required fields
      const dataToSend = {
        // Include existing profile data to avoid overwriting
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        username: profile.username || "",
        email: profile.email || "",
        avatar: profile.avatar || "",
        country: profile.country || "Nigeria",
        // Updated contact info
        address: values.address,
        city: values.city,
        state: values.state,
        phoneNumber: values.phoneNumber,
      };

      const response = await fetch(`${baseUrl}/profiles/edit-profile`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        // Update the profile context with new data
        const updatedProfile = { ...profile, ...dataToSend };
        setProfile(updatedProfile);

        setAlert({
          open: true,
          severity: "success",
          title: "Contact Information Updated Successfully",
          message: "Your contact information has been saved.",
        });

        // Force refresh of profile data
        setCartDep(prev => prev + 1);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update contact information");
      }
    } catch (error) {
      console.error("Contact update error:", error);
      setAlert({
        open: true,
        severity: "error",
        title: "Update Failed",
        message: error.message || "Something went wrong while updating your contact information",
      });
    }
  };

  return (
    <>
      {alert && alert.severity && (
        <CustomAlert
          open={alert.open}
          details={alert}
          close={handleCloseAlert}
        />
      )}

      <form className="px-4 py-8 md:px-10 lg:px-[100px] xl:px-[120px] md:py-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mb-6 lg:gap-4 lg:mb-5">
          <label className="text-sm font-medium" htmlFor="shippingAddress">
            Shipping Address
          </label>
          <textarea
            rows={3}
            name="shippingAddress"
            value={values.address}
            onChange={handleChange("address")}
            className="w-full rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base resize-none"
            placeholder="Enter your complete shipping address"
          ></textarea>
        </div>

        <div className="flex justify-between gap-6 mb-6 w-full">
          <div className="flex flex-col gap-3 w-full lg:gap-4">
            <label className="text-sm font-medium" htmlFor="state">
              State
            </label>
            <select
              name="state"
              value={values.state}
              onChange={handleChange("state")}
              className="w-full h-11 lg:h-14 xl:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
            >
              <option value="">Select State</option>
              {states.length > 0 &&
                states.map((state, i) => (
                  <option key={i} value={state.name}>
                    {state.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full lg:gap-4">
            <label className="text-sm font-medium" htmlFor="city">
              City
            </label>

            <select
              name="city"
              value={values.city}
              onChange={handleChange("city")}
              className="w-full h-11 lg:h-14 xl:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
              disabled={!values.state}
            >
              <option value="">Select City</option>
              {cities.length > 0 &&
                cities.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-6 lg:gap-4">
          <label className="text-sm font-medium" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="tel"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
            placeholder="Enter your phone number"
            className="w-full h-11 lg:h-14 lg:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
          />
        </div>

        <div className="text-center my-8">
          <button
            type="submit"
            className="bg-transparent outline-0 font-semibold text-green tracking-tight underline lg:text-lg hover:bg-green hover:text-white px-4 py-2 rounded transition-colors"
          >
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}

export default ContactInfo;