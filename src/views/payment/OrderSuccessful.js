import React from "react";
import IMAGES from "../../assets";
import NairaSymbol from "../../component/nairaSymbol";
import { Link } from "react-router-dom";

function OrderSuccessful() {
  return (
    <div className="my-20 p-6">
      <div
        className="w-full px-3 py-6 rounded-3xl flex flex-col items-center text-center gap-4"
        style={{ boxShadow: "0px 3px 6px 0px rgba(18, 29, 60, 0.15)" }}
      >
        <div>
          <img src={IMAGES.icons.checkSuccessful} alt="successful" />
        </div>

        <h4 className="font-medium text-lg text-dark-blue ">
          Order Successful
        </h4>

        <p className="font-normal">
          Your Laptop order{" "}
          <Link to="" className="underline text-gray-950">
            LCT9876
          </Link>{" "}
          has successfully been placed. You will receive a shipping confirmation
          email as soon as your order ships. You can get store a shipping
          confirmation email as soon as your order ships.
        </p>

        <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl self-start w-full text-left">
          <h4 className="font-medium text-lg text-gray-700 ">Order Review</h4>

          <div className="flex justify-between items-center gap-2 text-sm font-normal">
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
