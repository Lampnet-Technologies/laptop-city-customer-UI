import React, { useEffect, useState, useRef, useContext } from "react";
import EmptyWishlist from "./EmptyWishlist";
import RenderedWishlist from "./RenderedWishlist";
import CustomSnackbar from "../../component/CustomSnackbar";
import DeleteButtonAlert from "../../component/DeleteButtonAlert";
import { UserCartDependency, LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";

function MyWishlists() {
  const { loggedIn, token } = useContext(LoginContext);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [wishlists, setWishlists] = useState(null);
  const [wishlistDep, setWishlistDep] = useState();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const idRef = useRef();
  
  // This is the missing line.
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if logged in and a token is available
    if (!loggedIn || !token) {
      setWishlists([]);
      return;
    }

    fetch("https://apps-1.lampnets.com/ecommb-staging/wish-lists/my-wishlist", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setWishlists(result);
      })
      .catch((error) => {
        console.error("Failed to fetch wishlists:", error);
      });
  }, [wishlistDep, loggedIn, token]);

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleAddToCart = (id, quantity) => {
    const dataToSend = { productId: id, quantity: quantity };

    if (!loggedIn || !token) {
      navigate("/login", {
        state: {
          previousUrl: "/wishlist", // You can set this URL
        },
      });
      return;
    }
    
    fetch("https://apps-1.lampnets.com/ecommb-staging/cart-items/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setCartDep(id);
        setToast({
          ...toast,
          open: true,
          severity: "success",
          message: "product is added to cart",
        });
      })
      .catch((error) => {
        setToast({
          ...toast,
          open: true,
          severity: "error",
          message: "Failed to add item to cart",
        });
      });
  };

  const handleDelete = (id) => {
    idRef.current = id;
    setDeleteAlert(true);
  };

  const handleDeleteItem = () => {
    setDeleteAlert(false);

    if (!loggedIn || !token) {
      setToast({
        ...toast,
        open: true,
        severity: "info",
        message: "Please log in to delete items from your wishlist.",
      });
      return;
    }

    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/wish-lists/remove/${idRef.current}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setToast({
            ...toast,
            open: true,
            severity: "success",
            message: "product removed from wishlist",
          });
          setWishlistDep(idRef.current);
        } else {
          setToast({
            ...toast,
            open: true,
            severity: "error",
            message: "Couldn't remove product",
          });
        }
      })
      .catch((error) => {
        setToast({
          ...toast,
          open: true,
          severity: "error",
          message: "Couldn't remove product",
        });
      });
  };

  return (
    <div className="border border-solid border-green rounded w-full">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-[27px]">
        wishlisted items
      </div>

      {deleteAlert && (
        <DeleteButtonAlert
          setter={setDeleteAlert}
          deleteItem={handleDeleteItem}
          location="wishlist"
        />
      )}

      {toast && toast.severity && (
        <CustomSnackbar
          open={toast.open}
          close={handleCloseToast}
          toast={toast}
        />
      )}

      {!wishlists && null}

      <div>
        {wishlists && wishlists.length < 1 ? (
          <EmptyWishlist />
        ) : (
          <RenderedWishlist
            items={wishlists}
            addToCart={handleAddToCart}
            deleteItem={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
export default MyWishlists;