import { lazy, Suspense, useEffect, useState, useContext } from "react";
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

const baseUrl = process.env.REACT_APP_BASE_URL;

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

  // Add a helper function to validate and format query parameters
  const formatQueryParams = (params) => {
    const validParams = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        validParams[key] = value;
      }
    });

    return new URLSearchParams(validParams).toString();
  };

  // Update getFetchURL function
  const getFetchURL = (page) => {
    const condition = new URLSearchParams(location.search).get('condition');
    const baseEndpoint = `${baseUrl}/products`;

    const params = {
      pageNo: page,
      pageSize: 10,
      sortBy: "createdOn",
      sortDir: "desc"
    };

    // Handle condition parameter first
    if (condition) {
      return `${baseEndpoint}/filter-products?${formatQueryParams({
        ...params,
        condition: condition.toLowerCase()
      })}`;
    }

    // Product type specific endpoint
    if (productTypeId) {
      return `${baseEndpoint}/product-type/${productTypeId}/${formatQueryParams(params)}`;
    }

    // Combined filtering
    if (brandId || categoryId) {
      return `${baseEndpoint}/filter-products?${formatQueryParams({
        ...params,
        brandId,
        categoryId
      })}`;
    }

    // Special lists
    if (myFilter === "best selling products") {
      return `${baseEndpoint}/best-selling?${formatQueryParams(params)}`;
    }

    if (myFilter === "recently viewed") {
      return `${baseEndpoint}/reviewed?${formatQueryParams(params)}`;
    }

    // Search functionality
    if (brandQuery) {
      return `${baseEndpoint}/search?query=${encodeURIComponent(brandQuery)}&${formatQueryParams(params)}`;
    }

    // Default active products
    return `${baseEndpoint}/pagination/active?${formatQueryParams(params)}`;
  };

  // Update the fetchProducts function with better error handling and fallbacks
  const fetchProducts = async (url, retryCount = 0) => {
    const maxRetries = 2;

    try {
      console.log(`Fetching products from: ${url}`);

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers,
        signal: AbortSignal.timeout(15000), // 15 second timeout
      });

      if (!response.ok) {
        // If the filter endpoint fails, try the default endpoint
        if (response.status === 500 && retryCount === 0) {
          const fallbackUrl = `${baseUrl}/products/pagination/active?pageNo=${currentPage}&pageSize=12`;
          console.log('Filter endpoint failed, trying default endpoint:', fallbackUrl);
          return fetchProducts(fallbackUrl, retryCount + 1);
        }

        // If still failing after retry, throw error
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Handle different response formats
      let products = [];
      let totalPages = 0;

      if (Array.isArray(data)) {
        products = data;
        totalPages = Math.ceil(data.length / 12);
      } else if (data.content && Array.isArray(data.content)) {
        products = data.content;
        totalPages = data.totalPages || Math.ceil(data.totalElements / 12);
      }

      return { products, totalPages };

    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Return empty state rather than throwing
      return { products: [], totalPages: 0 };
    }
  };

  // Update the data fetching useEffect
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);

      try {
        let url = new URL(getFetchURL(currentPage));
        const condition = url.searchParams.get('condition');

        // Determine correct endpoint
        const endpoint = condition
          ? `${baseUrl}/products/pagination/active?pageNo=${currentPage}&pageSize=12&condition=${condition}`
          : `${baseUrl}/products/pagination/active?pageNo=${currentPage}&pageSize=12`;

        const { products, totalPages } = await fetchProducts(endpoint);

        setProducts(products);
        setTotalPages(totalPages);

        // Show SubProducts component if no main products
        if (products.length === 0) {
          setShowProductType(true);
        }

      } catch (error) {
        console.error('Error loading products:', error);
        setAlert({
          open: true,
          severity: 'error',
          title: 'Error',
          message: 'Failed to load products. Please try again later.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, location.search]);

  // ✅ Search API with better error handling
  const handleSearch = async (searchTerm) => {
    if (!searchTerm?.trim()) return;

    setIsLoading(true);
    try {
      const params = {
        pageNo: 0,
        pageSize: 12,
        query: searchTerm.trim(),
        sortBy: "createdOn",
        sortDir: "desc"
      };

      const url = `${baseUrl}/products/search?${formatQueryParams(params)}`;
      const { products: searchResults, totalPages } = await fetchProducts(url);

      setProducts(searchResults);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Search failed:", error);
      setAlert({
        open: true,
        severity: "error",
        title: "Search Error",
        message: error.message || "Search failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update handleFilter to use filter-products endpoint
  const handleFilter = async () => {
    const params = {
      pageNo: 0,
      pageSize: 12,
      sortBy: "createdOn",
      sortDir: "desc",
      categoryId,
      brandId,
      productTypeId
    };

    if (!categoryId && !brandId && !productTypeId) return;

    setIsLoading(true);
    try {
      const url = `${baseUrl}/products/filter-products?${formatQueryParams(params)}`;
      const { products: filteredProducts, totalPages } = await fetchProducts(url);

      setProducts(filteredProducts);
      setTotalPages(totalPages);
      setCurrentPage(0);
    } catch (error) {
      console.error("Filter operation failed:", error);
      setAlert({
        open: true,
        severity: "error",
        title: "Filter Error",
        message: error.message || "Failed to apply filters. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // View All with better error handling - Updated to use correct API endpoint
  const viewAll = async () => {
    setIsLoading(true);
    setBrandId("");
    setCategoryId("");
    setProductTypeId("");

    try {
      const params = {
        pageNo: 0,
        pageSize: 12,
        sortBy: "createdOn",
        sortDir: "desc"
      };

      const url = `${baseUrl}/products/pagination/active?${formatQueryParams(params)}`;
      const { products: allProducts, totalPages } = await fetchProducts(url);

      setProducts(allProducts);
      setTotalPages(totalPages);
      setCurrentPage(0);
    } catch (error) {
      console.error("Failed to load all products:", error);
      setAlert({
        open: true,
        severity: "error",
        title: "Error",
        message: error.message || "Failed to load all products. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
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

  const handleAddToCart = async (product) => {
    if (!token) {
      setAlert({
        open: true,
        severity: "info",
        title: "Login Required",
        message: "Please log in to add items to your cart",
      });
      navigate("/login");
      return;
    }

    const dataToSend = { productId: product.id, quantity: 1 };

    try {
      const response = await fetch(`${baseUrl}/cart-items/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        let errorMessage = `Failed to add item to cart: ${response.status}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorData?.error || errorMessage;
        } catch (parseError) {
          // Use default error message if can't parse response
        }

        throw new Error(errorMessage);
      }

      // Check if response has content
      const responseText = await response.text();
      let result = null;

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          // Response might not be JSON, which is okay for some APIs
          console.log("Add to cart response is not JSON:", responseText);
        }
      }

      setCartDep(product.id);
      setAlert({
        open: true,
        severity: "success",
        title: "Success!",
        message: `${product.name} has been added to your cart`,
      });

    } catch (error) {
      console.error("Add to cart failed:", error);
      setAlert({
        open: true,
        severity: "error",
        title: "Failed to add item to cart",
        message: error.message || "Unable to add item to cart. Please try again.",
      });
    }
  };

  // Add wishlist functionality
  const handleAddToWishlist = async (product) => {
    if (!token) {
      setAlert({
        open: true,
        severity: "info",
        title: "Login Required",
        message: "Please log in to add items to your wishlist",
      });
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/wish-lists/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!response.ok) {
        let errorMessage = `Failed to add to wishlist: ${response.status}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorData?.error || errorMessage;
        } catch (parseError) {
          // Use default error message
        }

        throw new Error(errorMessage);
      }

      setAlert({
        open: true,
        severity: "success",
        title: "Added to Wishlist!",
        message: `${product.name} has been added to your wishlist`,
      });

    } catch (error) {
      console.error("Add to wishlist failed:", error);
      setAlert({
        open: true,
        severity: "error",
        title: "Failed to add to wishlist",
        message: error.message || "Unable to add item to wishlist. Please try again.",
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
          {/* Sidebar filters */}
          <div className="filterDesktop hidden lg:block w-80 max-h-[1300px] overflow-y-auto mr-20 bg-filter-green rounded">
            <div className="pb-8 px-3 flex flex-col gap-10">
              <div className="mt-3 text-right">
                <ProductFilter
                  fetchUrl={`${baseUrl}/categories`}
                  title="category"
                  checked={categoryId}
                  setter={setCategoryId}
                  onChange={handleFilter}
                />

                <ProductFilter
                  fetchUrl={`${baseUrl}/brands`}
                  title="brands"
                  checked={brandId}
                  setter={setBrandId}
                  onChange={handleFilter}
                />
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

          {/* Product cards */}
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
                      fetchUrl={`${baseUrl}/categories`}
                      title="category"
                      checked={categoryId}
                      setter={setCategoryId}
                    />
                    <ProductFilter
                      fetchUrl={`${baseUrl}/brands`}
                      title="brands"
                      checked={brandId}
                      setter={setBrandId}
                    />
                    <ProductFilter
                      fetchUrl={`${baseUrl}/product-types`}
                      title="product"
                      checked={productTypeId}
                      setter={setProductTypeId}
                    />

                    <div className="flex justify-end items-center">
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
              <MainGroups
                addToCart={handleAddToCart}
                addToWishlist={handleAddToWishlist}
                products={products}
              />
            )}
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
      </div>
    </Suspense>
  );
}

export default ProductsListing;