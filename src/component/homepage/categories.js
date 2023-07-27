import React, { useState } from "react";
import IMAGES from "../../assets";
import { ProductTypesModal } from "../../views/popup_modals";
import { useNavigate } from "react-router-dom";

function Categories() {
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="my-16">
      <h1 className="text-xl font-semibold px-4 md:px-12 lg:px-24 lg:text-2xl">
        Categories
      </h1>

      <div className="bg-gray-200 mt-8">
        <div className="py-8 px-4 flex flex-col lg:flex-row gap-4 md:p-[50px] lg:p-[100px] md:gap-8 lg:gap-14 container mx-auto">
          <div
            className="w-full h-44 rounded bg-cover bg-center bg-no-repeat flex justify-center items-end p-4 md:h-56 md:p-10 lg:h-[340px] relative hover:pb-32 transition-all ease-in duration-300 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${IMAGES.homepage.catergoryNewBg})`,
            }}
            // onClick={() => setShowModal(true)}
            onClick={() => navigate("/products")}
          >
            <h2 className="text-base text-white font-semibold capitalize md:text-xl lg:text-4xl lg:font-bold">
              new products
            </h2>
          </div>

          <div
            className="w-full h-44 rounded bg-cover bg-center bg-no-repeat flex justify-center items-end p-4 md:h-56 md:p-10 lg:h-[340px] relative hover:pb-32 transition-all ease-in duration-300 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${IMAGES.homepage.categroryUsedBg})`,
            }}
            // onClick={() => setShowModal(true)}
            onClick={() => navigate("/products")}
          >
            <h2 className="text-base text-white font-semibold capitalize md:text-xl lg:text-4xl lg:font-bold">
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
