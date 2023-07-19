import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdSlider from "../../component/adSlider";
import { Banner } from "../../component/homepage";
import SearchBox from "../../component/searchBox";
// import ProductGroups, { Groups } from "../../component/homepage/productGroups";
import Pagination from "../../component/pagination";
import IMAGES from "../../assets";
import NairaSymbol from "../../component/nairaSymbol";

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

const featuredProducts = [
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
  {
    name: "Macbook 13",
    img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
    category: "used",
    price: "350,000",
  },
];

const filters = [
  {
    title: "category",
    filter: ["brand new", "uk used"],
  },
  {
    title: "product type",
    filter: ["phone", "laptop", "desktop", "sound", "accessories", "lifestyle"],
  },
  {
    title: "brand",
    filter: ["hp", "apple", "samsung", "acer", "dell", "toshiba"],
  },
];

function ProductContainer({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-44 h-56 rounded flex flex-col justify-between cursor-pointer border-gray-200 border-tiny border-solid lg:w-60 lg:h-[300px] lg:inline-block lg:space-y-3"
      onClick={() => navigate("/product-desc")}
    >
      <div className="h-32 rounded bg-gray-200 flex justify-center items-center relative lg:h-44">
        <div className="w-4/5 h-4/5 flex justify-center items-center">
          <img
            src={product.img || ""}
            alt={product.name || ""}
            className="max-w-full max-h-full"
          />
        </div>
        <div
          className="bg-green text-white font-medium capitalize w-9 h-4 rounded-sm flex justify-center items-center absolute top-4 right-2 z-40"
          style={{
            fontSize: "10px",
          }}
        >
          {product.category}
        </div>
        <div className="flex justify-center items-center w-3 h-4 absolute bottom-3 right-2 z-40">
          <img
            src={IMAGES.icons.cartSmall}
            alt="cart"
            className="max-w-full w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between h-20 px-2 pb-4 lg:h-24 lg:pt-2">
        <p className="text-xs font-medium capitalize">{product.name}</p>
        <p className="text-base font-bold text-green">
          <NairaSymbol />
          {product.price}
        </p>
      </div>
    </div>
  );
}

function Groups({ heading, products, seeMore }) {
  return (
    <div>
      {heading && (
        <h1 className="text-xl font-semibold capitalize">{heading}</h1>
      )}

      <div className="mt-8 flex flex-wrap justify-around gap-x-2 gap-y-4 md:justify-start md:gap-8 lg:gap-10">
        {products.map((product, index) => {
          return <ProductContainer key={index} product={product} />;
        })}
      </div>

      {seeMore && (
        <div
          style={{
            flexBasis: "100%",
            flexShrink: 0,
          }}
          className="flex justify-end items-center text-sm font-medium mt-4"
        >
          <Link
            to="/products"
            className="flex justify-between items-center hover:text-green hover:font-bold"
          >
            See more <i className="bx bx-chevron-right bx-sm ml-0"></i>
          </Link>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ item }) {
  const [checkedState, setCheckedState] = useState(
    new Array(item.filter.length).fill(false)
  );

  const handleChange = (position, name) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    // ** Fetch products using the {name} to filter
  };

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-lg font-bold capitalize text-center">{item.title}</h4>

      <div className="space-y-2">
        {item.filter &&
          item.filter.map((name, index) => {
            return (
              <div
                key={index}
                className="bg-white p-3 flex items-center gap-4 rounded-md"
              >
                <input
                  type="checkbox"
                  id={`${name}-filter`}
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleChange(index, name)}
                  className="accent-green cursor-pointer caret-green"
                />
                <label
                  htmlFor={`${name}-filter`}
                  className="capitalize text-sm font-semibold cursor-pointer"
                >
                  {name}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function ProductsListing() {
  return (
    <div className="my-4 flex flex-col gap-8 lg:my-16">
      <div className="md:mx-12 lg:mx-24">
        <AdSlider />
      </div>

      <Banner />

      <div className="flex items-start justify-between lg:px-8 lg:mt-6">
        <div className="hidden lg:block w-80 mr-20 bg-filter-green rounded">
          <div className="pt-4 pb-8 px-2 flex flex-col gap-10">
            {filters.map((item, index) => {
              return <FilterGroup item={item} key={index} />;
            })}

            <div className="flex justify-end items-center">
              <button className="flex items-center text-sm">
                View all <i className="bx bx-chevron-right bx-sm"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <SearchBox />

          <div className="my-5 px-2 flex flex-col justify-between gap-10 md:px-6 lg:px-0">
            <Groups products={newArrivals} />

            <Pagination />
          </div>
        </div>
      </div>

      <div className="mt-16 mb-10 px-2 space-y-8 md:mx-12 lg:mx-24 ">
        <Groups
          heading="best selling products"
          products={featuredProducts}
          seeMore
        />
        <Groups heading="recently viewed" products={relatedProducts} seeMore />
      </div>
    </div>
  );
}

export default ProductsListing;
