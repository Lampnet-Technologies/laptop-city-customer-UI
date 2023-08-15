import React, { useState } from "react";
import IMAGES from "../../assets";
import { ProductTypesModal } from "../../views/popup_modals";
import { useNavigate } from "react-router-dom";

function Categories() {
  // const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovering2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovering2(false);
  };

  const navigate = useNavigate();

  return (
    <div className="my-16">
      <h1 className="text-xl font-semibold px-4 md:px-12 lg:px-24 lg:text-2xl">
        Categories
      </h1>

      <div className="bg-[#F2F2F2] mt-8">
        <div className="py-8 px-4 flex flex-col lg:flex-row gap-4 md:p-[50px] lg:p-[100px] md:gap-8 lg:gap-16">
          <div
            className="w-full h-44 rounded lg:rounded-[10px] bg-cover bg-center bg-no-repeat md:text-xl lg:text-4xl flex justify-center items-end p-4 md:h-56 md:p-10 lg:h-[340px] relative hover:pb-32 hover:text-5xl transition-all ease-in duration-300 cursor-pointer"
            style={{
              backgroundImage: isHovering
                ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${IMAGES.homepage.catergoryNewBg})`
                : `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), url(${IMAGES.homepage.catergoryNewBg})`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate(`/products?filter=new_products`)}
          >
            <h2 className="text-inherit text-white font-semibold capitalize lg:font-bold">
              new products
            </h2>
          </div>

          <div
            className="w-full h-44 rounded lg:rounded-[10px] bg-cover bg-center bg-no-repeat md:text-xl lg:text-4xl flex justify-center items-end p-4 md:h-56 md:p-10 lg:h-[340px] relative hover:pb-32 hover:text-5xl transition-all ease-in duration-300 cursor-pointer"
            style={{
              backgroundImage: isHovering2
                ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${IMAGES.homepage.categroryUsedBg})`
                : `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), url(${IMAGES.homepage.categroryUsedBg})`,
            }}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
            onClick={() => navigate(`/products?filter=used_products`)}
          >
            <h2 className="text-inherit text-white font-semibold capitalize lg:font-bold">
              used products
            </h2>
          </div>
        </div>
      </div>

      {/* <ProductTypesModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      /> */}
    </div>
  );
}

export default Categories;
