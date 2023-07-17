import React from "react";
import IMAGES from "../assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
  {
    bg: `${IMAGES.adSlider.ad1}`,
  },
  {
    bg: `${IMAGES.adSlider.ad2}`,
  },
  {
    bg: `${IMAGES.adSlider.ad3}`,
  },
  {
    bg: `${IMAGES.adSlider.ad4}`,
  },
];

function SliderContent({ bg }) {
  return (
    <div
      className="h-44 w-full bg-cover bg-center bg-no-repeat rounded md:h-60 lg:h-80"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${bg})`,
      }}
    ></div>
  );
}

function AdSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7000,
    cssEase: "linear",
    arrows: window.screen.availWidth > 800 ? true : false,
    pauseOnHover: true,
  };

  return (
    <div className="p-4 w-full md:p-0 md:mb-8">
      <Slider {...settings}>
        {items.map((item, index) => {
          return <SliderContent key={index} bg={item.bg} />;
        })}
      </Slider>
    </div>
  );
}

export default AdSlider;
