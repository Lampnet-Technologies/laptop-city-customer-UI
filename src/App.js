import React from "react";
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
} from "./views/payment";
import Company from "./pages/about";
import { About, PrivacyPolicy, TermsOfUse } from "./views/company";
import PageNotFound from "./pages/404";

function App() {
  return (
    <Router>
      <div className="pt-4 w-full">
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
              <Route element={<Coupons />}>
                <Route path="/coupons/:id" element={<RenderedCoupons />} />
              </Route>
            </Route>
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/successful" element={<OrderSuccessful />} />
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
  );
}

export default App;
