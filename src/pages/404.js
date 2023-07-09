import React from "react";
import IMAGES from "../assets";
import { Link, useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen fixed top-0 z-50 bg-white">
      <div className="h-full flex flex-col items-center gap-4 text-center">
        <div className="h-3/5">
          <img
            src={IMAGES.err[404]}
            alt="page not found"
            className="max-w-full h-full"
          />
        </div>

        <p className="capitalize text-xl md:text-2xl lg:text-4xl font-semibold ">
          page not found ⚠️
        </p>

        <p className="font-normal md:text-lg lg:text-xl ">
          We couldn&prime;t find the page you are looking for.
        </p>

        <div className="flex justify-center items-center gap-6 my-10">
          <button className="outline-0 capitalize font-medium text-white text-sm md:text-base rounded bg-green py-2 px-4 transition-all duration-300 hover:bg-transparent hover:border-2 hover:border-solid hover:border-green hover:text-black active:border-2 active:border-solid active:border-green active:text-black">
            <Link to="/">Go home</Link>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="outline-0 capitalize font-medium text-white text-sm md:text-base rounded bg-green py-2 px-4 transition-all duration-300 hover:bg-transparent hover:border-2 hover:border-solid hover:border-green hover:text-black active:border-2 active:border-solid active:border-green active:text-black"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
