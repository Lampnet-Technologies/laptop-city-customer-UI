import React, { useContext, useEffect, useState } from "react";
import NairaSymbol from "../../component/nairaSymbol";
import { PlaceOrderContext } from "../../App";
import { ChosenMethodContext } from "../../pages/payment";

function ShippingMethod({ goTo, back }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [chosenMethodPrice, setChosenMethodPrice] =
    useContext(ChosenMethodContext);
  const [methods, setMethods] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    fetch("https://apps-1.lampnets.com/ecommb-staging/shipping-methods", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setMethods(result);
        setShippingMethod(result[0].id);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  const handleChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setShippingMethod(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    methods.forEach((method) => {
      if (method.id == shippingMethod) {
        setChosenMethodPrice(method.price);
      }
    });

    setPlaceOrder({ ...placeOrder, shippingMethodId: shippingMethod });

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

      {methods &&
        methods.map((method) => {
          return (
            <div className="flex items-start gap-4 lg:gap-6" key={method.id}>
              <div className="mt-0.5 md:mt-1">
                <input
                  className="accent-green md:w-5 md:h-5"
                  type="radio"
                  name="shippingMethods"
                  value={method.id}
                  id={method.name}
                  checked={shippingMethod == method.id}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor={method.name}>
                <div className="lg:space-y-2">
                  <p className="font-medium lg:text-lg">
                    <span className="font-semibold">
                      <NairaSymbol />
                      {method.price.toFixed(2)}
                    </span>{" "}
                    {method.name}{" "}
                  </p>
                  <p className="font-normal text-sm lg:text-base">
                    {method.description}
                  </p>
                  <p className="font-normal text-sm lg:text-base capitalize">
                    (Within {method.timeRange})
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
