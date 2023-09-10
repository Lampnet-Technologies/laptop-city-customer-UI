import React, { useContext, useEffect, useState } from "react";
import NairaSymbol from "../../component/nairaSymbol";
import { PlaceOrderContext } from "../../App";

const deliveryMethods = [
  {
    radioValue: "company",
    method: "GIG",
    price: 2499.99,
    tag: "GIG Express with Tracking",
    time: "24 hours",
  },

  {
    radioValue: "regular",
    method: "Kwik",
    price: 1099.99,
    tag: "Kwik Premium with Tracking",
    time: "1-2 days",
  },
];

function ShippingMethod({ goTo, back }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [methods, setMethods] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("company");

  // ** Use below when there's an available shipping methods in the backend
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("token");

  //   fetch("https://apps-1.lampnets.com/ecommb-staging/shipping-methods", {
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setMethods(result)
  //     })
  //     .catch((error) => {
  //       console.error();
  //     });
  // }, []);

  const handleChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    goTo("order-review");
  };

  return (
    <form
      className="space-y-4 md:space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h4 className="font-medium text-lg text-dark-blue md:text-xl lg:text-2xl">
        Shipping Method
      </h4>

      {deliveryMethods.map((method, index) => {
        return (
          <div className="flex items-start gap-3" key={index}>
            <div>
              <input
                className="accent-green"
                type="radio"
                name="shippingMethods"
                value={method.radioValue}
                id={method.radioValue}
                checked={shippingMethod === method.radioValue}
                onChange={handleChange}
              />
            </div>

            <label htmlFor={method.radioValue}>
              <div className="lg:space-y-2">
                <p className="font-normal lg:text-lg">
                  <span className="font-medium">
                    <NairaSymbol />
                    {method.price}
                  </span>{" "}
                  {method.method}{" "}
                </p>
                <p className="font-normal text-sm lg:text-base">{method.tag}</p>
                <p className="font-normal text-sm lg:text-base capitalize">
                  (Within {method.time})
                </p>
              </div>
            </label>
          </div>
        );
      })}

      <div
        className="flex justify-between gap-6 lg:gap-8 md:justify-around lg:justify-end"
        style={{ marginBlock: "2.5rem 1rem" }}
      >
        <button
          type="button"
          className="inline-block w-full md:w-48 bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm"
          onClick={back}
        >
          {" "}
          Back
        </button>

        <button
          type="submit"
          className="inline-block w-full md:w-48 bg-green p-2 rounded outline-0 font-semibold text-white text-sm"
        >
          {" "}
          Next
        </button>
      </div>
    </form>
  );
}

export default ShippingMethod;
