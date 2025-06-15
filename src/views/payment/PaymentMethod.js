import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
import { usePaystackPayment } from "react-paystack";
import { PlaceOrderContext, UserCartDependency } from "../../App";
import { PlaceOrderResponseContext } from "../../pages/payment";

const methods = [
  {
    name: "pay on delivery",
    logo: `${IMAGES.payment.payOnDelivery}`,
    disabled: true,
  },
  { name: "paystack", logo: `${IMAGES.payment.paystack}`, disabled: false },
  {
    name: "flutterwave",
    logo: `${IMAGES.payment.flutterwave}`,
    disabled: true,
  },
];

const accessToken = localStorage.getItem("token");

function PaymentMethod({ cart, goTo, back }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [responseData, setResponseData] = useContext(PlaceOrderResponseContext); // State variable to store response data
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [paymentType, setPaymentType] = useState("paystack");

  const navigate = useNavigate();

  const config = {
    reference: responseData.transactionId,
    email: placeOrder.shippingAddress?.email || "",
    amount: placeOrder.amountToPay * 100,
    metadata: {
      name: `${placeOrder.firstName} ${placeOrder.lastName}`,
      phone: placeOrder.phoneNumber,
    },
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  };

  const handleChange = (e) => {
    setPaymentType(e.target.value);
  };

  const onSuccess = (reference) => {
    const dataToSend = {
      ...placeOrder,
      transactionId: responseData.transactionId,
      orderNumber: responseData.orderNumber,
      message: reference.message,
      paymentStatus: reference.status,
      reference: reference.reference,
    };

    fetch("https://apps-1.lampnets.com/ecommb-staging/orders/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/payment/successful", {
            state: {
              cartAmount: cart.cartItems.length,
              cartTotal: cart.total,
              orderNo: responseData.orderNumber,
            },
          });
          setResponseData(null);
          setCartDep(responseData.orderNumber);
        } else {
          throw new Error("Network response was failed.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClose = () => {
    console.log("closed");
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div className="w-full md:w-auto">
        <button
          className="inline-block w-full md:w-48 bg-green p-2 rounded outline-0 font-semibold text-white text-sm capitalize"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          complete payment
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-4 lg:space-y-6">
      <h4 className="mb:5 font-medium text-lg text-dark-blue md:text-xl lg:text-2xl lg:mb-10">
        Payment Method
      </h4>

      {methods &&
        methods.map((method, index) => {
          return (
            <div className="flex items-start gap-5 lg:gap-8" key={index}>
              <div className="mt-0.5 md:mt-1">
                <input
                  className="accent-green md:w-5 md:h-5"
                  type="radio"
                  name="paymentMethod"
                  value={method.name}
                  id={method.name}
                  checked={paymentType == method.name}
                  onChange={handleChange}
                  disabled={method.disabled}
                />
              </div>

              <div className={`${method.disabled && "opacity-25"}`}>
                <label htmlFor={method.name}>
                  <div className="lg:space-y-2">
                    <p className="font-medium lg:text-lg capitalize">
                      {method.name}{" "}
                    </p>

                    <div className="max-w-[100px] h-10 lg:max-w-[200px] lg:h-12 flex justify-center items-center">
                      <img
                        src={method.logo}
                        alt={`${method.name} logo`}
                        className="max-w-full w-full max-h-full"
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          );
        })}

      <p
        className="text-sm font-normal lg:text-lg"
        style={{ marginTop: "2rem" }}
      >
        By Clicking *<span className="font-medium">Complete Payment</span>* I
        agree to company terms of services
      </p>

      <div
        className="flex justify-between gap-6 lg:gap-8 md:justify-end"
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

        <PaystackHookExample />
      </div>
    </div>
  );
}

export default PaymentMethod;
