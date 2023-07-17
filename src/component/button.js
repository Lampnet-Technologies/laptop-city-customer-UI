import React from "react";

function LaptopCityButton(props) {
  return (
    <button
      className="capitalize font-medium text-white text-sm lg:text-base md:font-semibold md:px-6 lg:py-3 lg:px-10 rounded bg-green py-2 px-4 hover:bg-dark-green"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default LaptopCityButton;
