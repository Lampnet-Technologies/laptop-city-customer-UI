import React, { useState, useEffect, useContext } from "react";
import IMAGES from "../../assets";
import NairaSymbol from "../../component/nairaSymbol";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";

function OrderSuccessful() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  });

  return (
    <div className="my-20 p-6 md:w-3/4 lg:w-1/2 md:mx-auto">
      <div
        className="w-full px-3 py-6 rounded-3xl flex flex-col items-center text-center gap-4 lg:gap-6 md:p-8 lg:p-10"
        style={{ boxShadow: "0px 3px 6px 0px rgba(18, 29, 60, 0.15)" }}
      >
        <div className="lg:w-[120px] lg:h-[120px] flex justify-center items-center">
          <img
            src={IMAGES.icons.checkSuccessful}
            alt="successful"
            className="lg:max-w-full lg:max-h-full"
          />
        </div>

        <h4 className="font-medium text-lg text-dark-blue md:text-xl lg:text-3xl">
          Order Successful
        </h4>

        <p className="font-normal lg:w-11/12 lg:mx-auto lg:text-lg">
          Your Laptop order{" "}
          <Link to="/my-orders" className="underline text-green">
            LCT9876
          </Link>{" "}
          has successfully been placed. You will receive a shipping confirmation
          email as soon as your order ships. You can get store credit coupons
          after referral.
        </p>

        <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl self-start w-full text-left lg:px-6 lg:py-4">
          <h4 className="font-medium text-lg text-gray-700 lg:text-xl">
            Order Review
          </h4>

          <div className="flex justify-between items-center gap-2 text-sm font-normal lg:text-base">
            <p>1 item in Cart</p>
            <p>
              <NairaSymbol />
              350,000.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessful;
