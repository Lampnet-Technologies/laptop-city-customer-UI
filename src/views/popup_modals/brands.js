import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../component/homepage";

const baseUrl = process.env.REACT_APP_BASE_URL;

function BrandsContainer({ brand, onClick }) {
  return (
    <div
      onClick={() => {
        onClick(brand);
        document.body.style.overflow = "unset";
      }}
      className="w-44 h-44 rounded-md flex justify-center items-center border-tiny border-green cursor-pointer"
    >
      <div
        className="flex justify-center items-center"
        style={{ height: "50%", width: "70%" }}
      >
        <img
          className="max-w-full max-h-full"
          src={brand.logo}
          alt={brand.name}
        />
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

function BrandsModal({ isVisible, onClose }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${baseUrl}/brands`, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
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
    // Pass brand name so ProductsListing useEffect can map to brandId
    navigate(`/products?brand=${encodeURIComponent(brand.name)}`);
    onClose();
  };

  return (
    <div
      id="body"
      className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm w-full flex justify-center items-center overflow-x-hidden overflow-y-auto md:inset-0 py-20"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <Banner />

        <div className="relative bg-white px-2 pt-4 pb-8 flex flex-col gap-8 ">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="#009F7F"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="flex items-center justify-center p-4 ">
            <h3 className="text-xl text-center font-bold text-black">
              Choose <span className="text-green">Brand</span> of Product
            </h3>
          </div>

          <div>
            {loading ? (
              <div className="text-center p-4">Loading...</div>
            ) : (
              <Groups brands={brands} onClick={handleBrandClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandsModal;
