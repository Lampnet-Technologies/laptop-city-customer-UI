import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
import LaptopCityButton from "../../component/button";
import { Banner } from "../../component/homepage";
import { Groups } from "../../component/homepage/productGroups";
import NairaSymbol from "../../component/nairaSymbol";
import { LoginContext } from "../../App";

const images = [
  {
    image: `${IMAGES.productDesc.productMain}`,
  },
  {
    image: `${IMAGES.productDesc.productSide}`,
  },
  {
    image: `${IMAGES.productDesc.productBack}`,
  },
];

const example = `The smartphone is powered by a Mediatek Helio G96 Octa-core processor and Mali-G57 MC2 GPU. It comes in a big screen that has a 6.95 inches display IPS LCD capacitive touchscreen with a resolution of 1080 x 2460 pixels.

The phone supports Dual SIM (Nano-SIM, dual stand-by). Infinix Note 11 Pro features quad camera that consists of 64 MP (wide) + 13 MP (telephoto) + 2 MP (depth) with Quad-LED flash, panorama, and HDR.

The front camera consists of a single camera: 16 MP (wide) and the device is integrated with a loudspeaker and a 3.5mm jack. The smartphone features Bluetooth 5.0, GPS with A-GPS, Radio, and USB Type-C 2.0, USB On-The-Go. The sensors include Fingerprint (side-mounted), accelerometer, gyro, proximity, and compass.

DISPLAY
Type: IPS LCD, 120Hz
Size: 6.95 inches, 114.7 cm2 (~84.5% screen-to-body ratio)
Resolution: 1080 x 2460 pixels (~387 ppi density)

PLATFORM
OS: Android 11, XOS 8
Chipset: Mediatek Helio G96 (12 nm)
CPU: Octa-core (2x2.05 GHz Cortex-A76 & 6x2.0 GHz Cortex-A55)
GPU: Mali-G57 MC2

MEMORY
Card slot: microSDXC (dedicated slot)
Internal: 128GB 8GB RAM
UFS 2.2

MAIN CAMERA - Triple
64 MP, f/1.7, (wide), 1/1.72", 0.8µm, PDAF
13 MP, f/2.5, (telephoto), 1/3.1", 1.12µm, AF
2 MP, f/2.4, (depth)
Features: Quad-LED flash, HDR, panorama
Video: 1440p@30fps

SELFIE CAMERA - Single
16 MP
Video: 1080p@30fps

SOUND
Loudspeaker: Yes, with dual speakers
3.5mm jack: Yes

COMMS
WLAN: Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot
Bluetooth: 5.0, A2DP, LE
GPS: Yes, with A-GPS
NFC: No
Radio: FM radio
USB: USB Type-C 2.0, USB On-The-Go

FEATURES
Sensors: Fingerprint (side-mounted), accelerometer, gyro, proximity, compass

BATTERY
Type: Li-Po 5000 mAh, non-removable
Charging: Fast Charging 33W`;

const featuredProducts = [
  {
    name: "razer-ornata-v3-base",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Alienware-X15-R1-Gaming-Laptop",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Iphone 14 pro max",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
    category: "new",
    price: "350,000",
  },
];

const recentlyViewed = [
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "razer-ornata-v3-base",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
    category: "used",
    price: "350,000",
  },
];

function ImagesPreviews({ files }) {
  const [pictures, setPictures] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setPictures(files);
    // console.log(pictures);
  }, []);

  const arrowNext = (arr) => {
    if (arr.length - 1 !== currentIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // setCurrentIndex(0);
      return null;
    }
  };

  const arrowPrev = (arr) => {
    if (currentIndex !== 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // setCurrentIndex(arr.length - 1);
      return null;
    }
  };

  return (
    <div>
      <div className="p-4 flex flex-col gap-6 relative lg:gap-3 lg:flex-row-reverse lg:justify-around lg:items-center">
        <div className="lg:hidden">
          <i
            onClick={() => arrowPrev(images)}
            className="bx bx-chevron-left bx-lg text-gray-400 font-normal cursor-pointer absolute top-1/4 left-2"
            style={{ color: `${currentIndex !== 0 ? "#009F7F" : "#9ca3af"}` }}
          ></i>
          <i
            onClick={() => arrowNext(images)}
            className="bx bx-chevron-right bx-lg text-green font-normal cursor-pointer absolute top-1/4 right-2"
            style={{
              color: `${
                pictures &&
                (currentIndex === pictures.length - 1 ? "#9ca3af" : "#009F7F")
              }`,
            }}
          ></i>
        </div>

        <div className="flex justify-center items-center">
          <div className="h-60 w-full object-contain flex justify-center items-center md:w-80 lg:h-[360px] lg:w-[480px]">
            {pictures && (
              <img
                src={pictures[currentIndex].image}
                alt="image-1"
                className="max-w-full max-h-full object-fill"
              />
            )}
            {/* <img
              src={images[0].image}
              alt="image-1"
              className="max-w-full max-h-full"
            /> */}
          </div>
        </div>

        <div className="bg-[#ECF3F9] rounded p-2 flex justify-between items-center gap-4 md:rounded-lg md:justify-around md:py-6 lg:py-11 lg:flex-col lg:w-48 lg:h-[500px]">
          {pictures &&
            pictures.map((image, index) => {
              return (
                <div
                  key={index}
                  className="h-24 w-28 rounded py-4 flex justify-center items-center lg:rounded-md lg:w-32 lg:h-28"
                  style={{
                    border: `${
                      currentIndex === index ? "1px solid #009F7F" : "none"
                    }`,
                    // transition: "0.5s ease",
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={image.image}
                    alt={`image-${index + 1}`}
                    className="max-w-full max-h-full"
                  />
                </div>
              );
            })}

          {/* {images.map((image, index) => {
            return (
              <div
                key={index}
                className="h-24 w-28 rounded py-4 flex justify-center items-center lg:w-32 lg:h-28"
                style={{
                  border: `${
                    currentIndex === index ? "1.5px solid #009F7F" : "none"
                  }`,
                  // transition: "0.5s ease",
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image.image}
                  alt={`image-${index + 1}`}
                  className="max-w-full max-h-full"
                />
              </div>
            );
          })} */}
        </div>
      </div>

      <div className="hidden lg:flex justify-center items-center gap-6 mt-10 lg:mt-20">
        <i
          onClick={() => arrowPrev(images)}
          className="bx bx-chevron-left bx-lg text-gray-400 font-normal cursor-pointer"
          style={{ color: `${currentIndex !== 0 ? "#009F7F" : "#9ca3af"}` }}
        ></i>
        <div>
          {currentIndex + 1} / {images.length}
        </div>
        <i
          onClick={() => arrowNext(images)}
          className="bx bx-chevron-right bx-lg text-green font-normal cursor-pointer"
          style={{
            color: `${
              currentIndex === images.length - 1 ? "#9ca3af" : "#009F7F"
            }`,
          }}
        ></i>
      </div>
    </div>
  );
}

function AboutProduct() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const increaseQuantity = () => {
    quantity < 10 && setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    quantity > 1 && setQuantity((prev) => prev - 1);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold lg:text-3xl">
          HP Pavilion Laptop 14-dv0189nia (2X4V1EA)
        </h2>
        <div className="my-5 flex justify-start items-start gap-10 md:gap-20">
          <div className="text-sm flex flex-col gap-4 lg:gap-8 font-normal lg:text-base">
            <p>Product id : #56789</p>
            <p>Brand : HP</p>
            <div className="flex justify-between items-center gap-4 md:gap-10">
              <p>Quantity</p>
              <div className="text-base flex items-center divide-x-2 w-20 border border-solid border-gray-700 rounded">
                <button className="w-full " onClick={decreaseQuantity}>
                  -
                </button>
                <p className="w-full text-center text-green">{quantity}</p>
                <button className="w-full " onClick={increaseQuantity}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="self-end lg:self-start py-1 px-4 rounded border-2 border-solid border-secondary-button text-secondary-button font-semibold">
            in stock
          </div>
        </div>
        <h2 className="text-2xl font-semibold lg:text-3xl">
          <NairaSymbol />
          350,000
        </h2>
        <div className="my-5 flex items-center justify-between gap-8 md:justify-start">
          <button className="w-full border-2 border-solid border-secondary-button text-secondary-button font-medium text-sm rounded flex justify-center items-center gap-3 py-2 px-4 md:w-fit">
            <img src={IMAGES.icons.cartGreen} alt="cart" className="w-3" />
            add to cart
          </button>
          <button
            className="w-full font-medium text-white text-sm rounded border-2 border-solid border-green bg-green py-2 px-4 hover:bg-dark-green md:w-fit"
            onClick={() => {
              if (loggedIn) {
                navigate("/payment");
              } else {
                navigate("/login", {
                  state: {
                    previousUrl: location.pathname,
                  },
                });
              }
            }}
          >
            Buy now
          </button>
        </div>
      </div>

      {/* <div className="flex flex-col gap-6 mt-8 text-sm font-light">
        <div className="w-2/4 h-14 bg-filter-green font-medium rounded flex justify-center items-center">
          Description
        </div>
        <div className="whitespace-break-spaces">
          {showMore ? example : `${example.substring(0, 800)}`}

          {example.length >= 800 && (
            <div>
              <button
                className="capitalize text-secondary-button font-semibold text-base flex justify-center items-center gap-2 py-2 px-0"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
                <img
                  src={IMAGES.icons.showMore}
                  alt="arrow-down"
                  className="w-3"
                />
              </button>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}

function Description() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col gap-6 my-4 text-sm font-light px-4 md:px-0 text-[#111]">
      <div className="w-2/4 h-14 bg-filter-green text-lg font-medium rounded-md flex justify-center items-center tracking-tight lg:text-[22px] lg:w-full">
        Description
      </div>
      <div className="whitespace-break-spaces lg:text-base">
        {showMore ? example : `${example.substring(0, 800)}`}

        {example.length >= 800 && (
          <div>
            <button
              className="capitalize text-green font-semibold text-base flex justify-center items-center gap-1 py-2 px-0"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
              <i className="bx bx-chevron-down bx-sm"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductDetails() {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-4 md:px-10 lg:hidden">
        <ImagesPreviews files={images} />

        <div className="w-4/5 border border-pagination rounded self-center my-3" />

        <AboutProduct />

        <Description />
      </div>

      <div className="hidden lg:flex justify-between items-start gap-4 px-20 mb-8">
        <div className="flex flex-col gap-4 w-[110%]">
          <ImagesPreviews files={images} />

          <div className="w-4/5 border border-pagination rounded self-center my-3" />

          <AboutProduct />
        </div>

        <div className="w-[90%]">
          <Description />
        </div>
      </div>

      <Banner />

      <div className="mt-8 md:mt-12 px-4 md:px-12 lg:px-24">
        <Groups
          heading="best selling products"
          products={featuredProducts}
          seeMore
        />
      </div>

      <div className="mt-8 px-4 md:px-12 lg:px-24">
        <Groups heading="recently viewed" products={recentlyViewed} seeMore />
      </div>
    </div>
  );
}
function ProductDesc() {
  const navigate = useNavigate();
  return (
    <div className="my-10">
      <div
        className="h-28 bg-filter-green"
        style={{
          backgroundImage: `radial-gradient(circle, #009F7F, #63BB8280, #63BB8280, #63BB8280)`,
        }}
      >
        <div className="h-full flex items-center gap-5 px-4 relative md:px-12 lg:px-24">
          <button
            className="rounded-full outline-none bg-transparent flex items-center text-lg lg:text-[22px] font-medium"
            onClick={() => navigate(-1)}
          >
            {/* <img src={IMAGES.icons.arrowBackward} alt="back" /> */}
            <i className="bx bx-chevron-left bx-md"></i>
            Back
          </button>

          <h2 className="capitalize text-3xl lg:text-[45px] font-bold absolute top-1/3 left-1/3 md:left-[45%]">
            phones
          </h2>
        </div>
      </div>

      <ProductDetails />
    </div>
  );
}

export default ProductDesc;
