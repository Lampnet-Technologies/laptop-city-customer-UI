import React from "react";
import AdSlider from "../../component/adSlider";
import { Banner } from "../../component/homepage";
import SearchBox from "../../component/searchBox";
import ProductGroups, { Groups } from "../../component/homepage/productGroups";
import Pagination from "../../component/pagination";

const newArrivals = [
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Iphone 14 pro max",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
    category: "new",
    price: "350,000",
  },
  {
    name: "razer-ornata-v3-base",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Alienware-X15-R1-Gaming-Laptop",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Iphone 14 pro max",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
    category: "new",
    price: "350,000",
  },
  {
    name: "razer-ornata-v3-base",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Alienware-X15-R1-Gaming-Laptop",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
    category: "used",
    price: "350,000",
  },
];

const relatedProducts = [
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "razer-ornata-v3-base",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
    category: "used",
    price: "350,000",
  },
  {
    name: "Iphone 14 pro max",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
    category: "new",
    price: "350,000",
  },
  {
    name: "Alienware-X15-R1-Gaming-Laptop",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
    category: "used",
    price: "350,000",
  },
];

function ProductsListing() {
  return (
    <div className="my-4 flex flex-col gap-8">
      <AdSlider />
      <Banner />
      <div>
        <SearchBox />

        <div className="my-5 px-4 flex flex-col justify-between gap-10">
          <Groups
            // heading="New Arrivals"
            products={newArrivals}
          />

          <Pagination />
        </div>

        <div className="mt-20 mb-10 px-4">
          <Groups
            heading="related products"
            products={relatedProducts}
            seeMore
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsListing;
