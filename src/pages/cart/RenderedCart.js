import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

function RenderedCart({
  total,
  items,
  remove,
  incrQty,
  decrQty,
  verifyCoupon,
}) {
  const [show, setShow] = useState(false);
  const [couponCode, setCOuponCode] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" mt-6 mb-24 space-y-4 lg:space-y-6">
      <div className="w-[95%] md:w-[70%] lg:w-[60%] mx-auto mb-10 space-y-3 border border-solid border-gray-300 p-3 rounded-2xl lg:px-6 lg:py-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium capitalize text-base text-gray-700 lg:text-lg">
            add Coupon
          </h4>

          <button type="button" onClick={() => setShow((prev) => !prev)}>
            <i
              className={`bx bx-${
                show ? "x-circle" : "plus-circle"
              } bx-sm text-gray-700 transition-all ease-in-out duration-700`}
            ></i>
          </button>
        </div>

        {show && (
          <div className="rounded-md flex justify-between items-center gap-4">
            <input
              type="text"
              value={couponCode}
              placeholder="input coupon code"
              className="bg-transparent w-full outline-0 py-2 px-4 placeholder:text-xs text-xs lg:placeholder:text-sm md:text-sm"
              onChange={(e) => setCOuponCode(e.target.value)}
            />

            <button
              type="button"
              className="bg-green py-1 px-4 capitalize text-center text-sm lg:text-base text-white rounded outline-0"
              onClick={() => {
                verifyCoupon(couponCode);
                // setShow(false);
              }}
            >
              add
            </button>
          </div>
        )}
      </div>

      {items &&
        items.map((item) => {
          return (
            <div
              className="w-[95%] mx-auto rounded shadow-sm shadow-gray-400 p-4 space-y-6 lg:space-y-4 lg:pb-6 lg:px-8 cursor-pointer"
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
                  className="text-base flex items-center divide-x-2 w-28 lg:w-40 lg:py-1 border border-solid border-gray-700 rounded lg:rounded-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-full px-1 py-0.5 font-semibold"
                    onClick={() =>
                      decrQty(item.quantity, item.id, item.product.id)
                    }
                  >
                    -
                  </button>
                  <p className="w-full px-1 py-0.5 font-semibold text-center text-green">
                    {item.quantity}
                  </p>
                  <button
                    className="w-full px-1 py-0.5 font-semibold"
                    onClick={() =>
                      incrQty(
                        item.quantity,
                        item.id,
                        item.product.id,
                        item.product.stock
                      )
                    }
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
