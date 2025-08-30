import React, { useEffect, useState } from "react";
import { Banner } from "../../component/homepage";
import IMAGES from "../../assets";
import BrandsModal from "./brands";
import { useLocation } from "react-router-dom";

const productTypes = [
  { name: "laptops", img: IMAGES.productTypes.laptops },
  { name: "desktops", img: IMAGES.productTypes.desktops },
  { name: "phones", img: IMAGES.productTypes.phones },
  { name: "accessories", img: IMAGES.productTypes.accessories },
  { name: "lifestyle", img: IMAGES.productTypes.lifestyle },
  { name: "spare parts", img: IMAGES.productTypes.spareParts },
  { name: "audio", img: IMAGES.productTypes.audio },
  { name: "wearable", img: IMAGES.productTypes.wearable },
  { name: "power", img: IMAGES.productTypes.power },
];

function ProductTypeContainer({ productType, onClick }) {
  return (
    <div
      className="relative w-44 h-44 rounded flex flex-col justify-end bg-contain cursor-pointer"
      onClick={() => onClick(productType.name)}
    >
      <img className="max-w-full max-h-full rounded-sm" src={productType.img} alt={productType.name} />
      <div
        className="absolute bottom-0 w-full h-9 rounded flex justify-center items-center"
        style={{ background: "linear-gradient(360deg, rgba(17,17,17,0.8) 22%, rgba(17,17,17,0) 123%)" }}
      >
        <h4 className="text-white text-lg font-semibold capitalize">{productType.name}</h4>
      </div>
    </div>
  );
}

function Groups({ productTypes, onTypeClick }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-4">
      {productTypes.map((type, index) => (
        <ProductTypeContainer key={index} productType={type} onClick={onTypeClick} />
      ))}
    </div>
  );
}

function ProductTypesModal({ isVisible, onClose }) {
  const [selectedType, setSelectedType] = useState(null);
  const location = useLocation();

  // Preserve condition from URL
  const searchParams = new URLSearchParams(location.search);
  const condition = searchParams.get("condition");

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "unset";
  }, [isVisible]);

  if (!isVisible) return null;

  const handleTypeClick = (typeName) => {
    setSelectedType(typeName);
  };

  const handleClose = (e) => {
    if (e.target.id === "body") onClose();
  };

  return (
    <>
      <div
        id="body"
        className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm w-full flex justify-center items-center overflow-y-auto py-20"
        onClick={handleClose}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <Banner />
          <div className="relative bg-white px-2 pt-4 pb-8 flex flex-col gap-8">
            {/* Close button */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 rounded-lg p-1.5 inline-flex items-center"
                onClick={onClose}
              >
                <span className="sr-only">Close modal</span>
                <svg aria-hidden="true" className="w-6 h-6" fill="#009F7F" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Modal Heading */}
            <div className="flex justify-center p-4">
              <h3 className="text-xl text-center font-bold text-black">
                Choose <span className="text-green">Type of Product</span> from Display
              </h3>
            </div>

            {/* Product Types Grid */}
            <Groups productTypes={productTypes} onTypeClick={handleTypeClick} />
          </div>
        </div>
      </div>

      {/* Brands modal opens after selecting a product type */}
      <BrandsModal
        isVisible={!!selectedType}
        selectedType={selectedType}
        onClose={() => setSelectedType(null)}
      />
    </>
  );
}

export default ProductTypesModal;
