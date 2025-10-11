import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

function ProductContainer({ product, addToCart, addToWishlist }) {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const formatPrice = (price) =>
    price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

  const getConditionText = (p) => {
    if (p.condition) return p.condition.toLowerCase() === "new" ? "new" : "used";
    if (p.category) return p.category === "BRAND NEW" ? "new" : "used";
    return "used";
  };

  return (
    <div 
      className="w-full h-[240px] rounded-lg flex flex-col justify-between cursor-pointer border border-[#DADADA] hover:shadow-lg transition-shadow duration-300 bg-white"
      onClick={() => handleProductClick(product.id)}
    >
      {/* Image Section - Fixed height for complete uniformity */}
      <div className="h-[140px] rounded-t-lg bg-[#F8F9FA] flex justify-center items-center relative p-2">
        <div className="w-full h-full flex items-center justify-center">
          <img
            loading="lazy"
            src={product.images?.[0]?.image || product.images?.[0] || "default-image-url"}
            alt={product.name || "Product"}
            className="w-full h-full object-contain max-w-[120px] max-h-[120px]"
            onError={(e) => {
              e.target.src = "default-fallback-image.png";
              e.target.className = "w-[40px] h-[40px] object-contain";
            }}
          />
        </div>
        
        <div className="absolute top-2 right-2 bg-green text-white font-medium capitalize px-2 py-0.5 rounded-sm text-[10px]">
          {getConditionText(product)}
        </div>
      </div>

      {/* Product Info Section - Fixed height for uniformity */}
      <div className="flex flex-col gap-1 p-2 h-[80px] justify-between">
        <p
          className="text-xs font-medium capitalize line-clamp-2 leading-tight"
          title={product.name}
        >
          {product.name || "Product Name"}
        </p>
        
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-green">
            &#8358;{formatPrice(product.price)}
          </p>
          
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToWishlist(product);
              }}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Add to Wishlist"
            >
              <i className="bx bx-heart text-sm"></i>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-green text-white text-[10px] px-2 py-1 rounded hover:bg-dark-green transition-colors"
              title="Add to Cart"
            >
              <i className="bx bx-cart-add"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainGroups({ heading, products, seeMore, addToCart, addToWishlist }) {
  // Handle the case where ProductsListing passes a single product in an array
  if (products && products.length === 1 && !heading) {
    return (
      <ProductContainer
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        product={products[0]}
      />
    );
  }

  // Handle the normal case with heading and multiple products (ProductGroups)
  return (
    <div className="w-full">
      {heading && (
        <div className="mb-3">
          <h2 className="text-lg font-bold capitalize">{heading}</h2>
        </div>
      )}

      {/* Grid layout for ProductGroups */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products &&
          products.map((product, index) => (
            <ProductContainer
              key={product.id || index}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              product={product}
            />
          ))}
      </div>

      {seeMore && (
        <div className="flex justify-end mt-3">
          <Link
            to={{
              pathname: "/products",
              search: `?filter=${heading}`,
            }}
            className="text-green hover:text-dark-green transition-colors font-medium text-sm"
          >
            See more &gt;
          </Link>
        </div>
      )}
    </div>
  );
}

export default MainGroups;