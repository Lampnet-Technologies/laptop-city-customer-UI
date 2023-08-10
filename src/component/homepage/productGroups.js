import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IMAGES from "../../assets";
import NairaSymbol from "../nairaSymbol";

// const newArrivals = [
//   {
//     name: "Macbook 13",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Iphone 14 pro max",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
//     category: "new",
//     price: "350,000",
//   },
//   {
//     name: "razer-ornata-v3-base",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Alienware-X15-R1-Gaming-Laptop",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
//     category: "used",
//     price: "350,000",
//   },
// ];

// const bestSelling = [
//   {
//     name: "razer-ornata-v3-base",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Iphone 14 pro max",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
//     category: "new",
//     price: "350,000",
//   },

//   {
//     name: "Alienware-X15-R1-Gaming-Laptop",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Macbook 13",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
//     category: "used",
//     price: "350,000",
//   },
// ];

// const recentlyViewed = [
//   {
//     name: "Alienware-X15-R1-Gaming-Laptop",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "razer-ornata-v3-base",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
//     category: "used",
//     price: "350,000",
//   },
// ];

function ProductContainer({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-44 h-56 rounded-md flex flex-col justify-between cursor-pointer border-[#DADADA] border-tiny border-solid lg:w-60 lg:h-80 lg:inline-block lg:space-y-3"
      onClick={() => navigate("/product-desc")}
    >
      <div className="h-32 rounded bg-[#D9D9D9] flex justify-center items-center relative lg:h-48">
        {product.images && (
          <div className="w-4/5 h-4/5 flex justify-center items-center">
            {product.images.length >= 1 ? (
              <img
                src={product.images[0].image}
                alt={product.name || ""}
                className="max-w-full max-h-full"
              />
            ) : (
              <img
                src={IMAGES.icons.cartGreen}
                alt={""}
                className="max-w-full max-h-full w-[50px]"
              />
            )}
          </div>
        )}
        {/* <div className="w-4/5 h-4/5 flex justify-center items-center">
          <img
            src={product.img || ""}
            alt={product.name || ""}
            className="max-w-full max-h-full"
          />
        </div> */}
        <div
          className="bg-green text-white font-medium capitalize w-9 h-4 rounded-sm flex justify-center items-center absolute top-4 right-2 z-40"
          style={{
            fontSize: "10px",
          }}
        >
          {product.category == "BRAND NEW" ? "new" : "used"}
          {/* {product.category} */}
        </div>
        <div className="flex justify-center items-center w-3 h-4 absolute bottom-3 right-2 z-40">
          <img
            src={IMAGES.icons.cartSmall}
            alt="cart"
            className="max-w-full w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between h-20 px-2 pb-4 lg:h-28 lg:pt-2">
        <p className="text-xs font-medium capitalize md:text-sm lg:text-base whitespace-break-spaces">
          {product.name}
        </p>
        <p className="text-base font-bold text-green md:text-lg lg:text-xl">
          <NairaSymbol />
          {product.price}
        </p>
      </div>
    </div>
  );
}

export function Groups({ heading, products, seeMore }) {
  return (
    <div className="max-w-full w-fit overflow-x-auto ">
      {heading && (
        <h1 className="text-xl font-semibold capitalize lg:text-2xl">
          {heading}
        </h1>
      )}

      <div className="mt-8 lg:mt-14 flex flex-wrap justify-between gap-x-2 gap-y-6 md:justify-start md:gap-x-6 lg:block lg:space-x-12 lg:whitespace-nowrap lg:overflow-x-auto lg:pb-5">
        {products &&
          products.map((product, index) => {
            return <ProductContainer key={index} product={product} />;
          })}
      </div>

      {seeMore && (
        <div
          style={{
            flexBasis: "100%",
            flexShrink: 0,
          }}
          className="mt-10 flex justify-end items-center text-sm font-medium"
        >
          <Link
            to="/products"
            className="flex justify-between items-center hover:text-green hover:font-bold"
          >
            See more <i className="bx bx-chevron-right bx-sm ml-0"></i>
          </Link>
        </div>
      )}
    </div>
  );
}

function ProductGroups() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    fetch(
      "https://apps-1.lampnets.com/ecommb-staging/products/pagination/active?pageNo=0&pageSize=4&sortBy=createdOn&sortDir=desc"
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result.content);
        setNewArrivals(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://apps-1.lampnets.com/ecommb-staging/products/best-selling?pageNo=0&pageSize=4"
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result.content);
        setBestSelling(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://apps-1.lampnets.com/ecommb-staging/products/reviewed?pageNo=0&pageSize=4&sortBy=createdOn&sortDir=desc"
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result.content);
        setRecentlyViewed(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  return (
    <div className="my-10 px-4 flex flex-col justify-between gap-10 md:gap-12 md:px-12 lg:px-24">
      <Groups heading="New Arrivals" products={newArrivals} seeMore />
      <Groups heading="best selling products" products={bestSelling} seeMore />
      <Groups heading="recently viewed" products={recentlyViewed} seeMore />
    </div>
  );
}

export default ProductGroups;
