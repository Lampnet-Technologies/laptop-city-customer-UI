import React, { useContext, useRef, useState } from "react";
import EmptyCart from "./EmptyCart";
import RenderedCart from "./RenderedCart";
import DeleteButtonAlert from "../../component/DeleteButtonAlert";
import {
  CouponDiscount,
  PlaceOrderContext,
  UserCart,
  UserCartDependency,
  LoginContext, // Add this import
} from "../../App";
import CustomAlert from "../../component/CustomAlert";
import CustomSnackbar from "../../component/CustomSnackbar";

function Cart() {
  const { loggedIn, token } = useContext(LoginContext); // Correctly get loggedIn and token
  const [cart, setCart] = useContext(UserCart);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [discount, setDiscount] = useContext(CouponDiscount);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const idRef = useRef();

  const baseUrl = process.env.REACT_APP_BASE_URL

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
    if (!loggedIn || !token) {
      setAlert({
        ...alert,
        open: true,
        severity: "info",
        title: "Please login to update cart",
      });
      return;
    }

    if (quantity === stock) {
      setAlert({
        ...alert,
        open: true,
        severity: "info",
        title: "Maximum stock reached",
      });
      return;
    }

    let newQuantity = quantity + 1;
    const dataToSend = { productId: productId, quantity: newQuantity };

    fetch(
      `${baseUrl}/ecommb-staging/cart-items/edit/${cartId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token, // Use token from context
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setCartDep(quantity);
        setAlert({
          ...alert,
          open: true,
          severity: "success",
          title: "Cart has been updated",
          message: "",
        });
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
  };

  const handleDecreaseQty = (quantity, cartId, productId) => {
    if (!loggedIn || !token) {
      setAlert({
        ...alert,
        open: true,
        severity: "info",
        title: "Please login to update cart",
      });
      return;
    }

    if (quantity === 1) {
      return null;
    }

    let newQuantity = quantity - 1;
    const dataToSend = { productId: productId, quantity: newQuantity };

    fetch(
      `${baseUrl}/ecommb-staging/cart-items/edit/${cartId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token, // Use token from context
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setCartDep(quantity);
        setAlert({
          ...alert,
          open: true,
          severity: "success",
          title: "Cart has been updated",
          message: "",
        });
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
  };

  const handleDelete = (id) => {
    if (!loggedIn || !token) {
      setAlert({
        ...alert,
        open: true,
        severity: "info",
        title: "Please login to delete items",
      });
      return;
    }

    idRef.current = id;
    setDeleteAlert(true);
  };

  const handleDeleteItem = () => {
    setDeleteAlert(false);

    if (!loggedIn || !token) {
      setAlert({
        ...alert,
        open: true,
        severity: "info",
        title: "Please login to delete items",
      });
      return;
    }

    fetch(
      `${baseUrl}/ecommb-staging/cart-items/delete/${idRef.current}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token, // Use token from context
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        setCartDep(idRef.current);
        setAlert({
          ...alert,
          open: true,
          severity: "success",
          title: "Item deleted successfully",
        });
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
    if (!loggedIn || !token) {
      setAlert({
        ...alert,
        open: true,
        severity: "info",
        title: "Please login to apply coupon",
      });
      return;
    }

    const dataToSend = { couponCode: code };

    fetch(`${baseUrl}/ecommb-staging/coupons/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // Use token from context
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
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