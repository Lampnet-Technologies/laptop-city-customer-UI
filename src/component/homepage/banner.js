import React, { useEffect, useState } from "react";
import IMAGES from "../../assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
  {
    name: "24/hr Customer Service",
    img: `${IMAGES.icons.customerService}`,
  },
  {
    name: "Quality",
    img: `${IMAGES.icons.quality}`,
  },
  {
    name: "Cash on Delivery",
    img: `${IMAGES.icons.cashOnDelivery}`,
  },
  {
    name: "Hassle-Free Warranty",
    img: `${IMAGES.icons.warranty}`,
  },
  {
    name: "Fast Free Shipping",
    img: `${IMAGES.icons.freeShipping}`,
  },
];

function BannerContent({ name, img }) {
  return (
    <div className="w-full justify-center flex items-center gap-4">
      <p className="lg:text-lg">{name}</p>
      <div className="flex justify-center items-center w-5 h-5">
        <img className="max-w-full max-h-5 " src={img} alt="" />
      </div>
    </div>
  );
}

function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: window.screen.availWidth > 800 ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div className="bg-[#DAE3EA] font-medium text-banner-text p-4 w-full">
      <Slider {...settings}>
        {items.map((item, index) => {
          return <BannerContent key={index} name={item.name} img={item.img} />;
        })}
      </Slider>
    </div>
  );
}

export default Banner;
