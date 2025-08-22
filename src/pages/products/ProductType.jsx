
import { useNavigate } from "react-router-dom";
import accessories from "../../images/accessories.png";
import desktop from "../../images/desktop.png";
import laptops from "../../images/laptops.png";
import phones from "../../images/phones.png";
import power from "../../images/power.png";
import sound from "../../images/sound.png";
import wearables from "../../images/wearables.png";
import spare from "../../images/spare.png";

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

  const handleImageClick = () => {
    navigate("/brands");
    if (onClose) onClose(); // Optional: Close overlay if handler provided
  };

  return (
    <div className="w-full">
      <div className="relative">
        <h1 className="text-xl text-center mb-4 font-semibold">
          Choose <span className="text-[#047d65]">Product</span> from Display
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt="product type"
              className="w-full cursor-pointer"
              onClick={handleImageClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTypesOverlay;
