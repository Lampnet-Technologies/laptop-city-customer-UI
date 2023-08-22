import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { Nav, Footer } from "./layouts";
// import Homepage from "./pages/Homepage";
// import { ProductsListing, ProductDesc } from "./pages/products";
// import Blog from "./pages/blog";
// import SingleBlogPost from "./views/blog/SingleBlogPost";
// import { Login, SignUp } from "./pages/auth";
// import {
//   ContactInfo,
//   PersonalInfo,
//   Profile,
//   ProfileInfo,
//   ProfileMenu,
// } from "./pages/profile";
// import { Coupons, RenderedCoupons } from "./pages/coupon";
// import Payment from "./pages/payment";
// import { OrderSuccessful, TrackOrder } from "./views/payment";
// import Company from "./pages/about";
// import { About, PrivacyPolicy, TermsOfUse } from "./views/company";
// import PageNotFound from "./pages/404";
// import { Cart } from "./pages/cart";
// import { MyOrders } from "./pages/orders";
import { lazy } from "react";
import { Suspense } from "react";
import Loading from "./component/loading";
// import OrderDetails from "./pages/orders/OrderDetails";

export const LoginContext = createContext();
export const UserProfileContext = createContext();

const Homepage = lazy(() => import("./pages/Homepage"));
const ProductsListing = lazy(() =>
  import("./pages/products/ProductListingPage")
);
const ProductDesc = lazy(() => import("./pages/products/ProductDescPage"));

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.token ? true : false);
  const [profile, setProfile] = useState("");

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
    // <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
    //   <UserProfileContext.Provider value={[profile, setProfile]}>
    //     <Router>
    //       {/* <Suspense fallback={<Loading />}> */}
    //       <div className="w-full max-w-[1600px] mx-auto">
    //         <ScrollToTop />
    //         <Nav />

    //         <Suspense fallback={<Loading />}>
    //           <div className="pb-10 w-full">
    //             hello
    //             {/* <Routes>
    //               <Route path="/" element={<Homepage />} />
    //               <Route path="/products" element={<ProductsListing />} />
    //               <Route path="/product-desc/:id" element={<ProductDesc />} />
    //               <Route path="/blog" element={<Blog />} />
    //               <Route path="/blog/:slug" element={<SingleBlogPost />} />
    //               <Route path="/login" element={<Login />} />
    //               <Route path="/signup" element={<SignUp />} />
    //               <Route element={<Profile />}>
    //                 <Route path="/profile" element={<ProfileMenu />} />
    //                 <Route element={<ProfileInfo />}>
    //                   <Route path="/personal-info" element={<PersonalInfo />} />
    //                   <Route path="/contact-info" element={<ContactInfo />} />
    //                 </Route>
    //                 <Route
    //                   path="/my-orders/viewOrder/:id"
    //                   element={<OrderDetails />}
    //                 />
    //                 <Route path="/my-orders" element={<MyOrders />} />
    //                 <Route path="/shopping-cart" element={<Cart />} />
    //                 <Route element={<Coupons />}>
    //                   <Route path="/coupons" element={<RenderedCoupons />} />
    //                 </Route>
    //               </Route>
    //               <Route path="/payment" element={<Payment />} />
    //               <Route
    //                 path="/payment/successful"
    //                 element={<OrderSuccessful />}
    //               />
    //               <Route path="/track-order/:id" element={<TrackOrder />} />
    //               <Route element={<Company />}>
    //                 <Route path="/about" element={<About />} />
    //                 <Route
    //                   path="/terms-&-conditions"
    //                   element={<TermsOfUse />}
    //                 />
    //                 <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    //               </Route>
    //               <Route path="*" element={<PageNotFound />} />
    //             </Routes> */}
    //           </div>
    //         </Suspense>

    //         <Footer />
    //       </div>
    //       {/* </Suspense> */}
    //     </Router>
    //   </UserProfileContext.Provider>
    // </LoginContext.Provider>
    <div>Hello test</div>
  );
}

export default App;
