import React from "react";

function EmptyWishlist() {
  return (
    <div className="h-screen text-center flex flex-col justify-center items-center gap-4 px-8 lg:space-y-6">
      <div className="w-60 h-60 rounded-full mb-6 bg-pagination text-green flex justify-center items-center">
        <i className="bx bx-heart" style={{ fontSize: "150px" }}></i>
      </div>

      <p className="text-lg font-normal lg:text-2xl">
        You have not added any product to your wishlist
      </p>

      <p className="text-sm text-gray-400 font-normal lg:text-lg">
        All wishlisted items would be displayed here
      </p>
    </div>
  );
}

export default EmptyWishlist;
