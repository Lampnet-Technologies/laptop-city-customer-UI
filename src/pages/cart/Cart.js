import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import RenderedCart from "./RenderedCart";
import Loading from "../../component/loading";
import DeleteButtonAlert from "../../component/DeleteButtonAlert";
import { UserCart } from "../../App";
import CustomAlert from "../../component/CustomAlert";

const localCart = [
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: 350000,
    brand:
      "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764541/apple-logo_v1oqh1.png",
    quantity: 1,
  },
  {
    name: "Alienware-X15-R1-Gaming-Laptop",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
    category: "new",
    price: 350000,
    brand:
      "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764541/Alienware-Logo_vvili4.png",
    quantity: 1,
  },
];

const activeStyles = ({ isActive }) => {
  if (isActive) {
    return {
      color: "#FFFFFF",
      fontWeight: 600,
      backgroundColor: "#009F7F",
    };
  }
};

const accessToken = localStorage.getItem("token");

function Cart() {
  const [cart, setCart] = useContext(UserCart);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const idRef = useRef();

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleIncreaseQty = (quantity, cartId, productId, stock) => {
    if (quantity == stock) {
      return null;
    } else {
      let newQuantity = quantity + 1;

      const dataToSend = { productId: productId, quantity: newQuantity };

      fetch(
        `https://apps-1.lampnets.com/ecommb-staging/cart-items/edit/${cartId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(dataToSend),
        }
      )
        .then((res) => {
          console.log("product quantity increased");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleDecreaseQty = (quantity, cartId, productId) => {
    if (quantity == 1) {
      return null;
    } else {
      let newQuantity = quantity - 1;

      const dataToSend = { productId: productId, quantity: newQuantity };

      fetch(
        `https://apps-1.lampnets.com/ecommb-staging/cart-items/edit/${cartId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(dataToSend),
        }
      )
        .then((res) => {
          console.log("product quantity decreased");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleDelete = (id) => {
    idRef.current = id;
    setDeleteAlert(true);

    // ** For reference purposes
  };

  const handleDeleteItem = () => {
    setDeleteAlert(false);

    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/cart-items/delete/${idRef.current}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          setAlert({
            ...alert,
            open: true,
            severity: "error",
            title: "Couldn't delete item",
            message: res.statusText,
          });
        }
      })
      .catch((error) => {
        setAlert({
          ...alert,
          open: true,
          severity: "error",
          title: "Couldn't delete item",
          message: error.message,
        });
        // alert(error.message);
      });
  };

  return (
    <div className="border border-solid border-green rounded w-full">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-[27px]">
        shopping Cart {cart.cartItems && `(${cart.cartItems.length})`}
      </div>

      {/* {isLoading && <Loading />} */}
      {deleteAlert && (
        <DeleteButtonAlert
          setter={setDeleteAlert}
          deleteItem={handleDeleteItem}
        />
      )}

      {alert && alert.severity && (
        <CustomAlert
          open={alert.open}
          details={alert}
          close={handleCloseAlert}
        />
      )}

      {!cart.cartItems && null}

      <div>
        {cart.cartItems && cart.cartItems.length < 1 ? (
          <EmptyCart />
        ) : (
          <RenderedCart
            total={cart.total}
            items={cart.cartItems}
            remove={handleDelete}
            incrQty={handleIncreaseQty}
            decrQty={handleDecreaseQty}
          />
        )}
      </div>
    </div>
  );
}

export default Cart;
