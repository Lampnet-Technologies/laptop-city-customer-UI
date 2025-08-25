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

  // Updated getFetchURL function to use correct parameters
  const getFetchURL = (page) => {
    const params = {
      pageNo: page,
      pageSize: 10, // Changed to 10 to match working endpoint
      sortBy: "id", // Changed to id instead of createdOn
      sortDir: "desc"
    };

    const condition = new URLSearchParams(location.search).get('condition');
    const productType = new URLSearchParams(location.search).get('productType');

    // Handle condition filtering (used/new)
    if (condition) {
      return `${baseUrl}/products/filter-products?${new URLSearchParams({
        ...params,
        condition: condition.toLowerCase()
      })}`;
    }

    // Handle category and brand filtering
    if (categoryId || brandId) {
      return `${baseUrl}/products/filter-products?${new URLSearchParams({
        ...params,
        ...(categoryId && { categoryId }),
        ...(brandId && { brandId })
      })}`;
    }

    // Handle product type filtering
    if (productType) {
      return `${baseUrl}/products/filter-products?${new URLSearchParams({
        ...params,
        productType
      })}`;
    }

    // Default endpoint for all products
    return `${baseUrl}/products/pagination/active?${new URLSearchParams(params)}`;
  };

  // Updated the fetchProducts function with better error handling
  const fetchProducts = async (url) => {
    try {
      // First try OPTIONS request to check endpoint availability
      const optionsResponse = await fetch(url, {
        method: 'OPTIONS',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (optionsResponse.status !== 200) {
        console.warn('OPTIONS request failed, proceeding with GET');
      }

      // Proceed with GET request
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      // Handle 500 error specifically for category filtering
      if (response.status === 500 && url.includes('categoryId')) {
        console.warn('Category filter failed, falling back to default endpoint');
        // Fall back to default endpoint
        const fallbackUrl = `${baseUrl}/products/pagination/active?${new URLSearchParams({
          pageNo: 0,
          pageSize: 10,
          sortBy: "id",
          sortDir: "desc"
        })}`;
        return fetchProducts(fallbackUrl);
      }

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      // Handle different response formats
      if (Array.isArray(data)) {
        return {
          products: data,
          totalPages: Math.ceil(data.length / 10)
        };
      }

      return {
        products: data.content || [],
        totalPages: data.totalPages || Math.ceil((data.totalElements || 0) / 10)
      };

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
          ? `${baseUrl}/products/pagination/active?pageNo=${currentPage}&pageSize=10&condition=${condition}`
          : `${baseUrl}/products/pagination/active?pageNo=${currentPage}&pageSize=10`;

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
        pageSize: 10,
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

  // Update handleFilter function to use correct parameters
  const handleFilter = async () => {
    if (!categoryId && !brandId && !productTypeId) return;

    setIsLoading(true);
    try {
      const params = {
        pageNo: 0,
        pageSize: 10,
        sortBy: "id",
        sortDir: "desc",
        ...(categoryId && { categoryId }),
        ...(brandId && { brandId }),
        ...(productTypeId && { productTypeId })
      };

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
        message: "Failed to apply filters. Please try again."
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
        pageSize: 10,
        sortBy: "id",
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

  // Update handleAddToCart to work for both guest and logged-in users
  const handleAddToCart = async (product) => {
    if (!loggedIn) {
      // For guest users, store cart in localStorage
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      const existingItem = guestCart.find(item => item.productId === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        guestCart.push({
          productId: product.id,
          quantity: 1,
          product: product
        });
      }

      localStorage.setItem('guestCart', JSON.stringify(guestCart));
      setCartDep(prev => prev + 1);

      setAlert({
        open: true,
        severity: 'success',
        title: 'Success',
        message: 'Product added to cart'
      });
      return;
    }

    // For logged-in users, use the API
    try {
      const response = await fetch(`${baseUrl}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      setCartDep(prev => prev + 1);
      setAlert({
        open: true,
        severity: 'success',
        title: 'Success',
        message: 'Product added to cart'
      });
    } catch (error) {
      console.error('Add to cart failed:', error);
      setAlert({
        open: true,
        severity: 'error',
        title: 'Error',
        message: 'Failed to add product to cart'
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

      <div className="my-4 flex flex-col gap-8 lg:my-8">
        <div className="md:mx-12 lg:mx-24">
          <AdSlider />
        </div>

        <Banner />

        {/* Main content area with search and products */}
        <div className="px-4 md:px-12 lg:px-24">

          {/* Desktop and Mobile layouts */}
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Desktop Sidebar - Always visible on desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-[15%] bg-filter-green rounded-lg shadow-md">
                <div className="p-6 flex flex-col gap-8">
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

                  <ProductFilter
                    fetchUrl={`${baseUrl}/product-types`}
                    title="product"
                    checked={productTypeId}
                    setter={setProductTypeId}
                    onChange={handleFilter}
                  />

                  <div className="text-center mt-4">
                    <LaptopCityButton onClick={handleFilter}>
                      Search
                    </LaptopCityButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            <div className="lg:hidden relative">
              {/* Dropdown overlay */}
              {showFilters && (
                <div className="absolute top-20 left-0 w-64 shadow-lg rounded-lg p-4 z-30 bg-filter-green">
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

                  <div className="text-center mt-4">
                    <LaptopCityButton
                      onClick={() => {
                        handleFilter();
                        setShowFilters(false); // close dropdown after applying filter
                      }}
                    >
                      Apply
                    </LaptopCityButton>
                  </div>
                </div>
              )}
            </div>


            {/* Search bar - Always visible on top */}
            <div className="sticky top-[9%] z-20 bg-white mb-6 px-4">
              <SearchBox
                className="w-full"
                show={handleOpen}
                search={handleSearch}
              />

              {/* Products Grid */}
              <div className="flex-grow">
                {isLoading ? (
                  <div className="min-h-[400px] flex justify-center items-center">
                    <Loading />
                  </div>
                ) : !products || products.length === 0 ? (
                  <div className="text-center text-gray-500 text-lg py-8">
                    {brandQuery ? (
                      <>
                        <p>
                          No products found for brand: <strong>{brandQuery}</strong>
                        </p>
                        <button
                          onClick={() => navigate("/products")}
                          className="mt-4 bg-green text-white px-4 py-2 rounded hover:bg-dark-green transition duration-300"
                        >
                          View All Products
                        </button>
                      </>
                    ) : (
                      <p>No products found for this category.</p>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4">
                    {products.map((product) => (
                      <div key={product.id}>
                        <MainGroups
                          addToCart={handleAddToCart}
                          addToWishlist={handleAddToWishlist}
                          products={[product]}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 mb-4 flex justify-center">
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
                )}
              </div>
            </div>
          </div>
        </div>
        {/* End of Desktop and Mobile layouts */}
      </div>
    </Suspense>
  );
}

export default ProductsListing;