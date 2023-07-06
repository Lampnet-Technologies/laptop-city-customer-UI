import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IMAGES from "../../assets";
import NairaSymbol from "../nairaSymbol";

const newArrivals = [
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
];

const featuredProducts = [
  {
    name: "razer-ornata-v3-base",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Iphone 14 pro max",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
    category: "new",
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
];

const recentlyViewed = [
  {
    name: "Alienware-X15-R1-Gaming-Laptop",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
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

function ProductContainer({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-44 h-56 rounded flex flex-col justify-between cursor-pointer border-gray-200 border-tiny border-solid"
      onClick={() => navigate("/product-desc")}
    >
      <div className="h-32 rounded bg-gray-200 flex justify-center items-center relative">
        <div className="w-4/5 h-4/5 flex justify-center items-center">
          <img
            src={product.img || ""}
            alt={product.name || ""}
            className="max-w-full max-h-full"
          />
        </div>
        <div
          className="bg-green text-white font-medium capitalize w-9 h-4 rounded-sm flex justify-center items-center absolute top-4 right-2 z-40"
          style={{
            fontSize: "10px",
          }}
        >
          {product.category}
        </div>
        <div className="flex justify-center items-center w-3 h-4 absolute bottom-3 right-2 z-40">
          <img
            src={IMAGES.icons.cartSmall}
            alt="cart"
            className="max-w-full w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between h-20 px-2 pb-4">
        <p className="text-xs font-medium capitalize">{product.name}</p>
        <p className="text-base font-bold text-green">
          <NairaSymbol />
          {product.price}
        </p>
      </div>
    </div>
  );
}

export function Groups({ heading, products, seeMore }) {
  return (
    <div>
      {heading && (
        <h1 className="text-xl font-semibold capitalize">{heading}</h1>
      )}

      <div className="mt-8 flex flex-wrap justify-between gap-x-2 gap-y-4">
        {products.map((product, index) => {
          return <ProductContainer key={index} product={product} />;
        })}

        {seeMore && (
          <div
            style={{ flexBasis: "100%", flexShrink: 0 }}
            className="flex justify-end items-center text-sm font-medium"
          >
            See more{" "}
            <img
              className="ml-2"
              src={IMAGES.icons.arrowForward}
              alt="see more"
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductGroups() {
  return (
    <div className="my-10 px-4 flex flex-col justify-between gap-10">
      <Groups heading="New Arrivals" products={newArrivals} seeMore />
      <Groups heading="Featured products" products={featuredProducts} seeMore />
      <Groups heading="recently viewed" products={recentlyViewed} seeMore />
    </div>
  );
}

export default ProductGroups;
