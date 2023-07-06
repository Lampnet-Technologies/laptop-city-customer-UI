import React from "react";
import IMAGES from "../assets";
import LaptopCityButton from "../component/button";
import { Banner, Categories, ProductGroups } from "../component/homepage";

function Hero() {
  return (
    <div className="flex flex-col justify-between gap-12">
      <div className="flex flex-col justify-between gap-6 px-4">
        <h1 className="text-5xl leading-tight font-bold text-hero-heading">
          Best place to shop for all your{" "}
          <span className="text-green">Gadgets</span>
        </h1>
        <p>We ensure maximum satisfaction for all our customers....</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-between gap-2 mt-4"
        >
          <input
            id="searchGadget"
            type="text"
            placeholder="Search for gadgets..."
            className="h-10 rounded p-2 text-xs outline-none w-full border-solid border border-gray-300"
          />
          <LaptopCityButton>search</LaptopCityButton>
        </form>
      </div>

      <div
        className="w-full h-96 bg-contain bg-center bg-no-repeat flex justify-center items-center"
        style={{ backgroundImage: `url(${IMAGES.homepage.heroBg})` }}
      >
        <img
          src={IMAGES.homepage.heroImage1}
          alt="hero-image"
          className="w-10/12 h-80"
        />
      </div>
    </div>
  );
}
function Homepage() {
  return (
    <div className=" my-10">
      <Hero />
      <Banner />
      <Categories />
      <ProductGroups />
    </div>
  );
}

export default Homepage;
