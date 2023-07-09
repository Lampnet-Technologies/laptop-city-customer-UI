import React from "react";

function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-90 backdrop-blur-3xl flex justify-center items-center">
      <div className="relative w-24 h-24 rounded-full border-8 border-solid border-green bg-transparent flex justify-center items-center loader">
        <div className="w-full h-full rounded-full bg-transparent"></div>
        <div
          style={{ top: "-10px" }}
          className="w-10 h-5 absolute bg-black opacity-90 z-50"
        ></div>
      </div>
    </div>
  );
}

export default Loading;
