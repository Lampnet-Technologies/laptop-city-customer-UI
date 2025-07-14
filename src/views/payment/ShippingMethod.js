import React, { useContext, useEffect, useState } from "react";
import NairaSymbol from "../../component/nairaSymbol";
import { PlaceOrderContext } from "../../App";
import { ChosenMethodContext } from "../../pages/payment";

function ShippingMethod({ goTo, back }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [chosenMethodPrice, setChosenMethodPrice] =
    useContext(ChosenMethodContext);
  const [methods, setMethods] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setError("Access token not found.");
      setLoading(false);
      return;
    }
    

    fetch("https://apps-1.lampnets.com/ecommb-staging/shipping/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },

      body: JSON.stringify({
        address: placeOrder.shippingAddress.address,
        city: placeOrder.shippingAddress.city,
        email: placeOrder.shippingAddress.email,
        firstName: placeOrder.shippingAddress.firstName,
        lastName: placeOrder.shippingAddress.lastName,
        phone: placeOrder.shippingAddress.phone,
        state: placeOrder.shippingAddress.state.replace(" State", ""),
        zipCode: placeOrder.shippingAddress.zipCode,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          console.error("Backend error:", data);
          setError(data?.message || "Something went wrong");
          return;
        }

        if (Array.isArray(data)) {
          const cleanedMethods = data.map((method) => ({
            id: method.id,
            amount: method.amount,
            carrier_name: method.carrier_name,
            delivery_time: method.delivery_time,
          }));
          setMethods(cleanedMethods);
          if (cleanedMethods.length > 0) {
            setShippingMethod(cleanedMethods[0].id);
          }
        } else {
          console.error("Expected array, got:", data);
          setError("Unexpected response format.");
        }
      })
      .catch((error) => {
        console.error("Error fetching shipping methods:", error);
        setError("Failed to fetch shipping methods.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [placeOrder]);

  const handleChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedMethod = methods.find(
      (method) => method.id === shippingMethod
    );
    if (selectedMethod) {
      setChosenMethodPrice(selectedMethod.amount);
      setPlaceOrder({ ...placeOrder, shippingMethodId: shippingMethod });
      goTo("order-review");
    }
  };

  return (
    <form
      className="space-y-4 md:space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h4 className="font-medium text-lg text-dark-blue md:text-xl lg:text-2xl">
        Shipping Method
      </h4>

      {loading ? (
        <p>Loading shipping methods...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : methods.length === 0 ? (
        <p>No shipping methods available.</p>
      ) : (
        methods.map((method) => (
          <div className="flex items-start gap-4 lg:gap-6" key={method.id}>
            <div className="mt-0.5 md:mt-1">
              <input
                className="accent-green md:w-5 md:h-5"
                type="radio"
                name="shippingMethods"
                value={method.id}
                id={`shipping-${method.id}`}
                checked={shippingMethod === method.id}
                onChange={handleChange}
              />
            </div>

            <label htmlFor={`shipping-${method.id}`}>
              <div className="lg:space-y-2">
                <p className="font-medium lg:text-lg">
                  <span className="font-semibold">
                    <NairaSymbol />
                    {parseFloat(method.amount || 0).toFixed(2)}
                  </span>{" "}
                  {method.carrier_name}
                </p>
                <p className="font-normal text-sm lg:text-base capitalize">
                  (Delivery: {method.delivery_time})
                </p>
              </div>
            </label>
          </div>
        ))
      )}

      <div
        className="flex justify-between gap-6 lg:gap-8 md:justify-around lg:justify-end"
        style={{ marginBlock: "2.5rem 1rem" }}
      >
        <button
          type="button"
          className="inline-block w-full md:w-48 bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm"
          onClick={back}
          disabled={loading}
        >
          Back
        </button>

        <button
          type="submit"
          className="inline-block w-full md:w-48 bg-green p-2 rounded outline-0 font-semibold text-white text-sm"
          disabled={loading || !shippingMethod}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default ShippingMethod;
