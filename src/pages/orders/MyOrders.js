import React, { useEffect, useState } from "react";
import EmptyOrders from "./EmptyOrders";
import RenderedOrders from "./RenderedOrders";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../component/CustomAlert";

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

const accessToken = localStorage.getItem("token");

function MyOrders() {
  const [orders, setOrders] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://apps-1.lampnets.com/ecommb-staging/orders/my-orders", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.status != 200) {
          setAlert({
            ...alert,
            open: true,
            severity: "warning",
            title: "Something went wrong",
            message: res.statusText,
          });
        } else {
          return res.json();
        }
        // return res.json();
      })
      .then((result) => {
        setOrders(result);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate("/my-orders/viewOrder/" + id);
  };

  return (
    <div className="border border-solid border-green rounded w-full">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-[27px]">
        my orders
      </div>

      {alert && alert.severity && (
        <CustomAlert
          open={alert.open}
          details={alert}
          close={handleCloseAlert}
        />
      )}

      {!orders && null}

      <div>
        {orders && orders.length < 1 ? (
          <EmptyOrders />
        ) : (
          <RenderedOrders orders={orders} viewDetails={handleViewDetails} />
        )}
      </div>
    </div>
  );
}

export default MyOrders;
