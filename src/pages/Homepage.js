import React from "react";
import IMAGES from "../assets";
import LaptopCityButton from "../component/button";
import { Banner, Categories, ProductGroups } from "../component/homepage";

function Hero() {
  return (
    <div className="flex flex-col justify-between gap-12 md:flex-row md:pl-12 lg:pl-24 lg:gap-0 lg:items-center">
      <div className="w-full flex flex-col justify-between gap-6 px-4 md:px-0 md:justify-start">
        <h1 className="text-5xl lg:text-6xl leading-tight lg:leading-[100px] font-bold text-hero-heading">
          Best place to shop for all your{" "}
          <span className="text-green">Gadgets</span>
        </h1>
        <p className="lg:text-[22px]">
          We ensure maximum satisfaction for all our customers....
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-between gap-2 mt-4 md:w-fit"
        >
          <input
            id="searchGadget"
            type="text"
            placeholder="Search for gadgets..."
            className="inline-block h-10 rounded p-2 text-xs outline-none w-full border-solid border border-gray-300 lg:w-80 lg:h-12"
          />
          <LaptopCityButton>search</LaptopCityButton>
        </form>
      </div>

      <div
        className="w-full h-96 bg-contain bg-top bg-no-repeat flex justify-center items-center md:bg-cover lg:h-[600px]"
        style={{
          backgroundImage: `url(${IMAGES.homepage.heroBg})`,
        }}
      >
        <img
          src={IMAGES.homepage.heroImage}
          alt="hero-image"
          className="max-w-10/12 h-4/5"
        />
      </div>
    </div>
  );
}
function Homepage() {
  return (
    <div className=" my-10 md:my-16 ">
      <Hero />
      <Banner />
      <Categories />
      <ProductGroups />
    </div>
  );
}

export default Homepage;
