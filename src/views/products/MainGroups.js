import React from "react";
import { Link, useNavigate } from "react-router-dom";
/* import IMAGES from "../../assets"; */
import NairaSymbol from "../../component/nairaSymbol";

function ProductContainer({ product, addToCart, addToWishlist }) {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product detail page
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div
        onClick={() => handleProductClick(product.id)}
        className="cursor-pointer"
      >
        {/* Product Image */}
        <div className="relative h-48 mb-4">
          <img
            src={product.images?.[0]?.image || "default-image-url"}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.brand}</p>
          <p className="text-green font-bold">
            <NairaSymbol />
            {product.price}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="bg-green text-white px-3 py-1 rounded hover:bg-dark-green"
        >
          Add to Cart
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(product);
          }}
          className="text-green hover:text-dark-green"
        >
          <i className="bx bx-heart"></i>
        </button>
      </div>
    </div>
  );
}

function MainGroups({ heading, products, seeMore, addToCart }) {
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
            return (
              <ProductContainer
                key={index}
                addToCart={addToCart}
                product={product}
              />
            );
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
