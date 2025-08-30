import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

const BrandsGrid = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBrandClick = (brandName) => {
    const searchParams = new URLSearchParams(location.search);
    const condition = searchParams.get("condition");
    const type = searchParams.get("type");

    let url = `/products?brand=${encodeURIComponent(brandName)}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;
    if (condition) url += `&condition=${encodeURIComponent(condition)}`;

    navigate(url);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${baseUrl}/brands`);
        setBrands(response.data || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4">
        {/* Simple skeleton loader */}
        <div className="animate-pulse space-y-4">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="h-[250px] bg-gray-200 rounded-lg mx-auto w-11/12 sm:w-5/6 md:w-4/5"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl text-center font-bold mb-4">
          Choose <span className="text-[#047D65]">Brand</span> of product
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-[150px]">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col justify-center items-center border rounded-lg h-[250px] shadow-sm p-4 bg-white cursor-pointer hover:scale-105 transition-transform duration-300"
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

export default memo(BrandsGrid);
