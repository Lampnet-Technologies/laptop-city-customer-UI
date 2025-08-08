import React, { lazy, Suspense, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton } from "@mui/material";

import Loading from "../../component/loading";
import LaptopCityButton from "../../component/button";
import ScrollToTop from "../../utils/ScrollToTop";
import { LoginContext, UserCartDependency } from "../../App";
import CustomAlert from "../../component/CustomAlert";
import ProductTypes from "./ProductType";
import BrandsGrid from "./Brands";

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
  const { loggedIn, token } = useContext(LoginContext);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productTypeId, setProductTypeId] = useState("");
  const [showProductType, setShowProductType] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const location = useLocation();
  const navigate = useNavigate();
  const brandQuery = new URLSearchParams(location.search).get("brand");

  const myFilter = new URLSearchParams(location.search).get("filter");

  const getFetchURL = (page) => {
    if (myFilter === "new_products") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/customers/category/1/active?pageNo=${page}&pageSize=12&sortBy=createdOn&sortDir=desc`;
    } else if (myFilter === "used_products") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/customers/category/2/active?pageNo=${page}&pageSize=12&sortBy=createdOn&sortDir=desc`;
    } else if (myFilter === "new arrivals") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/pagination/active?pageNo=${page}&pageSize=12&sortBy=createdOn&sortDir=desc`;
    } else if (myFilter === "best selling products") {
      return `https://apps-1.lampnets.com/ecommb-staging/products/best-selling?pageNo=${page}&pageSize=12`;
    } else if (myFilter === "recently viewed") {
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
      .then((res) => res.json())
      .then((result) => {
        let filteredProducts = result.content;

        if (brandQuery) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              (product.brand &&
                product.brand
                  .toLowerCase()
                  .includes(brandQuery.toLowerCase())) ||
              (product.name &&
                product.name.toLowerCase().includes(brandQuery.toLowerCase()))
          );
        }

        setProducts(filteredProducts);
        setTotalPages(result.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [currentPage, myFilter, brandQuery]);

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

  const viewAll = () => {
    setIsLoading(true);
    setBrandId("");
    setCategoryId("");
    setProductTypeId("");

    fetch(
      "https://apps-1.lampnets.com/ecommb-staging/products/pagination/active?pageNo=0&pageSize=12&sortBy=createdOn&sortDir=desc"
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
        console.error();
      });
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page - 1);
    window.scroll({
      top: 400,
      behavior: "smooth",
    });
  };

  const handleOpen = () => {
    setShowFilters((prev) => !prev);
  };

  const handleAddToCart = (product) => {
    const dataToSend = { productId: product.id, quantity: 1 };

   if (!token) {
        console.error("No authentication token found. User not logged in.");
        // Redirect to login or show an error
        navigate("/login");
        return;
    }
  // Now proceed with your fetch call.
    fetch("https://apps-1.lampnets.com/ecommb-prod/cart-items/add", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token, // This should now work
        },
        body: JSON.stringify(dataToSend),
    })
    // ...
    if (!loggedIn || !token) { 
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    } else {
      fetch("https://apps-1.lampnets.com/ecommb-prod/cart-items/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token, 
        },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => {
          if (!res.ok) { 
            setAlert({
              ...alert,
              open: true,
              severity: "info",
              title: "Item was not added to cart",
            });
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          setCartDep(product.id);
          setAlert({
            ...alert,
            open: true,
            severity: "success",
            title: "1 item added to cart",
            message: `${product.name} is added to cart`,
          });
        })
        .catch((error) => {
          setAlert({
            ...alert,
            open: true,
            severity: "error",
            title: "Failed to add item to cart",
            message: error.message,
          });
        });
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />

      {alert && alert.severity && (
        <CustomAlert
          open={alert.open}
          details={alert}
          close={handleCloseAlert}
        />
      )}

      <div className="my-4 flex flex-col gap-8 lg:my-16">
        <div className="md:mx-12 lg:mx-24">
          <AdSlider />
        </div>

        <Banner />

        <div className="flex items-start justify-between lg:px-8 lg:mt-6 mb-8">
          {/* Side bar for product filter */}
          <div
            className="filterDesktop hidden lg:block w-80 max-h-[1300px] overflow-y-auto mr-20 bg-filter-green rounded"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            <div className="pb-8 px-3 flex flex-col gap-10">
              {/* Filter Sections */}
              <div className="mt-3 text-right">
                <ProductFilter
                  fetchUrl="https://apps-1.lampnets.com/ecommb-prod/categories"
                  title="category"
                  checked={categoryId}
                  setter={setCategoryId}
                  onChange={handleFilter}
                />

                <ProductFilter
                  fetchUrl="https://apps-1.lampnets.com/ecommb-prod/brands"
                  title="brands"
                  checked={brandId}
                  setter={setBrandId}
                  onChange={handleFilter}
                />

                {/* <ProductFilter
                  fetchUrl="https://apps-1.lampnets.com/ecommb-prod/product-types"
                  title="product"
                  checked={productTypeId}
                  setter={setProductTypeId}
                  onChange={handleFilter}
                /> */}
              </div>

              <div className="flex justify-end items-center">
                <button className="flex items-center text-sm" onClick={viewAll}>
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

          {/* Product cards displayed */}
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
                      fetchUrl="https://apps-1.lampnets.com/ecommb-prod/categories"
                      title="category"
                      checked={categoryId}
                      setter={setCategoryId}
                    />
                    <ProductFilter
                      fetchUrl="https://apps-1.lampnets.com/ecommb-prod/brands"
                      title="brands"
                      checked={brandId}
                      setter={setBrandId}
                    />
                    <ProductFilter
                      fetchUrl="https://apps-1.lampnets.com/ecommb-prod/product-types"
                      title="product"
                      checked={productTypeId}
                      setter={setProductTypeId}
                    />

                    <div className="flex justify-end  items-center">
                      <button
                        type="button"
                        onClick={() => {
                          handleOpen();
                          viewAll();
                        }}
                        className="flex items-center text-sm"
                      >
                        View all <i className="bx bx-chevron-right bx-sm"></i>
                      </button>
                    </div>

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
            ) : !products || products.length === 0 ? (
              <div className="text-center text-gray-500 text-lg flex flex-col gap-4 items-center">
                {brandQuery ? (
                  <>
                    <p>
                      No products found for brand: <strong>{brandQuery}</strong>
                    </p>
                    <button
                      onClick={() => navigate("/products")}
                      className="bg-green text-white px-4 py-2 rounded hover:bg-dark-green transition duration-300"
                    >
                      View All Products
                    </button>
                  </>
                ) : (
                  <p>No products found for this category.</p>
                )}
              </div>
            ) : (
              <MainGroups addToCart={handleAddToCart} products={products} />
            )}

            {/* {showProductType && (
              <ProductTypes onClose={() => setShowProductType(false)} />
            )} */}
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <ThemeProvider theme={theme}>
            <Pagination
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

        {/* <SubProducts addToCart={handleAddToCart} /> */}
      </div>
    </Suspense>
  );
}

export default ProductsListing;