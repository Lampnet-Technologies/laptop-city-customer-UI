import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdSlider from "../../component/adSlider";
import { Banner } from "../../component/homepage";
import SearchBox from "../../component/searchBox";
// import ProductGroups, { Groups } from "../../component/homepage/productGroups";
// import Pagination from "../../component/pagination";
import IMAGES from "../../assets";
import NairaSymbol from "../../component/nairaSymbol";
import Loading from "../../component/loading";
import LaptopCityButton from "../../component/button";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// const newArrivals = [
//   {
//     name: "Macbook 13",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Iphone 14 pro max",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
//     category: "new",
//     price: "350,000",
//   },
//   {
//     name: "razer-ornata-v3-base",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Alienware-X15-R1-Gaming-Laptop",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Macbook 13",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Iphone 14 pro max",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
//     category: "new",
//     price: "350,000",
//   },
//   {
//     name: "razer-ornata-v3-base",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Alienware-X15-R1-Gaming-Laptop",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
//     category: "used",
//     price: "350,000",
//   },
// ];

// const relatedProducts = [
//   {
//     name: "Macbook 13",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "razer-ornata-v3-base",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Iphone 14 pro max",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
//     category: "new",
//     price: "350,000",
//   },
//   {
//     name: "Alienware-X15-R1-Gaming-Laptop",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
//     category: "used",
//     price: "350,000",
//   },
// ];

// const featuredProducts = [
//   {
//     name: "razer-ornata-v3-base",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1686146167/razer-ornata-v3-base_l7g65h.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Iphone 14 pro max",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1683740253/avgro2nmfefnd998cuuc.png",
//     category: "new",
//     price: "350,000",
//   },

//   {
//     name: "Alienware-X15-R1-Gaming-Laptop",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Dell_Alienware_X15_R1_Gaming_Laptop_vliv4z.png",
//     category: "used",
//     price: "350,000",
//   },
//   {
//     name: "Macbook 13",
//     img: "https://res.cloudinary.com/dikleyjwz/image/upload/v1684764831/Products/Macbook_3_bwnzmy.png",
//     category: "used",
//     price: "350,000",
//   },
// ];

const filters = [
  {
    title: "categorries",
    filter: ["brand new", "uk used"],
  },
  {
    title: "product",
    filter: ["phone", "laptop", "desktop", "sound", "accessories", "lifestyle"],
  },
  {
    title: "brand",
    filter: ["hp", "apple", "samsung", "acer", "dell", "toshiba"],
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#009F7F",
    },
  },
});

function ProductContainer({ product }) {
  const navigate = useNavigate();

  const handleProductDesc = (id) => {
    navigate("/product-desc/" + id);
  };

  return (
    <div
      className="w-[170px] h-56 rounded flex flex-col justify-between cursor-pointer border-[#DADADA] border-tiny border-solid md:w-52 lg:w-60 lg:h-[300px]"
      onClick={() => handleProductDesc(product.id)}
    >
      <div className="h-32 rounded bg-[#D9D9D9] flex justify-center items-center relative lg:h-44">
        {product.images && (
          <div className="w-4/5 h-4/5 flex justify-center items-center">
            {product.images.length >= 1 ? (
              <img
                src={product.images[0].image}
                alt={product.name || ""}
                className="max-w-full max-h-full"
              />
            ) : (
              <img
                src={IMAGES.icons.cartGreen}
                alt={""}
                className="max-w-full max-h-full w-[50px]"
              />
            )}
          </div>
        )}
        <div
          className="bg-green text-white font-medium capitalize w-9 h-4 rounded-sm flex justify-center items-center absolute top-4 right-2 z-10"
          style={{
            fontSize: "10px",
          }}
        >
          {product.category == "BRAND NEW" ? "new" : "used"}
        </div>
        <div className="flex justify-center items-center w-3 h-4 absolute bottom-3 right-2 z-10">
          <img
            src={IMAGES.icons.cartSmall}
            alt="cart"
            className="max-w-full w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-between h-20 px-2 pb-3 lg:h-28 lg:pt-2">
        <p className="text-xs md:text-sm font-medium capitalize">
          {product.name}
        </p>
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
    <div className="max-w-full w-fit">
      {heading && (
        <h1 className="text-xl font-semibold capitalize lg:text-2xl">
          {heading}
        </h1>
      )}

      <div className="mt-8 lg:mt-14 flex flex-wrap justify-around gap-x-2 gap-y-4 md:justify-start md:gap-8 lg:gap-y-10">
        {products &&
          products.map((product, index) => {
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
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-bold capitalize text-center">{item.title}</h4>

      <div className="space-y-3">
        {item.filter &&
          item.filter.map((name, index) => {
            return (
              <div
                key={index}
                className="bg-white py-5 px-4 flex items-center gap-5 rounded-md"
              >
                <input
                  type="checkbox"
                  id={`${name}-filter`}
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleChange(index, name)}
                  className="accent-green cursor-pointer caret-green w-[18px] h-[18px] lg:w-5 lg:h-5"
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
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(null);
  const [bestSelling, setBestSelling] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const checkScreenSize = () => {
    if (window.innerWidth >= 1500) {
      return 5;
    } else {
      return 4;
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/products/pagination/active?pageNo=${currentPage}&pageSize=12&sortBy=createdOn&sortDir=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setProducts(result.content);
        setTotalPages(result.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error();
      });
  }, [currentPage]);

  useEffect(() => {
    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/products/best-selling?pageNo=0&pageSize=${checkScreenSize()}`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setBestSelling(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/products/reviewed?pageNo=0&pageSize=${checkScreenSize()}&sortBy=createdOn&sortDir=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setRecentlyViewed(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  const handleSearch = (searchTerm) => {
    setIsLoading(true);

    const encoded = encodeURI(searchTerm);

    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/products/search?pageNo=0&pageSize=12&query=${encoded}&sortBy=id&sortDir=asc`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setProducts(result.content);
        setTotalPages(result.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page - 1);
  };

  const handleOpen = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className="my-4 flex flex-col gap-8 lg:my-16">
      <div className="md:mx-12 lg:mx-24">
        <AdSlider />
      </div>

      <Banner />

      <div className="flex items-start justify-between lg:px-8 lg:mt-6 mb-8">
        <div className="hidden lg:block w-80 mr-20 bg-filter-green rounded">
          <div className="pt-4 pb-8 px-3 flex flex-col gap-10">
            {filters.map((item, index) => {
              return <FilterGroup item={item} key={index} />;
            })}

            <div className="flex justify-end items-center">
              <button className="flex items-center text-sm">
                View all <i className="bx bx-chevron-right bx-sm"></i>
              </button>
            </div>

            <div className="text-center lg:mt-4 lg:mb-2">
              <LaptopCityButton>search</LaptopCityButton>
            </div>
          </div>
        </div>

        <div className="w-full md:pl-4 lg:pl-0">
          <div className="sticky top-[10%] z-20 bg-filter-green md:relative md:bg-transparent">
            <SearchBox show={handleOpen} search={handleSearch} />

            {showFilters ? (
              <div>
                <div
                  id="mobileFilter"
                  className={
                    showFilters ? "#mobileFilter active" : "#mobileFilter"
                  }
                >
                  {/* <div className="h-full flex flex-col gap-6"> */}
                  {filters.map((item, index) => {
                    return <FilterGroup item={item} key={index} />;
                  })}

                  <div className="flex justify-end items-center">
                    <button className="flex items-center text-sm">
                      View all <i className="bx bx-chevron-right bx-sm"></i>
                    </button>
                  </div>
                  {/* </div> */}

                  <div className="text-center mt-3 mb-5">
                    <LaptopCityButton>search</LaptopCityButton>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {isLoading && <Loading />}

          <div className="my-5 px-2 flex flex-col justify-between gap-10 md:px-6 lg:px-0">
            <Groups products={products} />
          </div>
        </div>
      </div>

      {/* {products && ( */}
      {/* <Pagination
        currentPage={currentPage}
        totalCount={totalPages}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page - 1)}
      /> */}
      {/* )} */}

      <div className="w-full flex justify-center items-center">
        <ThemeProvider theme={theme}>
          <Pagination
            // sx={{ backgroundColor: "red" }}
            count={totalPages}
            shape="rounded"
            color="primary"
            size="large"
            onChange={handleChangePage}
            renderItem={(item) => (
              <PaginationItem
                sx={{
                  backgroundColor: (theme) => `${theme.palette.grey[200]}`,
                  mx: "4px",
                }}
                {...item}
              />
            )}
          />
        </ThemeProvider>
      </div>

      <div className="mt-16 mb-10 px-2 space-y-8 md:mx-12 lg:mt-24 lg:mx-24 ">
        <Groups
          heading="best selling products"
          products={bestSelling}
          seeMore
        />
        <Groups heading="recently viewed" products={recentlyViewed} seeMore />
      </div>
    </div>
  );
}

export default ProductsListing;
