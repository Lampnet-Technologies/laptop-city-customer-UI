import React, { lazy, Suspense } from "react";
import { Hero, Banner, Categories, ProductGroups } from "../component/homepage";
import Loading from "../component/loading";
import Search from "../component/homepage/Search";

// const Hero = lazy(() => import("../component/homepage/hero"));
// const Banner = lazy(() => import("../component/homepage/banner"));
// const Categories = lazy(() => import("../component/homepage/categories"));
// const ProductGroups = lazy(() => import("../component/homepage/productGroups"));

function Homepage() {
  return (
    <div className="my-14 md:my-16 lg:mt-0 ">
      {/* <Suspense fallback={null}> */}
      <Hero />
      <Banner />
      <Search />
      <Categories />
      <ProductGroups />
      {/* </Suspense> */}
    </div>
  );
}

export default Homepage;
