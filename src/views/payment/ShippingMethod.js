import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

const deliveryMethods = [
  {
    radioValue: "company",
    method: "GIG",
    price: 1400,
    tag: "GIG Express with Tracking",
    time: "24",
  },

  {
    radioValue: "regular",
    method: "Danfo",
    price: 600,
    tag: "Danfo Premium with Tracking",
    time: "24",
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

    goTo("payment-method");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h4 className="font-medium text-lg text-dark-blue ">Shipping Method</h4>

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
              <div>
                <p className="font-normal">
                  <span className="font-medium">
                    <NairaSymbol />
                    {method.price}
                  </span>{" "}
                  {method.method}{" "}
                </p>
                <p className="font-normal text-sm">{method.tag}</p>
                <p className="font-normal text-sm">
                  (Within {method.time} Hours)
                </p>
              </div>
            </label>
          </div>
        );
      })}

      <div
        className="flex justify-between gap-6"
        style={{ marginBlock: "2.5rem 1rem" }}
      >
        <button
          type="button"
          className="inline-block w-full bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm"
          // onClick={() => navigate(-1)}
          onClick={back}
        >
          {" "}
          Back
        </button>

        <button
          type="submit"
          className="inline-block w-full bg-green p-2 rounded outline-0 font-semibold text-white text-sm"
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
