import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { Nav, Footer } from "./layouts";
import Blog from "./pages/blog";
import SingleBlogPost from "./views/blog/SingleBlogPost";
import { Login, SignUp } from "./pages/auth";
import {
  ContactInfo,
  PersonalInfo,
  Profile,
  ProfileInfo,
  ProfileMenu,
} from "./pages/profile";
import { Coupons, RenderedCoupons } from "./pages/coupon";
import Payment from "./pages/payment";
import { OrderSuccessful, TrackOrder } from "./views/payment";
import Company from "./pages/about";
import { About, PrivacyPolicy, TermsOfUse } from "./views/company";
import PageNotFound from "./pages/404";
import { Cart } from "./pages/cart";
import { MyOrders } from "./pages/orders";
import OrderDetails from "./pages/orders/OrderDetails";

import Homepage from "./pages/Homepage";
import ProductsListing from "./pages/products/ProductListingPage";
import ProductDesc from "./pages/products/ProductDescPage";
import { MyWishlists } from "./pages/wishlist";

export const LoginContext = createContext();
export const UserProfileContext = createContext();
export const UserCart = createContext();
export const UserCartDependency = createContext();
export const PlaceOrderContext = createContext();
export const CouponDiscount = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.token ? true : false);
  const [profile, setProfile] = useState("");
  const [cart, setCart] = useState({ cartItems: null, total: "" });
  const [cartDep, setCartDep] = useState();
  const [discount, setDiscount] = useState(0);
  const [placeOrder, setPlaceOrder] = useState({
    couponCode: "",
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    state: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    shippingMethodId: "",
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (loggedIn) {
      fetch("https://apps-1.lampnets.com/ecommb-staging/profiles/my-profile", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setProfile(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn, cartDep]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (loggedIn) {
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
          setCart({
            ...cart,
            cartItems: result.cartItems,
            total: result.total,
          });
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [loggedIn, cartDep]);

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <UserProfileContext.Provider value={[profile, setProfile]}>
        <UserCart.Provider value={[cart, setCart]}>
          <UserCartDependency.Provider value={[cartDep, setCartDep]}>
            <PlaceOrderContext.Provider value={[placeOrder, setPlaceOrder]}>
              <CouponDiscount.Provider value={[discount, setDiscount]}>
                <Router>
                  <div className="w-full max-w-[1600px] mx-auto">
                    <ScrollToTop />
                    <Nav />

                    <div className="pb-10 w-full">
                      <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/products" element={<ProductsListing />} />
                        <Route
                          path="/product-desc/:id"
                          element={<ProductDesc />}
                        />
                        <Route path="/blog" element={<Blog />} />
                        <Route
                          path="/blog/:slug"
                          element={<SingleBlogPost />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route element={<Profile />}>
                          <Route path="/profile" element={<ProfileMenu />} />
                          <Route element={<ProfileInfo />}>
                            <Route
                              path="/personal-info"
                              element={<PersonalInfo />}
                            />
                            <Route
                              path="/contact-info"
                              element={<ContactInfo />}
                            />
                          </Route>
                          <Route
                            path="/my-orders/viewOrder/:id"
                            element={<OrderDetails />}
                          />
                          <Route path="/my-orders" element={<MyOrders />} />
                          <Route path="/shopping-cart" element={<Cart />} />
                          <Route element={<Coupons />}>
                            <Route
                              path="/coupons"
                              element={<RenderedCoupons />}
                            />
                          </Route>
                          <Route path="/wishlist" element={<MyWishlists />} />
                        </Route>
                        <Route path="/payment" element={<Payment />} />
                        <Route
                          path="/payment/successful"
                          element={<OrderSuccessful />}
                        />
                        <Route
                          path="/track-order/:id"
                          element={<TrackOrder />}
                        />
                        <Route element={<Company />}>
                          <Route path="/about" element={<About />} />
                          <Route
                            path="/terms-&-conditions"
                            element={<TermsOfUse />}
                          />
                          <Route
                            path="/privacy-policy"
                            element={<PrivacyPolicy />}
                          />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                      </Routes>
                    </div>

                    <Footer />
                  </div>
                </Router>
              </CouponDiscount.Provider>
            </PlaceOrderContext.Provider>
          </UserCartDependency.Provider>
        </UserCart.Provider>
      </UserProfileContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
