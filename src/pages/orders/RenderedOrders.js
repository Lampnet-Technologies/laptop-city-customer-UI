import React from "react";
import NairaSymbol from "../../component/nairaSymbol";

const statusObj = {
  Canceled: "#FF1700",
  Shipped: "#56CA00",
  "In Progress": "#9E2ED2",
  Delivered: "#00A6CA",
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

function RenderedOrders({ orders, viewDetails }) {
  return (
    <div className="overflow-x-auto mt-12 mb-24">
      <table className="w-full whitespace-nowrap border-collapse">
        <thead>
          <tr style={{ borderBlock: "0.5px solid #7f98ae" }}>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-left"
            >
              order no
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-center"
            >
              order date
            </th>

            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-center"
            >
              shipping status
            </th>
            <th
              style={{ fontVariant: "all-small-caps" }}
              className="text-base leading-[21px] p-5 text-right"
            >
              total amount
            </th>
          </tr>
        </thead>
        {orders && (
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  style={{
                    borderBlock: "0.5px solid #7f98ae",
                    cursor: "pointer",
                  }}
                  key={order.id}
                  onClick={() => viewDetails(order.id)}
                >
                  <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                      <div style={{ display: "flex", gap: 0.5 }}>
                        {/* <div
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '100%',
                                backgroundColor: 
                                  `${statusObj[row.paymentStatus].color}`
                              }}
                            /> */}
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "100%",
                            backgroundColor: `${statusObj[order.orderStatus]}`,
                          }}
                        />
                      </div>
                      <span>{order.orderNumber}</span>
                    </div>
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    {order.orderDate}
                  </td>
                  <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    <StatusColor status={order.orderStatus} />
                  </td>
                  <td className="text-sm leading-6 capitalize p-5 text-right font-medium">
                    <NairaSymbol />
                    {order.amount}
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
