import React, { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  ShippingAddress,
  ShippingMethod,
  PaymentMethod,
  OrderReview,
} from "../../views/payment";

function Payment() {
  const [componentToRender, setComponentToRender] =
    useState("shipping-address");

  const nextPage = (text) => {
    setComponentToRender(text);
  };

  const goBack = () => {
    if (componentToRender === "payment-method") {
      return setComponentToRender("shipping-method");
    } else if (componentToRender === "shipping-method") {
      return setComponentToRender("shipping-address");
    }
  };

  const conditions = useMemo(() => {
    if (componentToRender === "shipping-address") {
      return <ShippingAddress goTo={nextPage} />;
    } else if (componentToRender === "shipping-method") {
      return <ShippingMethod goTo={nextPage} back={goBack} />;
    } else if (componentToRender === "payment-method") {
      return <PaymentMethod goTo={nextPage} back={goBack} />;
    } else {
      return <OrderReview />;
    }
  }, [componentToRender]);

  const heading = useMemo(() => {
    if (componentToRender === "shipping-address") {
      return "Where should we send the order?";
    } else if (componentToRender === "shipping-method") {
      return "How should we send the order?";
    } else if (componentToRender === "payment-method") {
      return "Make payment for the order?";
    } else {
      return "Confirm and enjoy your order";
    }
  }, [componentToRender]);

  return (
    <div className="my-20 p-6 space-y-10 md:w-3/4 lg:w-3/5 md:mx-auto md:space-y-14">
      <h3 className="text-2xl font-bold text-dark-blue text-center mb-6 lg:text-[32px] lg:mb-8">
        {heading}
      </h3>

      <div className="flex gap-3 items-center w-4/5 mx-auto mb-5 lg:mb-10">
        Progress
        <div className="w-full h-4 bg-green rounded"></div>
      </div>

      <div
        className="w-full px-4 py-6 rounded-3xl md:p-8 lg:p-10"
        style={{ boxShadow: "0px 3px 6px 0px rgba(18, 29, 60, 0.15)" }}
      >
        {/* <Outlet /> */}

        {conditions}
      </div>
    </div>
  );
}

export default Payment;
