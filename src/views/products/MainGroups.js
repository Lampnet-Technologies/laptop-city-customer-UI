import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
import NairaSymbol from "../../component/nairaSymbol";

function ProductContainer({ product }) {
  const navigate = useNavigate();

  const handleProductDesc = (id) => {
    navigate("/product-desc/" + id);
  };

  return (
    <div
      className="w-[170px] h-56 rounded flex flex-col justify-between cursor-pointer border-[#DADADA] border-tiny border-solid md:w-52 lg:w-60 lg:h-[300px]"
      onClick={() => handleProductDesc(product.id)}
    >
      <div className="h-32 rounded bg-[#D9D9D9] flex justify-center items-center relative lg:h-44">
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
        </div>
        <div className="flex justify-center items-center w-3 h-4 absolute bottom-3 right-2 z-10">
          <img
            src={IMAGES.icons.cartSmall}
            alt="cart"
            className="max-w-full w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-between h-20 px-2 pb-3 lg:h-28 lg:pt-2">
        <p className="text-xs md:text-sm font-medium capitalize">
          {product.name}
        </p>
        <p className="text-base font-bold text-green">
          <NairaSymbol />
          {product.price}
        </p>
      </div>
    </div>
  );
}

function MainGroups({ heading, products, seeMore }) {
  return (
    <div className="max-w-full w-fit">
      {heading && (
        <h1 className="text-xl font-semibold capitalize lg:text-2xl">
          {heading}
        </h1>
      )}

      <div className="mt-8 lg:mt-14 flex flex-wrap justify-around gap-x-2 gap-y-4 md:justify-start md:gap-8 lg:gap-y-10">
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
          className="flex justify-end items-center text-sm font-medium mt-4"
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

export default MainGroups;
