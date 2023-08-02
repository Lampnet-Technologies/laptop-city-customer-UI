import React, { useEffect, useState } from "react";
import EmptyOrders from "./EmptyOrders";
import RenderedOrders from "./RenderedOrders";

const localOrders = [
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: "350,000",
    date: "August 24, 2022",
    shippingStatus: "canceled",
  },
  {
    name: "Iphone 14 pro max",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
    category: "new",
    price: "350,000",
    date: "August 24, 2022",
    shippingStatus: "shipped",
  },
  {
    name: "razer-ornata-v3-base",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
    category: "used",
    price: "350,000",
    date: "August 24, 2022",
    shippingStatus: "pending",
  },
  {
    name: "Alienware-X15-R1-Gaming-Laptop",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
    category: "used",
    price: "350,000",
    date: "August 24, 2022",
    shippingStatus: "delivered",
  },
];

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(localOrders);
  }, []);
  return (
    <div className="border border-solid border-green rounded w-full lg:ml-24">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-[27px]">
        my orders
      </div>

      <div>
        {orders.length < 1 ? (
          <EmptyOrders />
        ) : (
          <RenderedOrders orders={orders} />
        )}
      </div>
    </div>
  );
}

export default MyOrders;
