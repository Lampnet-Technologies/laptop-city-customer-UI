import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

function ProductContainer({ product, addToCart, addToWishlist }) {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product detail page
  };

  return (
    <div
      className="relative bg-white p-4 rounded-lg shadow hover:shadow-lg
                 transition-shadow flex flex-col justify-between
                 w-[180px] h-[240px]"  // ✅ fixed width + height for uniform boxes
    >
      <div
        onClick={() => handleProductClick(product.id)}
        className="cursor-pointer flex-grow flex flex-col"
      >
        {/* Product Image */}
        <div className="relative h-20 flex items-center justify-center mb-3">
          <img
            src={product.images?.[0]?.image || "default-image-url"}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-1 flex-grow">
          <h3 className="text-sm font-semibold truncate">{product.name}</h3>
          <p className="text-gray-600 text-xs truncate">{product.brand}</p>
          <p className="text-green font-bold text-sm">
            <NairaSymbol />
            {product.price}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex justify-between items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="bg-green text-white px-3 py-1 text-sm rounded hover:bg-dark-green"
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
          <i className="bx bx-heart text-lg"></i>
        </button>
      </div>
    </div>
  );
}

function MainGroups({ heading, products, seeMore, addToCart, addToWishlist }) {
  return (
    <div className="max-w-full w-fit">
      {heading && (
        <h1 className="text-xl font-semibold capitalize lg:text-2xl">
          {heading}
        </h1>
      )}

      {/* Uniform grid */}
      <div className="mt-8 lg:mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
        {products &&
          products.map((product, index) => (
            <ProductContainer
              key={index}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              product={product}
            />
          ))}
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
