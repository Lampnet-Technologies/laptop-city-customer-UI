import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../assets";
import ProductTypesModal from "../../views/popup_modals/productTypes"; // modal for product types
import BrandsModal from "../../views/popup_modals/brands"; // modal for brands

const baseUrl = process.env.REACT_APP_BASE_URL;

// Reusable Product Card
function ProductContainer({ product, onClick }) {
  const formatPrice = (price) =>
    price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

  const getConditionText = (product) => {
    if (product.condition) return product.condition.toLowerCase() === "new" ? "new" : "used";
    if (product.category) return product.category === "BRAND NEW" ? "new" : "used";
    return "used";
  };

  return (
    <div
      className="w-44 h-56 lg:w-60 lg:h-80 rounded-md flex flex-col justify-between cursor-pointer border border-[#DADADA] hover:shadow-lg transition-shadow duration-300"
      onClick={() => onClick(product.id)}
    >
      <div className="h-32 lg:h-48 rounded bg-[#D9D9D9] flex justify-center items-center relative">
        {product.images?.length > 0 ? (
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
        ) : (
          <img src={IMAGES.icons.cartGreen} alt="no product" className="max-w-full max-h-full w-[50px]" />
        )}
        <div className="absolute top-4 right-2 z-10 bg-green text-white font-medium capitalize w-9 h-4 rounded-sm flex justify-center items-center text-[10px]">
          {getConditionText(product)}
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-between h-20 px-2 pb-3 lg:h-28 lg:pt-2">
        <p className="text-xs font-medium capitalize md:text-sm lg:text-base line-clamp-2" title={product.name}>
          {product.name || "Product Name"}
        </p>
        <div className="flex justify-between items-center gap-2">
          <p className="text-base font-bold text-green md:text-lg lg:text-xl">
            &#8358;{formatPrice(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}

// Groups Section
export const Groups = ({ heading, products, onSeeMore, onProductClick }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold capitalize">{heading}</h2>
      {products.length > 0 && onSeeMore && (
        <button onClick={onSeeMore} className="text-green hover:text-dark-green transition-colors">
          See more &gt;
        </button>
      )}
    </div>
    {products.length > 0 ? (
      <div className="relative overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 pb-4 min-w-0">
          {products.map((product) => (
            <div className="flex-none w-44 lg:w-60" key={product.id}>
              <ProductContainer product={product} onClick={onProductClick} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">No {heading.toLowerCase()} available at the moment</p>
      </div>
    )}
  </div>
);

// Modal for New / Used / Cancel
function ConditionModal({ isVisible, onSelect, onClose }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "body") onClose();
  };

  return (
    <div
      id="body"
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm w-full flex justify-center items-center py-20"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-md bg-white rounded-md p-6 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-green text-center">Select Condition</h3>
        <button onClick={() => onSelect("new")} className="bg-green text-white py-2 rounded hover:bg-dark-green">
          New
        </button>
        <button onClick={() => onSelect("used")} className="bg-green text-white py-2 rounded hover:bg-dark-green">
          Used
        </button>
        <button onClick={onClose} className="bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
          Cancel
        </button>
      </div>
    </div>
  );
}

function ProductGroups() {
  const [products, setProducts] = useState({ laptops: [], phones: [], otherGadgets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [conditionModalVisible, setConditionModalVisible] = useState(false);
  const [productTypeModalVisible, setProductTypeModalVisible] = useState(false);
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

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

        const grouped = { laptops: [], phones: [], otherGadgets: [] };
        content.forEach((p) => {
          const type = (p.productType || "").trim().toLowerCase();
          if (type.includes("laptop") || type.includes("notebook")) grouped.laptops.push(p);
          else if (type.includes("phone") || type.includes("mobile")) grouped.phones.push(p);
          else grouped.otherGadgets.push(p);
        });

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
          <h3 className="text-yellow-800 font-semibold mb-2">We're having trouble loading the products</h3>
          <p className="text-gray-600 mb-4">Please try again in a moment</p>
          <button onClick={handleRetry} className="bg-green text-white px-4 py-2 rounded hover:bg-dark-green">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 mb-10 px-2 space-y-8 md:mx-12 lg:mt-24 lg:mx-24">
      <Groups
        heading="laptops"
        products={products.laptops}
        onSeeMore={() => handleSeeMore("laptops")}
        onProductClick={handleProductClick}
      />
      <Groups
        heading="smartphones"
        products={products.phones}
        onSeeMore={() => handleSeeMore("phones")}
        onProductClick={handleProductClick}
      />
      <Groups
        heading="other gadgets"
        products={products.otherGadgets}
        onSeeMore={() => handleSeeMore("otherGadgets")}
        onProductClick={handleProductClick}
      />

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
