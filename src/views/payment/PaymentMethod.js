import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
import { usePaystackPayment } from "react-paystack";
import { PlaceOrderContext, UserCartDependency } from "../../App";
import { PlaceOrderResponseContext, ChosenMethodContext } from "../../pages/payment";

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
  const [chosenMethodPrice] = useContext(ChosenMethodContext);
  const [paymentType, setPaymentType] = useState("paystack");

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  const config = {
    reference: `paystack_${responseData?.transactionId || Date.now()}`, // Separate Paystack reference
    email: placeOrder.shippingAddress?.email || placeOrder.email || "",
    amount: (placeOrder.amountToPay || 0) * 100,
    metadata: {
      name: `${placeOrder.firstName || ""} ${placeOrder.lastName || ""}`,
      phone: placeOrder.phoneNumber || "",
      transactionId: responseData?.transactionId, // Include your transactionId in metadata
    },
    publicKey: paystackPublicKey,
  };

  const handleChange = (e) => {
    setPaymentType(e.target.value);
  };

  const onSuccess = (reference) => {
    console.log("=== PAYMENT SUCCESS DEBUG ===");
    console.log("Paystack reference:", reference);
    console.log("PlaceOrder context:", placeOrder);
    console.log("Response data:", responseData);
    console.log("Chosen method price:", chosenMethodPrice);

    // Build payload with correct field mapping
    const dataToSend = {
      // Use shippingAddress data as fallback
      carrierName: placeOrder.shippingCarrier || placeOrder.carrierName || "",
      city: placeOrder.shippingAddress?.city || placeOrder.city || "",
      couponCode: placeOrder.couponCode || "",
      deliveryAmount: chosenMethodPrice || placeOrder.deliveryAmount || 0, // Use the actual shipping cost
      deliveryTime: placeOrder.estimatedDelivery || placeOrder.deliveryTime || "",
      email: placeOrder.shippingAddress?.email || placeOrder.email || "",
      firstname: placeOrder.shippingAddress?.firstName || placeOrder.firstName || "",
      lastname: placeOrder.shippingAddress?.lastName || placeOrder.lastName || "",
      message: reference.message || "", // Message from Paystack response
      orderNumber: responseData?.orderNumber || 0,
      paymentStatus: "success", // Paystack onSuccess means success
      phoneNumber: placeOrder.shippingAddress?.phone || placeOrder.phoneNumber || "",
      reference: reference.reference, // Paystack reference
      shippingMethodId: placeOrder.shippingMethodId || 0,
      state: placeOrder.shippingAddress?.state || placeOrder.state || "",
      streetAddress: placeOrder.shippingAddress?.address || placeOrder.streetAddress || "",
      transactionId: responseData?.transactionId, // Use the transaction ID from OrderReview, NOT Paystack reference
      zipCode: placeOrder.shippingAddress?.zipCode || placeOrder.zipCode || "",
    };

    console.log("=== FINAL PAYLOAD TO BACKEND ===");
    console.log(JSON.stringify(dataToSend, null, 2));

    // Validate required fields before sending
    const requiredFields = ['firstname', 'lastname', 'email', 'streetAddress', 'city', 'state', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !dataToSend[field]);

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      alert(`Missing required information: ${missingFields.join(', ')}. Please go back and complete your details.`);
      return;
    }

    // Log additional debugging info
    console.log("=== REQUEST DETAILS ===");
    console.log("URL:", `${baseUrl}/orders/payment`);
    console.log("Method: POST");
    console.log("Headers:", {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken ? accessToken.substring(0, 20) + '...' : 'null'}`,
    });
    console.log("Payload size:", JSON.stringify(dataToSend).length, "bytes");

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

        console.log("=== BACKEND RESPONSE ===");
        console.log("Status:", response.status);
        console.log("Response text:", text);

        if (!response.ok) {
          console.error("Backend error response:", text);

          // Try to parse error details
          let errorDetails = "";
          try {
            const errorData = JSON.parse(text);
            errorDetails = errorData.message || errorData.error || "Unknown error";
          } catch (e) {
            errorDetails = text;
          }

          throw new Error(`Backend error (${response.status}): ${errorDetails}`);
        }
        return JSON.parse(text || "{}");
      })
      .then((data) => {
        console.log("Order completion success:", data);

        // Navigate to success page
        navigate("/payment/successful", {
          state: {
            cartAmount: cart.cartItems.length,
            cartTotal: cart.total,
            orderNo: responseData?.orderNumber,
          },
        });

        // Clean up contexts
        setResponseData(null);
        setCartDep(responseData?.orderNumber);
      })
      .catch((error) => {
        console.error("Payment completion error:", error);
        alert(
          "Payment was successful but there was an error completing the order. Please contact support with this reference: " + reference.reference
        );
      });
  };

  const onClose = () => {
    console.log("Payment modal closed");
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);

    const canProceed = () => {
      const hasPublicKey = !!paystackPublicKey;
      const hasTransactionId = !!responseData?.transactionId;
      const hasAmount = !!(placeOrder.amountToPay && placeOrder.amountToPay > 0);
      const hasEmail = !!(placeOrder.shippingAddress?.email || placeOrder.email);

      return hasPublicKey && hasTransactionId && hasAmount && hasEmail;
    };

    return (
      <div className="w-full md:w-auto">
        <button
          className={`inline-block w-full md:w-48 p-2 rounded outline-0 font-semibold text-white text-sm capitalize transition-colors ${canProceed()
              ? "bg-green hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
            }`}
          onClick={() => {
            if (canProceed()) {
              console.log("=== PAYSTACK CONFIG ===");
              console.log("Config:", config);
              initializePayment(onSuccess, onClose);
            } else {
              console.error("Cannot proceed with payment:", {
                hasPublicKey: !!paystackPublicKey,
                hasTransactionId: !!responseData?.transactionId,
                hasAmount: !!(placeOrder.amountToPay && placeOrder.amountToPay > 0),
                hasEmail: !!(placeOrder.shippingAddress?.email || placeOrder.email),
                config: config,
              });
              alert(
                "Payment configuration error. Please ensure all required information is provided."
              );
            }
          }}
          disabled={!canProceed()}
        >
          complete payment
        </button>

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <h6 className="font-semibold mb-2">Payment Debug:</h6>
            <div className="space-y-1">
              <p>Amount: ₦{placeOrder.amountToPay || 0}</p>
              <p>Email: {placeOrder.shippingAddress?.email || placeOrder.email || 'Missing'}</p>
              <p>Transaction ID: {responseData?.transactionId || 'Missing'}</p>
              <p>Order Number: {responseData?.orderNumber || 'Missing'}</p>
              <p>Can Proceed: {canProceed() ? 'Yes' : 'No'}</p>
            </div>
          </div>
        )}
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
          className="inline-block w-full md:w-48 bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm hover:bg-green hover:text-white transition-colors"
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