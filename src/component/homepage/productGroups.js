import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IMAGES from "../../assets";
import NairaSymbol from "../nairaSymbol";

function ProductContainer({ product }) {
  const navigate = useNavigate();

  const handleProductDesc = (id) => {
    navigate("/product-desc/" + id);
  };

  return (
    <div
      className="w-44 h-56 rounded-md flex flex-col justify-between cursor-pointer border-[#DADADA] border-tiny border-solid lg:w-60 lg:h-80"
      onClick={() => handleProductDesc(product.id)}
    >
      <div className="h-32 rounded bg-[#D9D9D9] flex justify-center items-center relative lg:h-48">
        {product.images && (
          <div className="w-4/5 h-4/5 flex justify-center items-center">
            {product.images.length >= 1 ? (
              <img
                loading="lazy"
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

        <div
          className="bg-green text-white font-medium capitalize w-9 h-4 rounded-sm flex justify-center items-center absolute top-4 right-2 z-10"
          style={{
            fontSize: "10px",
          }}
        >
          {product.category == "BRAND NEW" ? "new" : "used"}
          {/* {product.category} */}
        </div>
        {/* <button
          type="button"
          className="hidden lg:flex justify-center items-center text-dark-blue absolute bottom-2 right-2 z-10"
          onClick={(e) => {
            e.stopPropagation();

            addToCart(product);
          }}
        >
          <i className="bx bx-cart-add bx-sm"></i>
          
        </button> */}
      </div>
      <div className="flex flex-col gap-1 justify-between h-20 px-2 pb-3 lg:h-28 lg:pt-2">
        <p className="text-xs font-medium capitalize md:text-sm lg:text-base whitespace-break-spaces">
          {product.name}
        </p>

        <div className="flex justify-between items-center gap-2">
          <p className="text-base font-bold text-green md:text-lg lg:text-xl">
            <NairaSymbol />
            {product.price}
          </p>

          {/* <button
            type="button"
            className="bg-green text-white text-xs capitalize py-1 px-2 rounded flex justify-between items-center lg:hidden"
            onClick={(e) => {
              e.stopPropagation();

              addToCart(product);
            }}
          >
            <i className="bx bx-cart-add"></i> add
          </button> */}
        </div>
      </div>
    </div>
  );
}

export function Groups({ heading, products, seeMore }) {
  return (
    <div className="max-w-full w-fit">
      {heading && (
        <h1 className="text-xl font-semibold capitalize lg:text-2xl">
          {heading}
        </h1>
      )}

      <div className="mt-8 lg:mt-14 flex flex-wrap justify-around gap-x-2 gap-y-6 md:justify-start md:gap-x-6">
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
            to={{
              pathname: "/products",
              search: `?filter=${heading}`,
            }}
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

  const checkScreenSize = () => {
    if (window.innerWidth >= 1500) {
      return 5;
    } else {
      return 4;
    }
  };

  useEffect(() => {
    fetch(
      `https://apps-1.lampnets.com/ecommb-prod/products/pagination/active?pageNo=0&pageSize=${checkScreenSize()}&sortBy=createdOn&sortDir=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setNewArrivals(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://apps-1.lampnets.com/ecommb-prod/products/best-selling?pageNo=0&pageSize=${checkScreenSize()}`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setBestSelling(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);
// https://apps-1.lampnets.com/ecommb-staging/products

// https://apps-1.lampnets.com/ecommb-prod/products/
  useEffect(() => {
    fetch(
      `https://apps-1.lampnets.com/ecommb-prod/products/reviewed?pageNo=0&pageSize=${checkScreenSize()}&sortBy=createdOn&sortDir=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setRecentlyViewed(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  return (
    <div className="my-10 px-4 flex flex-col justify-between gap-10 md:gap-12 md:px-12 lg:px-24">
      <Groups heading="new arrivals" products={newArrivals} seeMore />
      <Groups heading="best selling products" products={bestSelling} seeMore />
      <Groups heading="recently viewed" products={recentlyViewed} seeMore />
    </div>
  );
}

export default ProductGroups;
