import React, { useState } from "react";
import NairaSymbol from "../../component/nairaSymbol";
import { useEffect } from "react";

function RenderedCart({ items }) {
  // const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   console.log(items);
  // }, []);

  let num = 1;

  const increaseQuantity = (quantity) => {
    // quantity < 10 && quantity++;
    console.log("increasing quantity:" + (quantity += 1));
  };

  const decreaseQuantity = (quantity) => {
    // quantity > 1 && quantity--;
    console.log("decreasing quantity:" + (quantity -= 1));
  };

  return (
    <div className="overflow-x-auto mt-12 mb-24">
      <table className="w-full whitespace-nowrap border-collapse">
        <thead>
          <tr style={{ borderBlock: "0.5px solid #7f98ae" }}>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-center"
            >
              s/n
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-center"
            >
              image
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-left"
            >
              product
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 "
            >
              quantity
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-right"
            >
              price/unit
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-right"
            >
              subtotal
            </th>
          </tr>
        </thead>

        {items && (
          <tbody>
            {items.map((item, index) => {
              return (
                <tr
                  style={{ borderBlock: "0.5px solid #7f98ae" }}
                  key={item.id}
                >
                  <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    {num++}
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    <div className="min-w-[84px] h-[63px] max-w-[109px] lg:h-[82px] flex justify-center items-center">
                      <img
                        src={item.product?.images[0]?.image}
                        alt={item.product.name}
                        className="max-w-full max-h-[80%]"
                      />
                    </div>
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 ">
                    {item.product.name}
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 ">
                    <div className="text-base flex items-center divide-x-2 w-20 border border-solid border-gray-700 rounded">
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
                  </td>
                  <td className="text-sm leading-6 capitalize p-5 text-right font-medium">
                    <NairaSymbol />
                    {item.product.price}
                  </td>
                  <td className="text-sm leading-6 capitalize p-5 text-right font-medium">
                    <NairaSymbol />
                    {item.product.price * item.quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default RenderedCart;
