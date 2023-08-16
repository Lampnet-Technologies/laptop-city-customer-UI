import React from "react";
import { Suspense } from "react";
// import { Banner, Categories, ProductGroups } from "../component/homepage";
// import Hero from "../component/homepage/hero";
import { lazy } from "react";
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
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Banner />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ProductGroups />
      </Suspense>

      {/* <div className="bg-yellow-200 p-6 space-x-6 whitespace-nowrap overflow-scroll">
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
        <div className="w-52 h-52 bg-red-300 inline-block"></div>
      </div> */}
    </div>
  );
}

export default Homepage;
