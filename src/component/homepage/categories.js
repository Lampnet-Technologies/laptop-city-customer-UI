import React, { useState } from "react";
import IMAGES from "../../assets";
import { ProductTypesModal } from "../../views/popup_modals";

function Categories() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="my-10">
      <h1 className="text-xl font-semibold px-4">Categories</h1>

      <div className="bg-gray-100 py-8 px-4 flex flex-col gap-4 mt-8">
        <div
          className="h-44 rounded bg-cover bg-center bg-no-repeat flex justify-center items-end p-4"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${IMAGES.homepage.catergoryNewBg})`,
          }}
          onClick={() => setShowModal(true)}
        >
          <h2 className="text-base text-white font-semibold capitalize">
            new products
          </h2>
        </div>

        <div
          className="h-44 rounded bg-cover bg-center bg-no-repeat flex justify-center items-end p-4"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${IMAGES.homepage.categroryUsedBg})`,
          }}
          onClick={() => setShowModal(true)}
        >
          <h2 className="text-base text-white font-semibold capitalize">
            used products
          </h2>
        </div>
      </div>

      <ProductTypesModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Categories;
