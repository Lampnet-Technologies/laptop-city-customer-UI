import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import accessories from "../../images/accessories.png";
import desktop from "../../images/desktop.png";
import laptops from "../../images/laptops.png";
import phones from "../../images/phones.png";
import power from "../../images/power.png";
import sound from "../../images/sound.png";
import wearables from "../../images/wearables.png";
import spare from "../../images/spare.png";

// Array of local images
const localImages = [
  phones,
  desktop,
  laptops,
  spare,
  wearables,
  sound,
  power,
  accessories,
];

const ProductTypesOverlay = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize current URL params to avoid recalculating on every render
  const { condition } = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      condition: searchParams.get("condition"),
    };
  }, [location.search]);

  // Navigate to brands page, preserving the condition if it exists
  const handleImageClick = (typeName) => {
    let url = `/brands?type=${encodeURIComponent(typeName)}`;
    if (condition) {
      url += `&condition=${encodeURIComponent(condition)}`;
    }

    navigate(url);

    // Call the onClose callback if provided
    if (onClose) onClose();
  };

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
        {localImages.map((image, index) => {
          // Extract the file name as type name
          const typeName = image.split("/").pop().split(".")[0];
          return (
            <div key={index}>
              <img
                src={image}
                alt={typeName}
                className="w-full cursor-pointer"
                onClick={() => handleImageClick(typeName)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTypesOverlay;
