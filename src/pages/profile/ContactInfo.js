import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserProfileContext } from "../../App";

const getProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/my-profile";
const updateProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/edit-profile";
const accessToken = () => localStorage.getItem("token");

function ContactInfo() {
  const [profile, setProfile] = useContext(UserProfileContext);
  const [values, setValues] = useState({
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setValues({
      ...values,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      phoneNumber: toNumber(profile.phoneNumber),
    });
  }, [profile]);

  const toNumber = (str) => {
    if (typeof str === "number") {
      return str;
    }

    return parseInt(str);
  };

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ country: "Nigeria" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setStates(result.data.states);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [location.pathname]);

  useEffect(() => {
    if (values.state) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ country: "Nigeria", state: values.state }),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setCities(result.data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [values.state]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
      <div className="flex flex-col gap-3 mb-6 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="shippingAddress">
          Shipping Address
        </label>
        <textarea
          rows={3}
          name="shippingAddress"
          value={values.address}
          onChange={handleChange("address")}
          className="w-full rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg resize-none"
        ></textarea>
      </div>

      <div className="flex justify-between gap-8 mb-6">
        <div className="flex flex-col gap-3 w-full lg:gap-4">
          <label className="text-sm font-medium" htmlFor="state">
            State
          </label>
          <select
            name="state"
            value={values.state}
            onChange={handleChange("state")}
            className="w-full h-11 lg:h-14 lg:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
          >
            <option value="">None</option>
            {states.length > 0 &&
              states.map((state, i) => {
                return (
                  <option key={i} value={state.name}>
                    {state.name}
                  </option>
                );
              })}
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
            className="w-full h-11 lg:h-14 lg:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
          >
            <option value="">None</option>
            {cities.length > 0 &&
              cities.map((city, i) => {
                return (
                  <option key={i} value={city}>
                    {city}
                  </option>
                );
              })}
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
          className="w-full h-11 lg:h-14 lg:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-lg"
        />
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

export default ContactInfo;
