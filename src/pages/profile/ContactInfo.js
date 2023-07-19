import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ContactInfo() {
  const [values, setValues] = useState({
    shippingAddress: "",
    city: "",
    state: "",
    phoneNumber: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const location = useLocation();

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

    // console.log(values);
  };

  return (
    <form
      onClick={handleSubmit}
      className="px-4 py-8 md:px-10 lg:px-[75px] md:py-4"
    >
      <div className="flex flex-col gap-3 mb-6 lg:gap-4 lg:mb-5">
        <label className="text-sm font-medium" htmlFor="shippingAddress">
          Shipping Address
        </label>
        <textarea
          rows={3}
          name="shippingAddress"
          id="shippingAddress"
          value={values.shippingAddress}
          onChange={handleChange("shippingAddress")}
          className="w-full rounded bg-pagination p-3 outline-0 font-light text-sm resize-none"
        ></textarea>
      </div>

      <div className="flex justify-between gap-8 mb-6">
        <div className="flex flex-col gap-3 w-full lg:gap-4">
          <label className="text-sm font-medium" htmlFor="state">
            State
          </label>
          <select
            name="state"
            id="state"
            value={values.state}
            onChange={handleChange("state")}
            className="w-full h-11 lg:h-14 lg:w-64 rounded bg-pagination p-3 outline-0 font-light text-sm"
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
            id="city"
            value={values.city}
            onChange={handleChange("city")}
            className="w-full h-11 lg:h-14 lg:w-64 rounded bg-pagination p-3 outline-0 font-light text-sm"
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
          id="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
          className="w-full h-11 lg:h-14 lg:w-64 rounded bg-pagination p-3 outline-0 font-light text-sm"
        />
      </div>

      <div className="text-center my-8">
        <button
          type="button"
          className="bg-transparent outline-0 font-semibold text-green tracking-tight"
        >
          {" "}
          Save changes
        </button>
      </div>
    </form>
  );
}

export default ContactInfo;
