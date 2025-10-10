import React, { createContext, useEffect, useState, useCallback } from "react";
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
 * - LoginContext → holds login state + token + loading states
 * - UserProfileContext → stores user profile
 * - UserCart → stores cart items and total
 * - UserCartDependency → used for refreshing cart after add/remove
 * - PlaceOrderContext → order state when checking out
 * - CouponDiscount → coupon discount applied at checkout
 */
export const LoginContext = createContext({
  loggedIn: false,
  token: null,
  isLoading: false,
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
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Other global states
  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState({ cartItems: null, total: "" });
  const [cartDep, setCartDep] = useState(0);
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
    zipCode: "100001",
    phoneNumber: "",
    shippingMethodId: "",
  });

  // ✅ Centralized function to handle token expiry
  const handleTokenExpiry = useCallback(() => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setToken(null);
    setProfile(null);
    setCart({ cartItems: null, total: "" });
    setIsLoading(false);
  }, []);

  // ✅ Optimized function to fetch both profile and cart data simultaneously
  const fetchUserData = useCallback(async () => {
    if (!loggedIn || !token) {
      setProfile(null);
      setCart({ cartItems: null, total: "" });
      return;
    }

    setIsLoading(true);
    
    try {
      // Fetch both profile and cart data simultaneously
      const [profileResponse, cartResponse] = await Promise.all([
        fetch(`${baseUrl}/profiles/my-profile`, {
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }),
        fetch(`${baseUrl}/cart-items/my-cart`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
      ]);

      // Handle profile response
      if (profileResponse.ok) {
        const profileResult = await profileResponse.json();
        setProfile(profileResult);
      } else if (profileResponse.status === 401) {
        handleTokenExpiry();
        return;
      } else {
        console.error("Failed to fetch profile:", profileResponse.status);
      }

      // Handle cart response
      if (cartResponse.ok) {
        const cartResult = await cartResponse.json();
        setCart({
          cartItems: cartResult.cartItems,
          total: cartResult.total,
        });
      } else if (cartResponse.status === 401) {
        handleTokenExpiry();
        return;
      } else {
        console.error("Failed to fetch cart:", cartResponse.status);
      }

    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [loggedIn, token, baseUrl, handleTokenExpiry]);

  // ✅ Fetch user data when login state or cartDep changes
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, cartDep]);

  // ✅ Sync localStorage with token state
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // ✅ Enhanced login context with loading state
  const loginContextValue = {
    loggedIn,
    setLoggedIn,
    token,
    setToken,
    isLoading,
    refreshUserData: fetchUserData, // Allow components to trigger refresh
  };

  return (
    <LoginContext.Provider value={loginContextValue}>
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