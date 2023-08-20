import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import RenderedCart from "./RenderedCart";
import Loading from "../../component/loading";
import DeleteButtonAlert from "../../component/DeleteButtonAlert";

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
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const idRef = useRef();

  // useEffect(() => {
  //   setCart(localCart);
  // }, []);

  useEffect(() => {
    fetch("https://apps-1.lampnets.com/ecommb-staging/cart-items/my-cart", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCart(result.cartItems);
        setTotal(result.total);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    idRef.current = id;
    setDeleteAlert(true);

    // ** For reference purposes
  };

  const handleDeleteItem = () => {
    console.log(idRef.current);
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
        setDeleteAlert(false);

        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="border border-solid border-green rounded w-full">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-[27px]">
        shopping Cart {cart && `(${cart.length})`}
      </div>

      {/* {isLoading && <Loading />} */}
      {deleteAlert && (
        <DeleteButtonAlert
          setter={setDeleteAlert}
          deleteItem={handleDeleteItem}
        />
      )}

      {/* <div>
        {cart.length < 1 ? (
          <EmptyCart />
        ) : (
          <RenderedCart items={cart} remove={handleDelete} />
        )}
      </div> */}

      <div>
        {cart && cart.length < 1 ? (
          <EmptyCart />
        ) : cart && cart.length > 1 ? (
          <RenderedCart items={cart} remove={handleDelete} />
        ) : null}
      </div>
    </div>
  );
}

export default Cart;
