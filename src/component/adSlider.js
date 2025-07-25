import React from "react";
import IMAGES from "../assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
  {
    bg: `${IMAGES.adSlider.banner1}`,
    bgSmall: `${IMAGES.adSlider.banner1Small}`,
  },
  {
    bg: `${IMAGES.adSlider.banner2}`,
    bgSmall: `${IMAGES.adSlider.banner2Small}`,
  },
  {
    bg: `${IMAGES.adSlider.banner3}`,
    bgSmall: `${IMAGES.adSlider.banner3Small}`,
  },
  {
    bg: `${IMAGES.adSlider.banner4}`,
    bgSmall: `${IMAGES.adSlider.banner4Small}`,
  },
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-10 h-10 rounded-full bg-[#63BB8298] absolute right-5 top-[45%] cursor-pointer flex justify-center items-center"
      onClick={onClick}
    >
      <i className="bx bxs-chevron-right"></i>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-10 h-10 rounded-full bg-[#63BB8298] absolute z-10 left-5 top-[45%] cursor-pointer flex justify-center items-center"
      onClick={onClick}
    >
      <i className="bx bxs-chevron-left"></i>
    </div>
  );
}

function SliderContent({ image }) {
  return (
    <>
      <div className="h-44 w-full bg-cover bg-center bg-no-repeat rounded md:hidden">
        <img
          src={image.bgSmall}
          alt="banner"
          className="max-w-full max-h-full w-full h-full rounded"
        />
      </div>

      <div className="hidden md:block h-56 w-full bg-cover bg-center bg-no-repeat rounded lg:bg-contain lg:h-64 xl:h-80">
        <img
          src={image.bg}
          alt="banner"
          className="max-w-full max-h-full w-full h-full rounded-md"
        />
      </div>
    </>
  );
}

function AdSlider() {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7000,
    cssEase: "linear",
    arrows: window.screen.availWidth > 600 ? true : false,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "4%",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div
      className="px-4 mb-4 w-full md:w-[90%] md:mx-auto md:p-0 md:mb-8 rounded"
      // style={{ border: "3px solid red" }}
    >
      <Slider {...settings}>
        {items.map((item, index) => {
          return <SliderContent key={index} image={item} />;
        })}
      </Slider>
    </div>
  );
}

export default AdSlider;
