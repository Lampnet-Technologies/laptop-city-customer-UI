import React, { useState } from "react";
import { X } from "lucide-react";
import accessories from "../../images/accessories.png";
import desktop from "../../images/desktop.png";
import laptops from "../../images/laptops.png";
import phones from "../../images/phones.png";
import power from "../../images/power.png";
import sound from "../../images/sound.png";
import wearables from "../../images/wearables.png";
import spare from "../../images/spare.png";
import BrandsGrid from "./Brands";

const localImages = [
  phones,
  desktop,
  laptops,
  spare,
  wearables,
  sound,
  power,
  accessories,
];

const ProductTypesOverlay = ({ onClose }) => {
  const [showBrands, setShowBrands] = useState(false);

  const handleImageClick = () => {
    setShowBrands(true);
  };

  const handleCloseBrands = () => {
    setShowBrands(false);
    onClose(); // ✅ Also close ProductTypesOverlay itself
  };

  if (showBrands) {
    return <BrandsGrid onClose={handleCloseBrands} />; // ✅ Pass handleCloseBrands to BrandsGrid
  }

  return (
    <div className="bg-white rounded shadow-sm w-full left-0 top-[100%] z-30 py-4 absolute px-10">
      <div className="relative">
        <h1 className="text-xl text-center mb-4 font-semibold">
          Choose <span className="text-[#047d65]">Product</span> from Display
        </h1>
        <span onClick={onClose} className="absolute right-1 top-1 cursor-pointer">
          <X size={25} color="#047d65" />
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:grid-cols-2 ">
        {localImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt="product type"
              className="w-full cursor-pointer"
              onClick={handleImageClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTypesOverlay;
