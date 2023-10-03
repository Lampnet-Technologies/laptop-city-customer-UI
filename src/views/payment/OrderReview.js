import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";
import { CouponDiscount } from "../../App";
import { ChosenMethodContext } from "../../pages/payment";
import { PlaceOrderContext } from "../../App";
import { PaystackButton, usePaystackPayment } from "react-paystack";

// const sumTotal = (a, b, c) => {
//   let sum = a - b + c;

//   return Number(sum.toFixed(2));
// };

function OrderReview({ cart, back }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [discount, setDiscount] = useContext(CouponDiscount);
  const [chosenMethodPrice, setChosenMethodPrice] =
    useContext(ChosenMethodContext);
  const navigate = useNavigate();

  const VAT = "0.00";

  const sumTotal = () => {
    let sum = cart.total - discount + chosenMethodPrice;

    return Number(sum.toFixed(2));
  };

  // const componentProps = {
  //   email: placeOrder.email,
  //   amount: sumTotal * 100,
  //   metadata: {
  //     name: `${placeOrder.firstName} ${placeOrder.lastName}`,
  //     phone: placeOrder.phoneNumber,
  //   },
  //   publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
  //   text: "Pay Now",
  //   onSuccess: () =>
  //     alert("Thanks for doing business with us! Come back soon!!"),
  //   onClose: () => alert("Wait! Don't leave :("),
  // };

  const config = {
    reference: new Date().getTime().toString(),
    email: placeOrder.email,
    amount: sumTotal() * 100,
    metadata: {
      name: `${placeOrder.firstName} ${placeOrder.lastName}`,
      phone: placeOrder.phoneNumber,
    },
    publicKey: "pk_test_e6c202d825e2bbcb0bc287f5d3c0816201b169de",
  };

  const onSuccess = (reference) => {
    console.log(reference);

    navigate("/payment/successful", {
      state: {
        cartAmount: cart.cartItems.length,
        cartTotal: cart.total,
        id: reference.transaction,
      },
    });
  };

  const onClose = () => {
    console.log("closed");
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <button
        className="inline-block w-full bg-green p-4 rounded-md outline-0 font-semibold text-white text-sm"
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Pay <NairaSymbol />
        {sumTotal().toLocaleString()}
      </button>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/payment/successful");
  };

  return (
    // <form className="space-y-4" onSubmit={handleSubmit}>
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
                {discount.toLocaleString()}
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
        >
          {" "}
          Back
        </button>

        {/* <button
          type="submit"
          className="inline-block w-full bg-green p-4 rounded-md outline-0 font-semibold text-white text-sm"
        >
          {" "}
          Pay <NairaSymbol />
          {sumTotal(cart.total, discount, chosenMethodPrice).toLocaleString()}
        </button> */}
        {/* <PaystackButton {...componentProps} /> */}
        <PaystackHookExample />
      </div>
    </div>
    // </form>
  );
}

export default OrderReview;
