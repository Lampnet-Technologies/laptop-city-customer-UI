import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ShippingAddress({ goTo }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    state: "",
    city: "",
    postal: "",
    phoneNumber: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();
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

    goTo("shipping-method");
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <h4 className="font-medium text-lg text-dark-blue ">Shipping Address</h4>

      <div className="flex justify-between gap-6 ">
        <input
          placeholder="First Name"
          name="firstName"
          type="text"
          id="firstName"
          value={values.firstName}
          onChange={handleChange("firstName")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />

        <input
          placeholder="Last Name"
          name="lastName"
          type="text"
          id="lastName"
          value={values.lastName}
          onChange={handleChange("lastName")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      <div className="">
        <input
          placeholder="Email"
          name="email"
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange("email")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      <div className="">
        <input
          placeholder="Street Address"
          name="streetAddress"
          type="text"
          id="streetAddress"
          value={values.streetAddress}
          onChange={handleChange("streetAddress")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      <div className="flex justify-between gap-6 ">
        <select
          placeholder="State"
          name="state"
          id="state"
          value={values.state}
          onChange={handleChange("state")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        >
          <option value="" disabled>
            State
          </option>
          {states.length > 0 &&
            states.map((state, i) => {
              return (
                <option key={i} value={state.name}>
                  {state.name}
                </option>
              );
            })}
        </select>

        <select
          placeholder="City"
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange("city")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        >
          <option value="" disabled>
            City
          </option>
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

      <div className="flex justify-between gap-6 ">
        <input
          placeholder="Zip/Postal Code"
          name="postal"
          type="text"
          id="postal"
          value={values.postal}
          onChange={handleChange("postal")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />

        <input
          placeholder="Phone Number"
          name="phoneNumber"
          type="tel"
          id="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      <button
        type="submit"
        className="inline-block w-full bg-green my-6 p-4 rounded outline-0 font-semibold text-white text-sm"
        style={{ marginTop: "2.5rem" }}
        // onClick={() => navigate("/payment/shipping-method")}
      >
        {" "}
        Next
      </button>
    </form>
  );
}

export default ShippingAddress;
