import React, { useState } from "react";
import NairaSymbol from "../../component/nairaSymbol";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RenderedCart({ items, remove }) {
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
    // <div className="overflow-x-auto mt-12 mb-24">
    //   <table className="w-full whitespace-nowrap border-collapse">
    //     <thead>
    //       <tr style={{ borderBlock: "0.5px solid #7f98ae" }}>
    //         <th
    //           style={{ fontVariant: "all-small-caps" }}
    //           className="text-base leading-[21px] p-5 text-center"
    //         >
    //           s/n
    //         </th>
    //         <th
    //           style={{ fontVariant: "all-small-caps" }}
    //           className="text-base leading-[21px] p-5 text-center"
    //         >
    //           image
    //         </th>
    //         <th
    //           style={{ fontVariant: "all-small-caps" }}
    //           className="text-base leading-[21px] p-5 text-left"
    //         >
    //           product
    //         </th>
    //         <th
    //           style={{ fontVariant: "all-small-caps" }}
    //           className="text-base leading-[21px] p-5 "
    //         >
    //           quantity
    //         </th>
    //         <th
    //           style={{ fontVariant: "all-small-caps" }}
    //           className="text-base leading-[21px] p-5 text-right"
    //         >
    //           price/unit
    //         </th>
    //         <th
    //           style={{ fontVariant: "all-small-caps" }}
    //           className="text-base leading-[21px] p-5 text-right"
    //         >
    //           subtotal
    //         </th>
    //       </tr>
    //     </thead>

    //     {items && (
    //       <tbody>
    //         {items.map((item, index) => {
    //           return (
    //             <tr
    //               style={{ borderBlock: "0.5px solid #7f98ae" }}
    //               key={item.id}
    //             >
    //               <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
    //                 {num++}
    //               </td>
    //               <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
    //                 <div className="min-w-[84px] h-[63px] max-w-[109px] lg:h-[82px] flex justify-center items-center">
    //                   <img
    //                     src={item.product?.images[0]?.image}
    //                     alt={item.product.name}
    //                     className="max-w-full max-h-[80%]"
    //                   />
    //                 </div>
    //               </td>
    //               <td className="text-sm font-normal leading-6 capitalize p-5 ">
    //                 {item.product.name}
    //               </td>
    //               <td className="text-sm font-normal leading-6 capitalize p-5 ">
    //                 <div className="text-base flex items-center divide-x-2 w-20 border border-solid border-gray-700 rounded">
    //                   <button
    //                     className="w-full "
    //                     onClick={() => decreaseQuantity(item.quantity)}
    //                   >
    //                     -
    //                   </button>
    //                   <p className="w-full text-center text-green">
    //                     {item.quantity}
    //                   </p>
    //                   <button
    //                     className="w-full "
    //                     onClick={() => increaseQuantity(item.quantity)}
    //                   >
    //                     +
    //                   </button>
    //                 </div>
    //               </td>
    //               <td className="text-sm leading-6 capitalize p-5 text-right font-medium">
    //                 <NairaSymbol />
    //                 {item.product.price}
    //               </td>
    //               <td className="text-sm leading-6 capitalize p-5 text-right font-medium">
    //                 <NairaSymbol />
    //                 {item.product.price * item.quantity}
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     )}
    //   </table>
    // </div>

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
    </div>
  );
}

export default RenderedCart;
