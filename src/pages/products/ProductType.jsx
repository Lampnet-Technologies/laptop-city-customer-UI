import React, { useMemo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import accessories from "../../images/accessories.png";
import desktop from "../../images/desktop.png";
import laptops from "../../images/laptops.png";
import phones from "../../images/phones.png";
import power from "../../images/power.png";
import sound from "../../images/sound.png";
import wearables from "../../images/wearables.png";
import spare from "../../images/spare.png";

const baseUrl = process.env.REACT_APP_BASE_URL;

// Array of local images with their corresponding type mappings
const imageTypeMapping = [
  { image: phones, filename: "phones", fallbackName: "Mobile Phones" },
  { image: desktop, filename: "desktop", fallbackName: "Desktop Computers" },
  { image: laptops, filename: "laptops", fallbackName: "Laptops" },
  { image: spare, filename: "spare", fallbackName: "Spare Parts" },
  { image: wearables, filename: "wearables", fallbackName: "Wearables" },
  { image: sound, filename: "sound", fallbackName: "Audio" },
  { image: power, filename: "power", fallbackName: "Power & Accessories" },
  { image: accessories, filename: "accessories", fallbackName: "Accessories" },
];

const ProductTypesOverlay = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize current URL params to avoid recalculating on every render
  const { condition } = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      condition: searchParams.get("condition"),
    };
  }, [location.search]);

  // Fetch product types from API
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product-types`);
        setProductTypes(response.data || []);
      } catch (error) {
        console.error("Error fetching product types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductTypes();
  }, []);

  // Find matching product type name from API data
  const findMatchingProductType = (filename) => {
    if (!productTypes.length) return null;

    // Try to find exact or partial matches
    const exactMatch = productTypes.find(type => 
      type.name.toLowerCase().includes(filename.toLowerCase())
    );
    
    if (exactMatch) return exactMatch.name;

    // Additional mapping logic for common variations
    const mappings = {
      phones: ["mobile", "phone", "smartphone"],
      desktop: ["desktop", "computer", "pc"],
      laptops: ["laptop", "notebook"],
      accessories: ["accessory", "accessories"],
      power: ["power", "charger", "adapter"],
      sound: ["audio", "sound", "speaker", "headphone"],
      wearables: ["wearable", "watch", "smartwatch"],
      spare: ["spare", "part", "component"]
    };

    const keywords = mappings[filename] || [filename];
    
    for (const keyword of keywords) {
      const match = productTypes.find(type => 
        type.name.toLowerCase().includes(keyword)
      );
      if (match) return match.name;
    }

    return null;
  };

  // Navigate to brands page, preserving the condition if it exists
  const handleImageClick = (filename, fallbackName) => {
    const matchedTypeName = findMatchingProductType(filename);
    const typeName = matchedTypeName || fallbackName;
    
    let url = `/brands?type=${encodeURIComponent(typeName)}`;
    if (condition) {
      url += `&condition=${encodeURIComponent(condition)}`;
    }

    console.log('Navigating with product type:', typeName);
    navigate(url);

    // Call the onClose callback if provided
    if (onClose) onClose();
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="text-center p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-[120px] bg-gray-200 rounded-lg"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative">
        <h1 className="text-xl text-center mb-4 font-semibold">
          Choose <span className="text-[#047d65]">Product</span> from Display
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageTypeMapping.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.image}
                alt={item.fallbackName}
                className="w-full cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => handleImageClick(item.filename, item.fallbackName)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTypesOverlay;