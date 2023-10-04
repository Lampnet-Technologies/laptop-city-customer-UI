import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

// const statusObj = {
//     Canceled: "#FF1700",
//     Shipped: "#56CA00",
//     "In Progress": "#9E2ED2",
//     Delivered: "#00A6CA",
//   };

function OrderDetails() {
  const [order, setOrder] = useState("");
  const [orderItems, setOrderItems] = useState("");
  const [total, setTotal] = useState("");

  const params = useParams();

  const id = params.id;

  useEffect(() => {
    if (id) {
      fetch(`https://apps-1.lampnets.com/ecommb-staging/orders/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setOrder(result);
        })
        .catch((error) => {
          console.error();
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`https://apps-1.lampnets.com/ecommb-staging/order-items/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setOrderItems(result.orderItems);
          setTotal(result.total);
        })
        .catch((error) => {
          console.error();
        });
    }
  }, [id]);

  let num = 1;

  return (
    <div className="border border-solid border-green rounded w-full">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-[24px]">
        {order && order.orderNumber
          ? "Order #" + order.orderNumber
          : order.message}
      </div>

      <div className="overflow-x-auto pb-3 mt-12 mb-24">
        <table className="w-full whitespace-nowrap md:whitespace-break-spaces border-collapse">
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
                className="text-base leading-[21px] p-5 text-center"
              >
                quantity
              </th>
              <th
                style={{ fontVariant: "all-small-caps" }}
                className="text-base leading-[21px] p-5 text-right"
              >
                price/unit
              </th>
            </tr>
          </thead>

          {orderItems && (
            <tbody>
              {orderItems.map((row) => {
                return (
                  <tr
                    style={{
                      borderBlock: "0.5px solid #7f98ae",
                      cursor: "pointer",
                    }}
                    key={row.id}
                  >
                    <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                      {num++}
                    </td>
                    <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                      <div className="mx-auto w-20 h-14 rounded-md flex justify-center items-center">
                        <img
                          src={row.product.images[0]?.image}
                          alt={row.product.name}
                          style={{
                            maxWidth: "70%",
                            maxHeight: "100%",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    </td>
                    <td className="text-sm font-normal leading-6 capitalize p-5 text-left">
                      <div className="flex flex-col flex-nowrap gap-2 py-2">
                        <p className="font-semibold">{row.product.name}</p>
                        {/* <p>Category:</p> */}
                        <div
                          className={`font-medium capitalize rounded text-center text-[10px] py-[1px] px-4 w-fit border border-solid ${
                            row.product.category == "BRAND NEW"
                              ? "border-green text-green"
                              : "border-[#FFB400] text-[#FFB400]"
                          } `}
                          //   style={{
                          //     fontSize: "10px", // #FFB400
                          //   }}
                        >
                          {row.product.category == "BRAND NEW" ? "new" : "used"}
                        </div>
                        <div className="w-8 h-8 flex justify-center items-center">
                          <img
                            src={
                              row.product.brand.logo
                                ? row.product.brand.logo
                                : ""
                            }
                            alt={row.product.brand.name}
                            className="max-w-full max-h-full w-full h-full object-fill"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                      {row.quantity}
                    </td>
                    <td className="text-sm leading-6 capitalize p-5 text-right font-medium">
                      <NairaSymbol />
                      {row.product.price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {orderItems && orderItems.length < 1 && (
          <div className="flex justify-center items-center py-4">
            No Items for this order
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
