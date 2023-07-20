import React from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";
import IMAGES from "../../assets";
import LaptopCityButton from "../../component/button";

function TrackOrder() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/payment/successful");
  };

  return (
    <div className="my-20 p-6 md:w-3/4 lg:w-2/3 md:mx-auto">
      <div
        className="w-full px-3 py-6 rounded-3xl md:p-8 lg:p-10"
        style={{ boxShadow: "0px 3px 6px 0px rgba(18, 29, 60, 0.15)" }}
      >
        <div className="flex justify-between items-center gap-4 border-b border-b-solid border-b-pagination pt-4 pb-6">
          <div className="space-y-2 lg:space-y-4">
            {/* Breadcrumb */}{" "}
            <p className="text-[10px] text-gray-400 font-normal flex items-center gap-2 lg:text-xs">
              Orders <i className="bx bx-chevron-right"></i> ID: 453655643222
            </p>
            <h1 className="text-lg text-gray-700 font-semibold lg:text-2xl">
              Order ID: 453655643222
            </h1>
            <div className="flex items-stretch gap-3 text-[10px] lg:text-xs">
              <p className="text-gray-400 font-normal">
                Order date:{" "}
                <span className="text-gray-800 font-semibold">
                  Feb 16, 2022
                </span>
              </p>
              <div className="h-auto w-0.5 bg-gray-400" />
              <div className="flex items-start gap-2 md:items-center">
                <img
                  src={IMAGES.icons.deliveryTruck}
                  alt="delivery"
                  className="w-4 h-4"
                />
                <p className="text-green font-semibold">
                  Estimated delivery: May 16, 2022
                </p>
              </div>
            </div>
          </div>

          {/* <LaptopCityButton>track order</LaptopCityButton> */}
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
