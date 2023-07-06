import React from "react";

function RenderedCoupons() {
  return (
    <div className="h-screen text-center flex flex-col justify-center items-center gap-4 px-8">
      <div className="w-60 h-60 rounded-full mb-6 bg-pagination text-green flex justify-center items-center">
        <i className="bx bx-gift" style={{ fontSize: "100px" }}></i>
      </div>

      <p className="text-lg font-normal">
        Sorry! You currently have no available coupon
      </p>

      <p className="text-sm text-gray-400 font-normal">
        All available coupon would be displayed here
      </p>
    </div>
  );
}

export default RenderedCoupons;
