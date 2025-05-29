import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlaceOrderContext } from "../../App";

function ShippingAddress({ goTo }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    phone: "",
    countryCode: "+234",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  useEffect(() => {
    setIsLoadingStates(true);
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ country: "Nigeria" }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data && Array.isArray(result.data.states)) {
          const rawStates = result.data.states.map((state) => state.name);
          setStates(rawStates);
        } else {
          console.error("States data missing or malformed:", result);
        }
      })

      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setIsLoadingStates(false));
  }, [location.pathname]);

  useEffect(() => {
    if (values.state && states.includes(values.state)) {
      setIsLoadingCities(true);
      setCities([]);
      setValues((prev) => ({ ...prev, city: "" })); // Reset city selection

      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ country: "Nigeria", state: values.state }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.data && Array.isArray(result.data)) {
            setCities(result.data);
          } else {
            setCities([]);
            console.warn("Cities data missing or malformed:", result);
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setIsLoadingCities(false));
    }
  }, [values.state]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting shipping address:", values);
    console.log("Payload for placeOrder:", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      address: values.address,
      state: values.state.replace(" State", ""),
      city: values.city,
      zipCode: values.zipCode,
      phone: `${values.countryCode}${values.phone}`,
    });

    setPlaceOrder({
      ...placeOrder,
      shippingAddress: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        address: values.address,
        state: values.state,
        city: values.city,
        zipCode: values.zipCode,
        phone: `${values.countryCode}${values.phone}`,
      },
    });

    goTo("shipping-method");
  };

  return (
    <form
      className="space-y-2 md:space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h4 className="font-medium text-lg text-dark-blue md:text-xl lg:text-2xl">
        Shipping Address
      </h4>

      <div className="flex justify-between gap-6 md:gap-11 lg:gap-20">
        <input
          required
          placeholder="First Name"
          name="firstName"
          type="text"
          id="firstName"
          value={values.firstName}
          onChange={handleChange("firstName")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm capitalize"
        />

        <input
          required
          placeholder="Last Name"
          name="lastName"
          type="text"
          id="lastName"
          value={values.lastName}
          onChange={handleChange("lastName")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm capitalize"
        />
      </div>

      <div className="">
        <input
          required
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
          required
          placeholder="Street Address"
          name="address"
          type="text"
          id="address"
          value={values.address}
          onChange={handleChange("address")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      <div className="flex justify-between gap-6  md:gap-11 lg:gap-20">
        {/* <select
          required
          name="state"
          id="state"
          value={values.state}
          onChange={handleChange("state")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        >
          <option value="" disabled>
            {isLoadingStates ? "Loading states..." : "State"}
          </option>
          {states.map((state, i) => (
            <option key={i} value={state}>
              {state.replace(" State", "")}
            </option>
          ))}
        </select> */}
        <select
          required
          name="state"
          id="state"
          value={values.state}
          onChange={handleChange("state")}
          className="..."
        >
          <option value="" disabled>
            {isLoadingStates ? "Loading states..." : "State"}
          </option>
          {states.map((state, i) => (
            <option key={i} value={state}>
              {state.replace(" State", "")}
            </option>
          ))}
        </select>

        <select
          required
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange("city")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        >
          <option value="" disabled>
            {isLoadingCities ? "Loading cities..." : "City"}
          </option>
          {cities.map((city, i) => (
            <option key={i} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between gap-6  md:gap-11 lg:gap-20">
        <input
          placeholder="Zip/Postal Code"
          name="zipCode"
          type="text"
          id="zipCode"
          value={values.zipCode}
          onChange={handleChange("zipCode")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />

        <div className="w-full flex gap-2">
          <select
            name="countryCode"
            value={values.countryCode}
            onChange={handleChange("countryCode")}
            className="w-1/3 h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
          >
            <option value="+234">🇳🇬 +234</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+1">🇺🇸 +1</option>
            {/* Add more country codes as needed */}
          </select>

          <input
            required
            placeholder="Phone Number"
            name="phone"
            type="tel"
            id="phone"
            value={values.phone}
            onChange={handleChange("phone")}
            className="w-2/3 h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
          />
        </div>
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
