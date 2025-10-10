import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Banner } from "../../component/homepage";

const baseUrl = process.env.REACT_APP_BASE_URL;

function BrandsContainer({ brand, onClick }) {
  return (
    <div
      onClick={() => {
        onClick(brand);
        document.body.style.overflow = "unset"; // restore scroll
      }}
      className="w-44 h-44 rounded-md flex justify-center items-center border-tiny border-green cursor-pointer"
    >
      <div className="flex justify-center items-center" style={{ height: "50%", width: "70%" }}>
        <img className="max-w-full max-h-full" src={brand.logo} alt={brand.name} />
      </div>
    </div>
  );
}

function Groups({ brands, onClick }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-4">
      {brands.map((brand) => (
        <BrandsContainer key={brand.id} brand={brand} onClick={onClick} />
      ))}
    </div>
  );
}

function BrandsModal({ isVisible, onClose, selectedType, selectedCondition }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Read current condition from URL
  const searchParams = new URLSearchParams(location.search);
  const condition = searchParams.get("condition");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${baseUrl}/brands`);
        if (!res.ok) throw new Error("Failed to fetch brands");
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "body") onClose();
  };

  const handleBrandClick = (brand) => {
    const params = new URLSearchParams();
    if (selectedCondition) params.set("condition", selectedCondition);
    if (selectedType) params.set("type", selectedType);
    if (brand?.name) params.set("brand", brand.name);

    navigate(`/products?${params.toString()}`);
    onClose();
  };

  return (
    <div
      id="body"
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm w-full flex justify-center items-center overflow-y-auto py-20"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <Banner />
        <div className="relative bg-white px-2 pt-4 pb-8 flex flex-col gap-8">
          {/* Close button */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-200 rounded-lg p-1.5 inline-flex items-center"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg aria-hidden="true" className="w-6 h-6" fill="#009F7F" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Modal heading */}
          <div className="flex justify-center p-4">
            <h3 className="text-xl text-center font-bold text-black">
              Choose <span className="text-green">Brand</span> of Product
            </h3>
          </div>

          {/* Brands Grid */}
          <div>
            {loading ? <div className="text-center p-4">Loading...</div> : <Groups brands={brands} onClick={handleBrandClick} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandsModal;
