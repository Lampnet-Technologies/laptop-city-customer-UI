import React from "react";
import NairaSymbol from "../../component/nairaSymbol";

const statusObj = {
  canceled: "#FF1700",
  shipped: "#56CA00",
  pending: "#9E2ED2",
  delivered: "#00A6CA",
};

function StatusColor({ status }) {
  return (
    <span
      className="p-2 text-xs rounded"
      style={{
        color: `${status ? statusObj[status] : "inherit"}`,
        border: `1px solid ${status ? statusObj[status] : "black"}`,
      }}
    >
      {status}
    </span>
  );
}

function RenderedOrders({ orders }) {
  let num = 1;
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
              className="text-base leading-[21px] p-5 text-center"
            >
              order date
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-right"
            >
              total amount
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-center"
            >
              shipping status
            </th>
          </tr>
        </thead>
        {orders && (
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr style={{ borderBlock: "0.5px solid #7f98ae" }} key={index}>
                  <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    {num++}
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    <div className="min-w-[84px] h-[63px] max-w-[109px] lg:h-[82px] flex justify-center items-center">
                      <img
                        src={order.img}
                        alt={order.name}
                        className="max-w-full max-h-[80%]"
                      />
                    </div>
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 ">
                    {order.name}
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 ">
                    {order.date}
                  </td>
                  <td className="text-sm leading-6 capitalize p-5 text-right font-medium">
                    <NairaSymbol />
                    {order.price}
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    <StatusColor status={order.shippingStatus} />
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

export default RenderedOrders;
