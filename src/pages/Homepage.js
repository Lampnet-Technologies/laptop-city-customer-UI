import React, { useState } from "react";
import IMAGES from "../assets";
import LaptopCityButton from "../component/button";
import { Banner, Categories, ProductGroups } from "../component/homepage";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const showSearchResult = (searchTerm) => {
    const encoded = encodeURI(searchTerm);

    navigate(
      "/products"
      // {
      //   state: {
      //     fetchURL: `https://apps-1.lampnets.com/ecommb-staging/products/search?pageNo=0&pageSize=12&query=${encoded}&sortBy=id&sortDir=asc`,
      //   },
      // }
    );
  };

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
          onSubmit={(e) => {
            e.preventDefault();
            showSearchResult(searchTerm);
          }}
          className="flex justify-between gap-5 mt-4 md:w-fit"
        >
          <div className="h-10 rounded p-3 lg:px-4 lg:h-auto lg:w-80 flex w-full justify-between items-center gap-8 border-solid border-2 border-[#BBC8D4]">
            <i className="bx bx-search bx-sm text-[#94A3B1]"></i>
            <input
              id="searchGadget"
              type="text"
              placeholder="Search for gadgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-[#BBC8D4] inline-block h-full text-xs md:text-sm lg:text-base lg:font-semibold outline-none w-full"
            />
          </div>
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
    <div className="my-14 md:my-16 lg:mt-0 ">
      <Hero />
      <Banner />
      <Categories />
      <ProductGroups />

      {/* <div className="bg-yellow-200 p-6 space-x-6 whitespace-nowrap overflow-scroll">
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
      </div> */}
    </div>
  );
}

export default Homepage;
