import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
import LaptopCityButton from "../../component/button";
import { Banner } from "../../component/homepage";
import { Groups } from "../../component/homepage/productGroups";
import NairaSymbol from "../../component/nairaSymbol";

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

function ImagesPreviews() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="h-60 object-contain flex justify-center items-center">
        <img
          src={images[0].image}
          alt="image-1"
          className="max-w-full max-h-full"
        />
      </div>

      <div className="bg-pagination rounded p-2 flex justify-between items-center gap-4">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="h-24 rounded py-4 flex justify-center items-center"
            >
              <img
                src={image.image}
                alt={`image-${index + 1}`}
                className="max-w-full max-h-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AboutProduct() {
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const increaseQuantity = () => {
    quantity < 10 && setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    quantity > 1 && setQuantity((prev) => prev - 1);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">
          HP Pavilion Laptop 14-dv0189nia (2X4V1EA)
        </h2>
        <div className="text-sm flex flex-col gap-4 font-light">
          <p>Product id : #56789</p>
          <p>Brand : HP</p>
          <div className="flex justify-between items-center gap-4">
            <p>Quantity</p>
            <div className="text-base flex items-center divide-x-2 w-20 border border-solid border-gray-700 rounded">
              <button className="w-full " onClick={decreaseQuantity}>
                -
              </button>
              <p className="w-full text-center">{quantity}</p>
              <button className="w-full " onClick={increaseQuantity}>
                +
              </button>
            </div>
            <div className="py-1 px-4 rounded border-2 border-solid border-secondary-button text-secondary-button font-semibold">
              in stock
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold">
          <NairaSymbol />
          350,000
        </h2>
        <div className="flex items-center justify-between gap-8">
          <button className="w-full border-2 border-solid border-secondary-button text-secondary-button font-medium text-sm rounded flex justify-center items-center gap-3 py-2 px-4">
            <img src={IMAGES.icons.cartGreen} alt="cart" className="w-3" />
            add to cart
          </button>
          <button
            className="w-full font-medium text-white text-sm rounded bg-green py-2 px-4 hover:bg-dark-green"
            onClick={() => navigate("/payment")}
          >
            Buy now
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-8 text-sm font-light">
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
      </div>
    </div>
  );
}

function ProductDetails() {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-4">
        <ImagesPreviews />

        <div className="w-4/5 border-2 border-pagination rounded self-center my-3" />

        <AboutProduct />

        <Banner />

        <div className="mt-8 px-4">
          <Groups
            heading="featured products"
            products={featuredProducts}
            seeMore
          />
        </div>

        <div className="mt-8 px-4">
          <Groups heading="recently viewed" products={recentlyViewed} seeMore />
        </div>
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
        <div className="h-full flex items-center gap-5 px-4">
          <button
            className="rounded-full outline-none bg-transparent flex items-center gap-2 text-lg font-medium"
            onClick={() => navigate(-1)}
          >
            <img src={IMAGES.icons.arrowBackward} alt="back" />
            Back
          </button>

          <h2 className="capitalize text-3xl font-bold">phones</h2>
        </div>
      </div>

      <ProductDetails />
    </div>
  );
}

export default ProductDesc;
