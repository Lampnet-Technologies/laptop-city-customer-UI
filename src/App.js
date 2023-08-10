import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { Nav, Footer } from "./layouts";
import Homepage from "./pages/Homepage";
import { ProductsListing, ProductDesc } from "./pages/products";
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
import {
  OrderReview,
  OrderSuccessful,
  PaymentMethod,
  ShippingAddress,
  ShippingMethod,
  TrackOrder,
} from "./views/payment";
import Company from "./pages/about";
import { About, PrivacyPolicy, TermsOfUse } from "./views/company";
import PageNotFound from "./pages/404";
import { Cart } from "./pages/cart";
import { MyOrders } from "./pages/orders";

export const LoginContext = createContext();
export const UserProfileContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.token ? true : false);
  const [profile, setProfile] = useState("");

  // useEffect(() => {
  //   if (localStorage.token) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, []);

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
  }, [loggedIn]);

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <UserProfileContext.Provider value={[profile, setProfile]}>
        <Router>
          <div className="w-full">
            <ScrollToTop />
            <Nav />

            <div className="pb-10">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products" element={<ProductsListing />} />
                <Route path="/product-desc" element={<ProductDesc />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<SingleBlogPost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<Profile />}>
                  <Route path="/profile" element={<ProfileMenu />} />
                  <Route element={<ProfileInfo />}>
                    <Route path="/personal-info" element={<PersonalInfo />} />
                    <Route path="/contact-info" element={<ContactInfo />} />
                  </Route>
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/shopping-cart/:id" element={<Cart />} />
                  <Route element={<Coupons />}>
                    {/* <Route element={<RenderedCoupons />} /> */}
                    <Route path="/coupons" element={<RenderedCoupons />} />
                  </Route>
                </Route>
                <Route path="/payment" element={<Payment />} />
                <Route
                  path="/payment/successful"
                  element={<OrderSuccessful />}
                />
                <Route path="/track-order/:id" element={<TrackOrder />} />
                {/* <Route element={<Payment />}>
              <Route
                path="/payment/shipping-address"
                element={<ShippingAddress />}
              />
              <Route
                path="/payment/shipping-method"
                element={<ShippingMethod />}
              />
              <Route
                path="/payment/payment-method"
                element={<PaymentMethod />}
              />
              <Route path="/payment/review-order" element={<OrderReview />} />
              <Route path="/payment/successful" element={<OrderSuccessful />} />
            </Route> */}
                <Route element={<Company />}>
                  <Route path="/about" element={<About />} />
                  <Route path="/terms-&-conditions" element={<TermsOfUse />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </Router>
      </UserProfileContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
