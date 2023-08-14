import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

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
  const [shippingMethod, setShippingMethod] = useState("company");

  const navigate = useNavigate();

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
          // onClick={() => navigate(-1)}
          onClick={back}
        >
          {" "}
          Back
        </button>

        <button
          type="submit"
          className="inline-block w-full md:w-48 bg-green p-2 rounded outline-0 font-semibold text-white text-sm"
          // onClick={() => navigate("/payment/payment-method")}
        >
          {" "}
          Next
        </button>
      </div>
    </form>
  );
}

export default ShippingMethod;
