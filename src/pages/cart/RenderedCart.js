import React from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

function RenderedCart({ total, items, remove }) {
  const navigate = useNavigate();

  // let num = 1;

  const increaseQuantity = (quantity) => {
    // quantity < 10 && quantity++;
    console.log("increasing quantity:" + (quantity += 1));
  };

  const decreaseQuantity = (quantity) => {
    // quantity > 1 && quantity--;
    console.log("decreasing quantity:" + (quantity -= 1));
  };

  return (
    <div className=" mt-6 mb-24 space-y-4 lg:space-y-6">
      {items &&
        items.map((item) => {
          return (
            <div
              className="w-[95%] mx-auto rounded shadow-sm shadow-gray-400 p-4 space-y-5 lg:space-y-3 cursor-pointer"
              key={item.id}
              onClick={() => navigate(`/product-desc/${item.product.id}`)}
            >
              <div className="flex justify-start items-start gap-2 md:gap-4">
                <div className="w-1/5 max-w-24 h-20 lg:h-32 flex justify-center items-center">
                  <img
                    src={item.product?.images[0]?.image}
                    alt={item.product.name}
                    className="max-w-full max-h-full"
                  />
                </div>

                <div className="space-y-1 lg:space-y-2">
                  <p className="capitalize text-sm md:text-base">
                    {item.product.name}
                  </p>
                  <p className="text-lg md:text-xl font-semibold">
                    <NairaSymbol />
                    {item.product.price}
                  </p>
                  <p className="flex justify-start items-center gap-1 text-[10px] text-red-400">
                    <i className="bx bx-error-circle"></i>
                    {item.product.stock} units left
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center gap-3">
                <button
                  className="flex justify-between items-center gap-2 uppercase text-green font-semibold text-sm lg:text-base"
                  onClick={(e) => {
                    e.stopPropagation();

                    remove(item.id);
                  }}
                >
                  <i className="bx bxs-trash bx-sm"></i> remove
                </button>

                <div
                  className="text-base flex items-center divide-x-2 w-24 lg:w-40 lg:py-1 border border-solid border-gray-700 rounded lg:rounded-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-full "
                    onClick={() => decreaseQuantity(item.quantity)}
                  >
                    -
                  </button>
                  <p className="w-full text-center text-green">
                    {item.quantity}
                  </p>
                  <button
                    className="w-full "
                    onClick={() => increaseQuantity(item.quantity)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      <div className="text-center" style={{ marginTop: "60px" }}>
        <button
          className="capitalize font-medium text-white text-sm lg:text-base md:font-semibold md:px-6 lg:py-4 lg:px-20 rounded lg:rounded-md bg-green py-[11px] px-5 hover:bg-dark-green"
          onClick={() => navigate("/payment")}
        >
          checkout{" "}
          <span className="ml-2">
            <NairaSymbol />
            {total}
          </span>
        </button>
      </div>
    </div>
  );
}

export default RenderedCart;
