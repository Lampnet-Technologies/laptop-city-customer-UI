import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const BrandsGrid = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`);
    
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/brands`
        );
        setBrands(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="">
      <div>
        <h2 className="text-2xl text-center font-bold mb-4">
          Choose <span className="text-[#047D65]">Brand</span> of product
        </h2>
        {/* <span
          onClick={onClose}
          className="absolute right-10 top-4 cursor-pointer"
        >
          <X size={25} color="#047d65" />
        </span> */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-[150px]">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col justify-center items-center border rounded-lg h-[250px] shadow-sm p-4 bg-white cursor-pointer"
            onClick={() => handleBrandClick(brand.name)}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-[70px] w-[70px] object-contain mb-2"
            />
            <p className="text-sm text-center">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsGrid;
