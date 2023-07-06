import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Banner } from "../../component/homepage";
import IMAGES from "../../assets";

const brands = [
  {
    id: 1,
    name: "INFINIX",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686043784/infinix_cwwbum.png",
  },
  {
    id: 2,
    name: "APPLE",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764541/apple-logo_v1oqh1.png",
  },
  {
    id: 3,
    name: "LG",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686043783/LG_zz0avi.png",
  },
  {
    id: 4,
    name: "SAMSUNG",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686043783/samsung_gryfam.png",
  },
  {
    id: 5,
    name: "HP",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764542/HP-Logo_rgygsp.png",
  },
  {
    id: 6,
    name: "LENOVO",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764541/Lenovo-logo_znap6l.png",
  },
  {
    id: 7,
    name: "ORAIMO",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686043783/oraimo_f98vtj.png",
  },
  // {
  //   id: 8,
  //   name: "APPLE",
  //   logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764541/apple-logo_v1oqh1.png",
  // },
  {
    id: 9,
    name: "TECNO",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686043203/TecnoMobile_h1f3pd.png",
  },
  {
    id: 10,
    name: "XIAOMI",
    logo: "https://res.cloudinary.com/dikleyjwz/image/upload/v1685447298/iborllf38pitgulzdodp.png",
  },
];

// const getBrands = "https://apps-1.lampnets.com/ecommb-staging/brands";

function BrandsContainer({ brand }) {
  return (
    <Link
      to={`/products`}
      onClick={() => (document.body.style.overflow = "unset")}
    >
      <div
        className="w-44 h-44 rounded-md flex justify-center items-center border-tiny border-green"
        //   style={{ flexBasis: "11rem", flexGrow: 1 }}
      >
        <div
          className="flex justify-center items-center"
          style={{ height: "50%", width: "70%" }}
        >
          <img
            className="max-w-full max-h-full"
            src={brand.logo}
            alt={brand.name}
          />
        </div>
      </div>
    </Link>
  );
}

function Groups({ brands }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-4">
      {brands.map((brand) => {
        return <BrandsContainer key={brand.id} brand={brand} />;
      })}
    </div>
  );
}

function BrandsModal({ isVisible, onClose }) {
  // const [brands, setBrands] = useState([]);

  // useEffect(() => {
  //   fetch(getBrands)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setBrands(result);
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }, []);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "body") onClose();
  };

  return (
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
              Choose <span className="text-green">Brand</span> of Product
            </h3>
          </div>

          <div>
            <Groups brands={brands} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandsModal;
