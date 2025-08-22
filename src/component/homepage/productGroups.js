import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import IMAGES from "../../assets";
import NairaSymbol from "../nairaSymbol";
import Modal from "./Modal";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ProductContainer({ product, addToCart }) {
  const navigate = useNavigate();

  const handleProductDesc = (id) => {
    navigate(`/product-desc/${id}`);
  };

  // Format price for display
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get product condition display text
  const getConditionText = (product) => {
    if (product.condition) {
      return product.condition.toLowerCase() === 'new' ? 'new' : 'used';
    }
    // Fallback to category if condition is not available
    if (product.category) {
      return product.category === "BRAND NEW" ? "new" : "used";
    }
    return "used"; // Default fallback
  };

  return (
    <div
      className="w-44 h-56 rounded-md flex flex-col justify-between cursor-pointer border-[#DADADA] border-tiny border-solid lg:w-60 lg:h-80 hover:shadow-lg transition-shadow duration-300"
      onClick={() => handleProductDesc(product.id)}
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
            <img
              src={IMAGES.icons.cartGreen}
              alt="no product"
              className="max-w-full max-h-full w-[50px]"
            />
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
        <p
          className="text-xs font-medium capitalize md:text-sm lg:text-base whitespace-break-spaces line-clamp-2"
          title={product.name}
        >
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
                e.stopPropagation(); // Prevent navigation when clicking add to cart
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

export const Groups = ({ products, addToCart }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {products && products.length > 0 ? (
      products.map((product) => (
        <ProductContainer key={product.id} product={product} addToCart={addToCart} />
      ))
    ) : (
      <div className="col-span-full text-center text-gray-500 py-8">
        No products available
      </div>
    )}
  </div>
);

function ProductGroups() {
  const [products, setProducts] = useState({
    laptops: [],
    phones: [],
    otherGadgets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomepageProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}/products/homepage`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        // Server now returns pre-categorized data
        setProducts({
          laptops: data.laptops || [],
          phones: data.phones || [],
          otherGadgets: data.otherGadgets || []
        });
      } catch (error) {
        console.error("Failed to fetch homepage products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageProducts();
  }, []);

  const handleProductTypeSelect = (condition) => {
    navigate(`/products?condition=${condition}`);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger the useEffect by updating a dependency
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-green border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-lg">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Failed to Load Products</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-green text-white px-4 py-2 rounded hover:bg-dark-green transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Section title="Laptops" items={products.laptops} />
      <Section title="SmartPhones" items={products.phones} />
      <Section title="Other Gadgets" items={products.otherGadgets} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleProductTypeSelect}
      />
    </div>
  );
}

const Section = ({ title, items }) => (
  <section className="my-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {items && items.length > 0 ? (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <ProductContainer key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Link
            to={`/products?filter=${title.toLowerCase().replace(' ', '_')}`}
            className="text-green hover:text-dark-green transition-colors"
          >
            See more &gt;
          </Link>
        </div>
      </>
    ) : (
      <div className="text-gray-500 text-center py-8">
        <p>No {title.toLowerCase()} available at the moment</p>
      </div>
    )}
  </section>
);

export default ProductGroups;