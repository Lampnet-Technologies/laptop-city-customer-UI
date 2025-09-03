import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
import { usePaystackPayment } from "react-paystack";
import { PlaceOrderContext, UserCartDependency } from "../../App";
import { PlaceOrderResponseContext } from "../../pages/payment";

const methods = [
  { name: "paystack", logo: `${IMAGES.payment.paystack}`, disabled: false },
];

// Environment variables
const baseUrl = process.env.REACT_APP_BASE_URL;
const paystackPublicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

if (!baseUrl) {
  console.error("REACT_APP_BASE_URL is not defined in environment variables");
}
if (!paystackPublicKey) {
  console.error("REACT_APP_PAYSTACK_PUBLIC_KEY is not defined in environment variables");
}

function PaymentMethod({ cart, goTo, back }) {
  const [placeOrder] = useContext(PlaceOrderContext);
  const [responseData, setResponseData] = useContext(PlaceOrderResponseContext);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [paymentType, setPaymentType] = useState("paystack");

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  const config = {
    reference: responseData?.transactionId || `ref_${Date.now()}`,
    email: placeOrder.shippingAddress?.email || placeOrder.email || "",
    amount: (placeOrder.amountToPay || 0) * 100,
    metadata: {
      name: `${placeOrder.firstName || ""} ${placeOrder.lastName || ""}`,
      phone: placeOrder.phoneNumber || "",
    },
    publicKey: paystackPublicKey,
  };

  const handleChange = (e) => {
    setPaymentType(e.target.value);
  };

  const onSuccess = (reference) => {
    // Build payload exactly as backend expects
    const dataToSend = {
      carrierName: placeOrder.carrierName || "",
      city: placeOrder.city || "",
      couponCode: placeOrder.couponCode || "",
      deliveryAmount: placeOrder.deliveryAmount || 0,
      deliveryTime: placeOrder.deliveryTime || "",
      email: placeOrder.email || "",
      firstname: placeOrder.firstName || "",
      lastname: placeOrder.lastName || "",
      message: "", // no message from Paystack
      orderNumber: responseData?.orderNumber || 0,
      paymentStatus: "success", // Paystack onSuccess means success
      phoneNumber: placeOrder.phoneNumber || "",
      reference: reference.reference, // Paystack reference
      shippingMethodId: placeOrder.shippingMethodId || 0,
      state: placeOrder.state || "",
      streetAddress: placeOrder.streetAddress || "",
      transactionId: reference.reference, // same as reference unless backend expects transaction field
      zipCode: placeOrder.zipCode || "",
    };

    console.log("Payment successful, sending data to backend:", dataToSend);

    fetch(`${baseUrl}/orders/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then(async (response) => {
        const text = await response.text(); // read body for error logging
        if (!response.ok) {
          console.error("Backend error response:", text);
          throw new Error(`Network response failed: ${response.status} - ${text}`);
        }
        return JSON.parse(text || "{}");
      })
      .then((data) => {
        console.log("Order completion success:", data);
        navigate("/payment/successful", {
          state: {
            cartAmount: cart.cartItems.length,
            cartTotal: cart.total,
            orderNo: responseData?.orderNumber,
          },
        });
        setResponseData(null);
        setCartDep(responseData?.orderNumber);
      })
      .catch((error) => {
        console.error("Payment completion error:", error);
        alert(
          "Payment was successful but there was an error completing the order. Please contact support."
        );
      });
  };

  const onClose = () => {
    console.log("Payment modal closed");
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);

    const canProceed =
      paystackPublicKey && responseData?.transactionId && placeOrder.amountToPay;

    return (
      <div className="w-full md:w-auto">
        <button
          className={`inline-block w-full md:w-48 p-2 rounded outline-0 font-semibold text-white text-sm capitalize ${
            canProceed
              ? "bg-green hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => {
            if (canProceed) {
              initializePayment(onSuccess, onClose);
            } else {
              console.error("Cannot proceed with payment:", {
                hasPublicKey: !!paystackPublicKey,
                hasTransactionId: !!responseData?.transactionId,
                hasAmount: !!placeOrder.amountToPay,
              });
              alert(
                "Payment configuration error. Please try again or contact support."
              );
            }
          }}
          disabled={!canProceed}
        >
          complete payment
        </button>
      </div>
    );
  };

  if (!baseUrl || !paystackPublicKey) {
    return (
      <div className="space-y-4 md:space-y-4 lg:space-y-6">
        <h4 className="mb:5 font-medium text-lg text-red-600 md:text-xl lg:text-2xl lg:mb-10">
          Configuration Error
        </h4>
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-700">
            Payment system is not properly configured. Please contact support.
          </p>
          <p className="text-sm text-red-600 mt-2">
            Missing: {!baseUrl && "BASE_URL"}{" "}
            {!paystackPublicKey && "PAYSTACK_PUBLIC_KEY"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-4 lg:space-y-6">
      <h4 className="mb:5 font-medium text-lg text-dark-blue md:text-xl lg:text-2xl lg:mb-10">
        Payment Method
      </h4>

      {methods.map((method, index) => (
        <div className="flex items-start gap-5 lg:gap-8" key={index}>
          <div className="mt-0.5 md:mt-1">
            <input
              className="accent-green md:w-5 md:h-5"
              type="radio"
              name="paymentMethod"
              value={method.name}
              id={method.name}
              checked={paymentType === method.name}
              onChange={handleChange}
              disabled={method.disabled}
            />
          </div>

          <div className={`${method.disabled && "opacity-25"}`}>
            <label htmlFor={method.name}>
              <div className="lg:space-y-2">
                <p className="font-medium lg:text-lg capitalize">
                  {method.name}
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
      ))}

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
          Back
        </button>

        <PaystackHookExample />
      </div>
    </div>
  );
}

export default PaymentMethod;
