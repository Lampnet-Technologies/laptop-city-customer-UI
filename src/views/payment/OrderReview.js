import React, { useContext, useState } from "react";
import NairaSymbol from "../../component/nairaSymbol";
import { CouponDiscount } from "../../App";
import {
  ChosenMethodContext,
  PlaceOrderResponseContext,
} from "../../pages/payment";
import { PlaceOrderContext } from "../../App";

const accessToken = localStorage.getItem("token");

function OrderReview({ cart, back, goTo }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [discount, setDiscount] = useContext(CouponDiscount);
  const [chosenMethodPrice, setChosenMethodPrice] =
    useContext(ChosenMethodContext);
  const [responseData, setResponseData] = useContext(PlaceOrderResponseContext); // State variable to store response data
  const [isLoading, setIsLoading] = useState(false);

  const VAT = "0.00";

  const sumTotal = () => {
    let sum = cart.total - discount + chosenMethodPrice;

    return Number(sum.toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://apps-1.lampnets.com/ecommb-staging/orders/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
        setPlaceOrder({ ...placeOrder, amountToPay: sumTotal() });
        goTo("payment-method");
      } else {
        console.error("Fetch request failed");
      }
    } catch (error) {
      console.error("Error occurred during fetch request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl lg:px-6 lg:py-4">
        <h4 className="font-medium text-lg text-gray-700 lg:text-xl">
          Order Review
        </h4>

        <div className="flex justify-between items-center gap-2 text-sm font-normal lg:text-base">
          <p>
            {cart.cartItems.length} item{cart.cartItems.length > 1 ? "s" : null}{" "}
            in Order
          </p>
          <p>
            <NairaSymbol />
            {cart.total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl lg:px-6 lg:py-4">
        <h4 className="font-medium text-lg text-gray-700 lg:text-xl">
          Order Review
        </h4>

        <table className="w-full text-sm font-normal lg:text-base">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td className="text-right">
                <NairaSymbol />
                {cart.total.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>Discount</td>
              <td className="text-right">
                <NairaSymbol />
                {discount.toFixed(2).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td className="text-right">
                <NairaSymbol />
                {chosenMethodPrice.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>VAT</td>
              <td className="text-right">
                <NairaSymbol />
                {VAT}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t border-t-solid border-t-gray-200">
              <td colSpan={2} style={{ height: "10px" }}></td>
            </tr>
            <tr className="font-semibold">
              <td>Total</td>
              <td className="text-right">
                <NairaSymbol />
                {sumTotal().toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        className="flex justify-between gap-6 lg:gap-8 md:justify-around lg:justify-end"
        style={{ marginBlock: "2.5rem 1rem" }}
      >
        <button
          className="inline-block w-full bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm"
          onClick={back}
          disabled={isLoading}
        >
          {" "}
          Back
        </button>

        <button
          type="submit"
          className="inline-block w-full bg-green p-4 rounded-md outline-0 font-semibold text-white text-sm"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Pay <NairaSymbol />
          {sumTotal().toLocaleString()}
        </button>
      </div>
    </div>
  );
}

export default OrderReview;
