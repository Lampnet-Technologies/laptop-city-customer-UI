import React, { lazy, Suspense } from "react";
import Loading from "../component/loading";

const Hero = lazy(() => import("../component/homepage/hero"));
const Banner = lazy(() => import("../component/homepage/banner"));
const Categories = lazy(() => import("../component/homepage/categories"));
const ProductGroups = lazy(() => import("../component/homepage/productGroups"));

function Homepage() {
  return (
    <div className="my-14 md:my-16 lg:mt-0 ">
      <Suspense fallback={<Loading />}>
        <Hero />
        <Banner />
        <Categories />
        <ProductGroups />
      </Suspense>
    </div>
  );
}

export default Homepage;
