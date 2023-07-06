import React, { useEffect, useState } from "react";
import { Banner } from "../../component/homepage";
import IMAGES from "../../assets";
import BrandsModal from "./brands";

const productTypes = [
  {
    name: "laptops",
    img: IMAGES.productTypes.laptops,
  },
  {
    name: "desktops",
    img: IMAGES.productTypes.desktops,
  },
  {
    name: "phones",
    img: IMAGES.productTypes.phones,
  },
  {
    name: "accessories",
    img: IMAGES.productTypes.accessories,
  },
  {
    name: "lifestyle",
    img: IMAGES.productTypes.lifestyle,
  },
  {
    name: "spare parts",
    img: IMAGES.productTypes.spareParts,
  },
  {
    name: "audio",
    img: IMAGES.productTypes.audio,
  },
  {
    name: "wearable",
    img: IMAGES.productTypes.wearable,
  },
  {
    name: "power",
    img: IMAGES.productTypes.power,
  },
];

function ProductTypeContainer({ productType, onOpen, onClose }) {
  return (
    <div
      className="relative w-44 h-44 rounded flex flex-col justify-end bg-contain"
      //   style={{ flexBasis: "11rem", flexGrow: 1 }}
      onClick={() => {
        // onClose();
        onOpen();
      }}
    >
      <img
        className="max-w-full max-h-full rounded-sm"
        src={productType.img}
        alt={productType.name}
      />
      <div
        className="absolute bottom-0 w-full h-9 rounded flex justify-center items-center "
        style={{
          background:
            "linear-gradient(360deg, rgba(17, 17, 17, 0.8) 22.47%, rgba(17, 17, 17, 0) 123.24%)",
        }}
      >
        <h4 className="text-white text-lg font-semibold capitalize">
          {productType.name}
        </h4>
      </div>
    </div>
  );
}

function Groups({ productTypes, onOpen, onClose }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-4">
      {productTypes.map((productType, index) => {
        return (
          <ProductTypeContainer
            key={index}
            productType={productType}
            onOpen={onOpen}
            onClose={onClose}
          />
        );
      })}
    </div>
  );
}

function ProductTypesModal({ isVisible, onClose }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "body") onClose();
  };

  return (
    <>
      <div
        id="body"
        className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm w-full flex justify-center items-center overflow-x-hidden overflow-y-auto md:inset-0 py-20" // h-[calc(100%-1rem)] max-h-full
        onClick={handleClose}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <Banner />

          <div className="relative bg-white px-2 pt-4 pb-8 flex flex-col gap-8 ">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-green">breadcrumb</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="#009F7F"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="flex items-center justify-center p-4 ">
              <h3 className="text-xl text-center font-bold text-black">
                Choose <span className="text-green">Type of Product</span> from
                Display
              </h3>
            </div>

            <div>
              <Groups
                productTypes={productTypes}
                onOpen={() => setShowModal(true)}
                onClose={() => onClose()}
              />
            </div>
          </div>
        </div>
      </div>
      <BrandsModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default ProductTypesModal;

// ** Dark mode styles

// Modal container - dark:bg-gray-700

// Modal close button -  dark:hover:bg-gray-600 dark:hover:text-white

// Modal heading -  dark:border-gray-600
// Modal heading text -  dark:text-white
