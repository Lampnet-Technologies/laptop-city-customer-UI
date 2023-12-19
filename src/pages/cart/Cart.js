import React, { useContext, useRef, useState } from "react";
import EmptyCart from "./EmptyCart";
import RenderedCart from "./RenderedCart";
import DeleteButtonAlert from "../../component/DeleteButtonAlert";
import {
  CouponDiscount,
  PlaceOrderContext,
  UserCart,
  UserCartDependency,
} from "../../App";
import CustomAlert from "../../component/CustomAlert";
import CustomSnackbar from "../../component/CustomSnackbar";

const accessToken = localStorage.getItem("token");

function Cart() {
  const [cart, setCart] = useContext(UserCart);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [discount, setDiscount] = useContext(CouponDiscount);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const idRef = useRef();

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });

  const [toast, setToast] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

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
          if (res.status == 200 || res.status == 201) {
            setCartDep(quantity);
            setAlert({
              ...alert,
              open: true,
              severity: "success",
              title: "Cart has been updated",
              message: "",
            });
          } else if (res.status == 401) {
            setAlert({
              ...alert,
              open: true,
              severity: "info",
              title: "Please login again",
            });
          }
        })
        .catch((error) => {
          setAlert({
            ...alert,
            open: true,
            severity: "error",
            title: "Couldn't update cart item",
            message: error.message,
          });
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
          if (res.status == 200 || res.status == 201) {
            setCartDep(quantity);
            setAlert({
              ...alert,
              open: true,
              severity: "success",
              title: "Cart has been updated",
              message: "",
            });
          } else if (res.status == 401) {
            setAlert({
              ...alert,
              open: true,
              severity: "info",
              title: "Please login again",
            });
          }
        })
        .catch((error) => {
          setAlert({
            ...alert,
            open: true,
            severity: "error",
            title: "Couldn't update cart item",
            message: error.message,
          });
        });
    }
  };

  const handleDelete = (id) => {
    idRef.current = id;
    setDeleteAlert(true);
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
        setCartDep(idRef.current);
      })
      .catch((error) => {
        setAlert({
          ...alert,
          open: true,
          severity: "error",
          title: "Couldn't delete item",
          message: error.message,
        });
      });
  };

  const verifyCoupon = (code) => {
    const dataToSend = { couponCode: code };

    fetch("https://apps-1.lampnets.com/ecommb-staging/coupons/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw Error();
        } else {
          return res.json();
        }
      })
      .then((result) => {
        setPlaceOrder({ ...placeOrder, ...dataToSend });
        setDiscount(result.discountValue);
        setAlert({
          ...alert,
          open: true,
          severity: "success",
          title: "Your coupon has been successfully added",
          message: `Coupon with discount value: ₦${result.discountValue}`,
        });
      })
      .catch((error) => {
        setToast({
          ...toast,
          open: true,
          severity: "warning",
          message: "Invalid coupon code!",
        });
      });
  };

  return (
    <div className="border border-solid border-green rounded w-full">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-[27px]">
        shopping Cart {cart.cartItems && `(${cart.cartItems.length})`}
      </div>

      {deleteAlert && (
        <DeleteButtonAlert
          setter={setDeleteAlert}
          deleteItem={handleDeleteItem}
          location="cart"
        />
      )}

      {alert && alert.severity && (
        <CustomAlert
          open={alert.open}
          details={alert}
          close={handleCloseAlert}
        />
      )}

      {toast && toast.severity && (
        <CustomSnackbar
          open={toast.open}
          close={handleCloseToast}
          toast={toast}
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
            verifyCoupon={verifyCoupon}
          />
        )}
      </div>
    </div>
  );
}

export default Cart;
