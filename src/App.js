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
import BlogDetails from "./component/blogDetails";
import BrandsGrid from "./pages/products/Brands";
import ProductTypesOverlay from "./pages/products/ProductType";

// Import Base URL from environment variables
const baseUrl = process.env.REACT_APP_BASE_URL;

/**
 * Contexts for global state
 * - LoginContext → holds login state + token
 * - UserProfileContext → stores user profile
 * - UserCart → stores cart items and total
 * - UserCartDependency → used for refreshing cart after add/remove
 * - PlaceOrderContext → order state when checking out
 * - CouponDiscount → coupon discount applied at checkout
 */
export const LoginContext = createContext({
  loggedIn: false,
  token: null,
  setLoggedIn: () => {},
  setToken: () => {},
});

export const UserProfileContext = createContext();
export const UserCart = createContext();
export const UserCartDependency = createContext();
export const PlaceOrderContext = createContext();
export const CouponDiscount = createContext();

function App() {
  // ✅ Login state + token pulled from localStorage
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ Other global states
  const [profile, setProfile] = useState(null); // Initialize as null instead of empty string
  const [cart, setCart] = useState({ cartItems: null, total: "" });
  const [cartDep, setCartDep] = useState(0); // Initialize with 0
  const [discount, setDiscount] = useState(0);

  // Default Nigeria ZIP to prevent checkout issues
  const [placeOrder, setPlaceOrder] = useState({
    couponCode: "",
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    state: "",
    city: "",
    zipCode: "100001", // ✅ Default Nigerian ZIP
    phoneNumber: "",
    shippingMethodId: "",
  });

  // ✅ Fetch user profile if logged in
  useEffect(() => {
    const fetchProfile = async () => {
      if (loggedIn && token) {
        try {
          const response = await fetch(`${baseUrl}/profiles/my-profile`, {
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          });

          if (response.ok) {
            const result = await response.json();
            setProfile(result);
          } else if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("token");
            setLoggedIn(false);
            setToken(null);
            setProfile(null);
          } else {
            console.error("Failed to fetch profile:", response.status);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [loggedIn, token, cartDep]);

  // ✅ Fetch user cart if logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (loggedIn && token) {
        try {
          const response = await fetch(`${baseUrl}/cart-items/my-cart`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            setCart({
              cartItems: result.cartItems,
              total: result.total,
            });
          } else if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("token");
            setLoggedIn(false);
            setToken(null);
          } else {
            console.error("Failed to fetch cart:", response.status);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      } else {
        setCart({ cartItems: null, total: "" });
      }
    };

    fetchCart();
  }, [loggedIn, token, cartDep]);

  // Sync localStorage with state
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
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
                        <Route path="/product/:id" element={<ProductDesc />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetails />} />
                        {/* <Route path="/blog/:slug" element={<SingleBlogPost />} /> */}

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
                          <Route
                            path="/product-type"
                            element={<ProductTypesOverlay />}
                          />
                          <Route path="/brands" element={<BrandsGrid />} />
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