import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import IMAGES from "../../assets";
import NairaSymbol from "../nairaSymbol";

const baseUrl = process.env.REACT_APP_BASE_URL;

// Group section component
export const Groups = ({ heading, products, seeMore }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold capitalize">{heading}</h2>
      {products.length > 0 && seeMore && (
        <Link
          to={`/products?category=${heading.toLowerCase().replace(" ", "_")}`}
          className="text-green hover:text-dark-green transition-colors"
        >
          See more &gt;
        </Link>
      )}
    </div>
    {products.length > 0 ? (
      <div className="relative">
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 pb-4 min-w-0">
            {products.map((product) => (
              <div className="flex-none w-44 lg:w-60" key={product.id}>
                <ProductContainer product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">
          No {heading.toLowerCase()} available at the moment
        </p>
      </div>
    )}
  </div>
);

// Main ProductGroups Component
function ProductGroups() {
  const [products, setProducts] = useState({
    laptops: [],
    phones: [],
    otherGadgets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/pagination/active`, {
          headers: { Accept: "application/json", "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        const data = await response.json();
        const content = data.content || [];

        const grouped = {
          laptops: content.filter((p) => {
            const type = (p?.productType || "").toLowerCase();
            return type.includes("laptop") || type.includes("notebook");
          }),
          phones: content.filter((p) => {
            const type = (p?.productType || "").toLowerCase();
            return type.includes("phone") || type.includes("mobile");
          }),
          otherGadgets: content.filter((p) => {
            const type = (p?.productType || "").toLowerCase();
            return p.productType && !type.includes("laptop") && !type.includes("notebook") && !type.includes("phone") && !type.includes("mobile");
          }),
        };

        setProducts(grouped);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-yellow-800 font-semibold mb-2">
              We're having trouble loading the products
            </h3>
            <p className="text-gray-600 mb-4">Please try again in a moment</p>
            <button
              onClick={handleRetry}
              className="bg-green text-white px-4 py-2 rounded hover:bg-dark-green transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 mb-10 px-2 space-y-8 md:mx-12 lg:mt-24 lg:mx-24">
      <Groups heading="laptops" products={products.laptops || []} seeMore />
      <Groups heading="smartphones" products={products.phones || []} seeMore />
      <Groups heading="other gadgets" products={products.otherGadgets || []} seeMore />
    </div>
  );
}

// Product container component
function ProductContainer({ product, addToCart }) {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const formatPrice = (price) => (price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0");

  const getConditionText = (product) => {
    if (product.condition) return product.condition.toLowerCase() === "new" ? "new" : "used";
    if (product.category) return product.category === "BRAND NEW" ? "new" : "used";
    return "used";
  };

  return (
    <div
      className="w-44 h-56 rounded-md flex flex-col justify-between cursor-pointer border-[#DADADA] border-tiny border-solid lg:w-60 lg:h-80 hover:shadow-lg transition-shadow duration-300"
      onClick={() => handleProductClick(product.id)}
    >
      <div className="h-32 rounded bg-[#D9D9D9] flex justify-center items-center relative lg:h-48">
        {product.images && product.images.length > 0 ? (
          <div className="w-4/5 h-4/5 flex justify-center items-center">
            <img
              loading="lazy"
              src={product.images[0].image || product.images[0]}
              alt={product.name || "Product"}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.src = IMAGES.icons.cartGreen;
                e.target.className = "max-w-full max-h-full w-[50px]";
              }}
            />
          </div>
        ) : (
          <div className="w-4/5 h-4/5 flex justify-center items-center">
            <img src={IMAGES.icons.cartGreen} alt="no product" className="max-w-full max-h-full w-[50px]" />
          </div>
        )}
        <div
          className="bg-green text-white font-medium capitalize w-9 h-4 rounded-sm flex justify-center items-center absolute top-4 right-2 z-10"
          style={{ fontSize: "10px" }}
        >
          {getConditionText(product)}
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-between h-20 px-2 pb-3 lg:h-28 lg:pt-2">
        <p className="text-xs font-medium capitalize md:text-sm lg:text-base whitespace-break-spaces line-clamp-2" title={product.name}>
          {product.name || "Product Name"}
        </p>
        <div className="flex justify-between items-center gap-2">
          <p className="text-base font-bold text-green md:text-lg lg:text-xl">
            <NairaSymbol />
            {formatPrice(product.price)}
          </p>
          {addToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="text-xs bg-green text-white px-2 py-1 rounded hover:bg-dark-green transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductGroups;
