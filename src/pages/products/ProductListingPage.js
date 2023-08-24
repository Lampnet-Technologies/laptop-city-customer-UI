import React, { lazy, Suspense, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton } from "@mui/material";

import Loading from "../../component/loading";
import LaptopCityButton from "../../component/button";
import ScrollToTop from "../../utils/ScrollToTop";
import { LoginContext } from "../../App";

const AdSlider = lazy(() => import("../../component/adSlider"));
const Banner = lazy(() => import("../../component/homepage/banner"));
const ProductFilter = lazy(() => import("../../component/ProductFilter"));
const SearchBox = lazy(() => import("../../component/searchBox"));
const MainGroups = lazy(() => import("../../views/products/MainGroups"));
const SubProducts = lazy(() => import("../../views/products/SubProducts"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#009F7F",
    },
  },
});

function ProductsListing() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productTypeId, setProductTypeId] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const myFilter = new URLSearchParams(location.search).get("filter");

  const getFetchURL = (page) => {
    if (myFilter == "new_products") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/customers/category/1/active?pageNo=${page}&pageSize=12&sortBy=createdOn&sortDir=desc`;
    } else if (myFilter == "used_products") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/customers/category/2/active?pageNo=${page}&pageSize=12&sortBy=createdOn&sortDir=desc`;
    } else if (myFilter == "new arrivals") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/pagination/active?pageNo=${page}&pageSize=12&sortBy=createdOn&sortDir=desc`;
    } else if (myFilter == "best selling products") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/best-selling?pageNo=${page}&pageSize=12`;
    } else if (myFilter == "recently viewed") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/reviewed?pageNo=${page}&pageSize=12&sortBy=createdOn&sortDir=desc`;
    } else if (myFilter) {
      const encoded = encodeURI(myFilter);
      return `https://apps-1.lampnets.com/ecommb-staging/products/search?pageNo=${page}&pageSize=12&query=${encoded}&sortBy=id&sortDir=asc`;
    } else if (myFilter === null) {
      return `https://apps-1.lampnets.com/ecommb-staging/products/pagination/active?pageNo=${page}&pageSize=12&sortBy=createdOn&sortDir=desc`;
    }
  };

  useEffect(() => {
    const url = getFetchURL(currentPage);

    setIsLoading(true);

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // window.scrollTo(0, 0);
        setProducts(result.content);
        setTotalPages(result.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error();
      });
  }, [currentPage, myFilter]);

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
        setProducts(result.content);
        setTotalPages(result.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  const handleFilter = () => {
    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/products/filter-products?${
        brandId && `brandId=${brandId}`
      }${categoryId && `&categoryId=${categoryId}`}&pageNo=0&pageSize=12${
        productTypeId && `&productTypeId=${productTypeId}`
      }&sortBy=id&sortDir=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setProducts(result.content);
        setTotalPages(result.totalPages);
        setCurrentPage(result.pageNo);
      })
      .catch((error) => {
        console.error();
      });
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page - 1);
  };

  const handleOpen = () => {
    setShowFilters((prev) => !prev);
  };

  const handleAddToCart = (product) => {
    const dataToSend = { productId: product.id, quantity: 1 };

    const accessToken = localStorage.getItem("token");

    if (!loggedIn) {
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    } else {
      fetch("https://apps-1.lampnets.com/ecommb-staging/cart-items/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => {
          if (res.status == 200) {
            alert(`${product.name} is added to cart`);
          } else {
            alert("Item was not added to cart");
          }
        })
        .catch((error) => {
          alert("Failed to add to cart" + error.message);
        });
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />

      <div className="my-4 flex flex-col gap-8 lg:my-16">
        <div className="md:mx-12 lg:mx-24">
          <AdSlider />
        </div>

        <Banner />

        <div className="flex items-start justify-between lg:px-8 lg:mt-6 mb-8">
          <div
            className="filterDesktop hidden lg:block w-80 max-h-[1300px] overflow-y-auto mr-20 bg-filter-green rounded"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            <div className="m-2 mt-3 text-right">
              <IconButton onClick={handleFilter} title="click to send filter">
                <i className="bx bxs-send text-green"></i>
              </IconButton>
            </div>

            <div className="pb-8 px-3 flex flex-col gap-10">
              <ProductFilter
                fetchUrl="https://apps-1.lampnets.com/ecommb-staging/categories"
                title="category"
                checked={categoryId}
                setter={setCategoryId}
              />
              <ProductFilter
                fetchUrl="https://apps-1.lampnets.com/ecommb-staging/brands"
                title="brands"
                checked={brandId}
                setter={setBrandId}
              />
              <ProductFilter
                fetchUrl="https://apps-1.lampnets.com/ecommb-staging/product-types"
                title="product"
                checked={productTypeId}
                setter={setProductTypeId}
              />

              <div className="flex justify-end items-center">
                <button
                  className="flex items-center text-sm"
                  onClick={() => {
                    handleOpen();
                    navigate("/products");
                  }}
                >
                  View all <i className="bx bx-chevron-right bx-sm"></i>
                </button>
              </div>

              <div className="text-center lg:mt-4 lg:mb-2">
                <LaptopCityButton onClick={handleFilter}>
                  search
                </LaptopCityButton>
              </div>
            </div>
          </div>

          <div className="w-full md:pl-4 lg:pl-0">
            <div className="sticky top-[9%] z-20 bg-filter-green md:relative md:bg-transparent">
              <SearchBox show={handleOpen} search={handleSearch} />

              {showFilters ? (
                <div>
                  <div
                    id="mobileFilter"
                    className={
                      showFilters ? "#mobileFilter active" : "#mobileFilter"
                    }
                  >
                    <ProductFilter
                      fetchUrl="https://apps-1.lampnets.com/ecommb-staging/categories"
                      title="category"
                      checked={categoryId}
                      setter={setCategoryId}
                    />
                    <ProductFilter
                      fetchUrl="https://apps-1.lampnets.com/ecommb-staging/brands"
                      title="brands"
                      checked={brandId}
                      setter={setBrandId}
                    />
                    <ProductFilter
                      fetchUrl="https://apps-1.lampnets.com/ecommb-staging/product-types"
                      title="product"
                      checked={productTypeId}
                      setter={setProductTypeId}
                    />

                    <div className="flex justify-end items-center">
                      <button
                        type="button"
                        onClick={() => {
                          handleOpen();
                          navigate("/products");
                        }}
                        className="flex items-center text-sm"
                      >
                        View all <i className="bx bx-chevron-right bx-sm"></i>
                      </button>
                    </div>
                    {/* </div> */}

                    <div className="text-center mt-3 mb-5 sticky bottom-0 bg-filter-green py-4">
                      <LaptopCityButton
                        onClick={() => {
                          handleOpen();
                          handleFilter();
                        }}
                      >
                        search
                      </LaptopCityButton>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* {isLoading && <Loading />} */}

            <div className="my-5 px-2 flex flex-col justify-between gap-10 md:px-6 lg:px-0">
              {isLoading ? (
                <div className="lg:h-screen flex justify-center items-center">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-8 border-solid border-green bg-transparent flex justify-center items-center loader">
                    <div className="w-full h-full rounded-full bg-transparent"></div>
                    <div
                      style={{ top: "-10px" }}
                      className="w-5 h-5 absolute bg-[#fbfbfb] z-50"
                    ></div>
                  </div>
                </div>
              ) : (
                <MainGroups addToCart={handleAddToCart} products={products} />
              )}
              {/* <MainGroups products={products} /> */}
            </div>
          </div>
        </div>

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

        <SubProducts addToCart={handleAddToCart} />
      </div>
    </Suspense>
  );
}

export default ProductsListing;
