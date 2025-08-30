import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
import ProductTypesModal from "../../views/popup_modals/productTypes";
import BrandsModal from "../../views/popup_modals/brands";
import LaptopCityButton from "../../component/button";

const baseUrl = process.env.REACT_APP_BASE_URL;

// Cache for products with timestamp
let productCache = {
  data: null,
  timestamp: null,
  expiry: 5 * 60 * 1000, // 5 minutes cache
};

/* -------------------- Placeholder Card -------------------- */
export function ProductPlaceholder() {
  return (
    <div className="w-44 h-56 lg:w-60 lg:h-80 rounded-md flex flex-col justify-between border border-[#DADADA] animate-pulse">
      <div className="h-32 lg:h-48 rounded bg-gray-200 flex justify-center items-center relative">
        <div className="w-12 h-12 bg-gray-300 rounded"></div>
        <div className="absolute top-4 right-2 w-9 h-4 bg-gray-300 rounded-sm"></div>
      </div>
      <div className="flex flex-col gap-2 justify-between h-20 px-2 pb-3 lg:h-28 lg:pt-2">
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
}

/* -------------------- Search Bar -------------------- */
function SearchBar({ onSearch, loading }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="w-full flex justify-center mb-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center justify-center gap-3 w-full max-w-3xl"
      >
        <div className="flex items-center w-full bg-white border-2 border-[#BBC8D4] rounded-lg px-4 h-[45px] md:h-[56px]">
          <input
            id="searchGadget"
            type="text"
            placeholder="Search for gadgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 placeholder:text-[#BBC8D4] text-sm md:text-base font-medium outline-none"
          />
        </div>

        <LaptopCityButton
          className="min-w-[90px] px-6 py-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </LaptopCityButton>
      </form>
    </div>
  );
}

/* -------------------- Product Card -------------------- */
function ProductContainer({ product, onClick }) {
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
      onClick={() => onClick(product.id)}
    >
      {/* Image Section - Fixed height for complete uniformity */}
      <div className="h-[140px] rounded-t-lg bg-[#F8F9FA] flex justify-center items-center relative p-2">
        <div className="w-full h-full flex items-center justify-center">
          {product.images?.length > 0 ? (
            <img
              loading="lazy"
              src={product.images[0].image || product.images[0]}
              alt={product.name || "Product"}
              className="w-full h-full object-contain max-w-[120px] max-h-[120px]"
              onError={(e) => {
                e.target.src = IMAGES.icons.cartGreen;
                e.target.className = "w-[40px] h-[40px] object-contain";
              }}
            />
          ) : (
            <img
              src={IMAGES.icons.cartGreen}
              alt="no product"
              className="w-[40px] h-[40px]"
            />
          )}
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
        <p className="text-sm font-bold text-green">
          &#8358;{formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}

/* -------------------- Groups Section -------------------- */
export const Groups = ({
  heading,
  products,
  onSeeMore,
  onProductClick,
  loading,
  showAsGrid = false,
}) => {
  const renderPlaceholders = () =>
    Array.from({ length: showAsGrid ? 6 : 4 }, (_, index) => (
      <ProductPlaceholder key={`placeholder-${index}`} />
    ));

  const renderProducts = () => {
    if (loading) return renderPlaceholders();

    if (products.length === 0) {
      return (
        <div className="col-span-full bg-gray-50 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <img
              src={IMAGES.icons.cartGreen}
              alt="No products"
              className="w-12 h-12 opacity-50"
            />
            <p className="text-gray-600 font-medium">
              No {heading.toLowerCase()} available
            </p>
            <p className="text-gray-500 text-sm">
              Check back later for new products
            </p>
          </div>
        </div>
      );
    }

    return products.map((product) => (
      <ProductContainer
        key={product.id}
        product={product}
        onClick={onProductClick}
      />
    ));
  };

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg font-bold capitalize">{heading}</h2>
      </div>

      {showAsGrid ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {renderProducts()}
        </div>
      ) : (
        <div className="relative overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 pb-3 min-w-0">{renderProducts()}</div>
        </div>
      )}

      {!loading && products.length > 0 && onSeeMore && (
        <div className="flex justify-end mt-3">
          <button
            onClick={onSeeMore}
            className="text-green hover:text-dark-green transition-colors font-medium text-sm"
          >
            See more &gt;
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------- Condition Modal -------------------- */
function ConditionModal({ isVisible, onSelect, onClose }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "body") onClose();
  };

  const handleSelect = (condition) => {
    onSelect(condition); // pass the condition to the parent
  };

  return (
    <div
      id="body"
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm w-full flex justify-center items-center py-20"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg p-6">
        <h3 className="text-lg font-bold text-green text-center mb-6">
          {/* Select Condition */}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSelect("new")}
            className="bg-green text-white py-3 px-4 rounded-lg hover:bg-dark-green transition-colors font-medium"
          >
            New
          </button>
          <button
            onClick={() => handleSelect("used")}
            className="bg-green text-white py-3 px-4 rounded-lg hover:bg-dark-green transition-colors font-medium"
          >
            Used
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-3 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* -------------------- Main Component -------------------- */
function ProductGroups() {
  const [products, setProducts] = useState({
    laptops: [],
    phones: [],
    otherGadgets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [productTypeModalVisible, setProductTypeModalVisible] = useState(false);
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const navigate = useNavigate();

  // Search handler
  const handleSearch = (searchTerm) => {
    navigate(`/products?filter=${encodeURIComponent(searchTerm)}`);
  };

  const isCacheValid = () =>
    productCache.data &&
    productCache.timestamp &&
    Date.now() - productCache.timestamp < productCache.expiry;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isCacheValid()) {
          setProducts(productCache.data);
          setLoading(false);
          return;
        }

        setLoading(true);
        const response = await fetch(`${baseUrl}/products/homepage?limit=6`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok)
          throw new Error(`Server responded with ${response.status}`);

        const data = await response.json();

        // ✅ Backend already groups the products
        const grouped = {
          laptops: data.laptops || [],
          phones: data.smartPhones || [],
          otherGadgets: data.otherGadgets || [],
        };

        productCache = {
          data: grouped,
          timestamp: Date.now(),
          expiry: 5 * 60 * 1000,
        };

        setProducts(grouped);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRetry = () => {
    setError(null);
    productCache.data = null;
    setLoading(true);
    window.location.reload();
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleSeeMore = (type) => {
    setSelectedType(type);
    setConditionModalVisible(true);
  };

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    setConditionModalVisible(false);
    setProductTypeModalVisible(true);
  };

  const handleProductTypeClose = () => {
    setProductTypeModalVisible(false);
    setSelectedCondition(null);
    setSelectedType(null);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-yellow-800 font-semibold mb-2">
            We're having trouble loading the products
          </h3>
          <p className="text-gray-600 mb-4">Please try again in a moment</p>
          <button
            onClick={handleRetry}
            className="bg-green text-white px-4 py-2 rounded hover:bg-dark-green"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 px-3 space-y-6 md:mx-8 lg:mt-16 lg:mx-16">
      {/* 🔍 Single SearchBar */}
      <SearchBar onSearch={handleSearch} loading={false} />

      {/* Groups */}
      <Groups
        heading="laptops"
        products={products.laptops}
        onSeeMore={() => handleSeeMore("laptops")}
        onProductClick={handleProductClick}
        loading={loading}
        showAsGrid
      />
      <Groups
        heading="smartphones"
        products={products.phones}
        onSeeMore={() => handleSeeMore("phones")}
        onProductClick={handleProductClick}
        loading={loading}
        showAsGrid
      />
      <Groups
        heading="other gadgets"
        products={products.otherGadgets}
        onSeeMore={() => handleSeeMore("otherGadgets")}
        onProductClick={handleProductClick}
        loading={loading}
        showAsGrid
      />

      {/* Modals */}
      <ConditionModal
        isVisible={conditionModalVisible}
        onSelect={handleConditionSelect}
        onClose={() => setConditionModalVisible(false)}
      />
      <ProductTypesModal
        isVisible={productTypeModalVisible}
        onClose={handleProductTypeClose}
      />
      <BrandsModal
        isVisible={brandModalVisible}
        onClose={() => setBrandModalVisible(false)}
      />
    </div>
  );
}

export default ProductGroups;
