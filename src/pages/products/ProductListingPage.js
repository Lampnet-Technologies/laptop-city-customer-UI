import { lazy, Suspense, useEffect, useState, useContext, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Loading from "../../component/loading";
import LaptopCityButton from "../../component/button";
import ScrollToTop from "../../utils/ScrollToTop";
import { LoginContext, UserCartDependency } from "../../App";
import CustomAlert from "../../component/CustomAlert";
import EmptyState from "../../component/EmptyState";

// Lazy loaded components for better initial page load
const AdSlider = lazy(() => import("../../component/adSlider"));
const Banner = lazy(() => import("../../component/homepage/banner"));
const ProductFilter = lazy(() => import("../../component/ProductFilter"));
const SearchBox = lazy(() => import("../../component/searchBox"));
const MainGroups = lazy(() => import("../../views/products/MainGroups"));

// MUI theme configuration
const theme = createTheme({
  palette: {
    primary: { main: "#009F7F" },
  },
});

const baseUrl = process.env.REACT_APP_BASE_URL;

// ==================== CACHING UTILITIES ====================

/**
 * Simple in-memory cache with TTL (Time To Live)
 * Stores API responses to reduce backend calls and improve performance
 */
class SimpleCache {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Get cached data if it exists and hasn't expired
   * @param {string} key - Cache key
   * @returns {any|null} - Cached data or null if expired/not found
   */
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * Set cache data with expiration time
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {number} ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set(key, data, ttl = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl
    });
  }

  /**
   * Clear all cached data
   */
  clear() {
    this.cache.clear();
  }
}

// Global cache instance
const apiCache = new SimpleCache();

// ==================== LOADING COMPONENTS ====================

/**
 * Loading skeleton for products in flex layout
 * Shows animated placeholders while products load
 * @param {Object} props
 * @param {number} props.count - Number of skeleton items to show
 */
function ProductLoadingFlex({ count = 8 }) {
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[calc(50%-2px)] sm:w-[calc(33.333%-3px)] md:w-[calc(25%-3px)] lg:w-[calc(20%-4px)] aspect-[4/5] rounded-lg border border-[#DADADA] animate-pulse bg-white"
        >
          {/* Product image placeholder */}
          <div className="flex-1 rounded-t-lg bg-gray-200 flex justify-center items-center relative p-2">
            <div className="w-10 h-10 bg-gray-300 rounded animate-pulse"></div>
            <div className="absolute top-2 right-2 w-8 h-4 bg-gray-300 rounded-sm animate-pulse"></div>
          </div>
          {/* Product details placeholder */}
          <div className="flex flex-col gap-2 p-2 min-h-[80px] justify-between">
            <div className="space-y-1">
              <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

function ProductsListing() {
  // ==================== CONTEXT & STATE ====================

  const { loggedIn, token } = useContext(LoginContext);
  const [cartDep, setCartDep] = useContext(UserCartDependency);

  // UI State
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });

  // Products State
  const [products, setProducts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Filter State
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productTypeId, setProductTypeId] = useState("");

  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // URL parameters
  const brandQuery = new URLSearchParams(location.search).get("brand");
  const myFilter = new URLSearchParams(location.search).get("filter");

  // ==================== MEMOIZED VALUES ====================

  /**
   * Generate cache key based on current filters and search parameters
   * This ensures we cache different combinations separately
   */
  const cacheKey = useMemo(() => {
    return `products_${currentPage}_${brandId}_${categoryId}_${productTypeId}_${myFilter || 'none'}`;
  }, [currentPage, brandId, categoryId, productTypeId, myFilter]);

  // ==================== EVENT HANDLERS ====================

  const handleCloseAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, open: false }));
  }, []);

  const handleOpen = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  // ==================== API UTILITIES ====================

  /**
   * Enhanced fetch wrapper with caching and error handling
   * @param {string} url - API endpoint URL
   * @param {string} cacheKey - Cache key for storing response
   * @param {number} cacheTTL - Cache time to live in milliseconds
   * @returns {Promise<Object>} - Object with products array and totalPages
   */
  const fetchProducts = useCallback(async (url, cacheKey, cacheTTL = 5 * 60 * 1000) => {
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached) {
      console.log('🎯 Cache hit for:', cacheKey);
      return cached;
    }

    try {
      console.log('🌐 Fetching from API:', url);
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          // Add cache control headers to leverage browser caching
          'Cache-Control': 'public, max-age=300' // 5 minutes browser cache
        }
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      // Normalize response format
      let result;
      if (Array.isArray(data)) {
        result = {
          products: data,
          totalPages: Math.ceil(data.length / 20)
        };
      } else {
        result = {
          products: data.content || [],
          totalPages: data.totalPages || Math.ceil((data.totalElements || 0) / 20),
        };
      }

      // Cache the result
      apiCache.set(cacheKey, result, cacheTTL);
      console.log('💾 Cached result for:', cacheKey);

      return result;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return { products: [], totalPages: 0 };
    }
  }, []);

  // ==================== SEARCH FUNCTIONALITY ====================

  /**
   * Handle search functionality with caching
   * @param {string} searchTerm - Search query
   * @param {number} page - Page number (default: 0)
   */
  const handleSearch = useCallback(async (searchTerm, page = 0) => {
    if (!searchTerm?.trim()) return;

    setIsLoading(true);

    try {
      const url = `${baseUrl}/products/search?pageNo=${page}&pageSize=20&query=${encodeURIComponent(
        searchTerm.trim()
      )}&sortBy=id&sortDir=desc`;

      const searchCacheKey = `search_${encodeURIComponent(searchTerm.trim())}_${page}`;
      const { products: searchResults, totalPages } = await fetchProducts(url, searchCacheKey);

      setProducts(searchResults);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        title: "Search Error",
        message: error.message || "Search failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts, baseUrl]);

  // ==================== PRODUCT LOADING ====================

  /**
   * Load products with filters, includes caching for better performance
   * @param {number} page - Page number (default: 0)
   */
  const loadProducts = useCallback(async (page = 0) => {
    setIsLoading(true);

    try {
      let url = `${baseUrl}/products/pagination/active?pageNo=${page}&pageSize=20&sortBy=id&sortDir=desc`;

      // Apply filters if any are selected
      if (brandId || categoryId || productTypeId) {
        const params = new URLSearchParams({
          pageNo: page,
          pageSize: 20,
          sortBy: "id",
          sortDir: "desc",
          ...(categoryId && { categoryId }),
          ...(brandId && { brandId }),
          ...(productTypeId && { productTypeId }),
        });
        url = `${baseUrl}/products/filter-products?${params}`;
      }

      const productsCacheKey = `products_${page}_${brandId}_${categoryId}_${productTypeId}`;
      const { products, totalPages } = await fetchProducts(url, productsCacheKey);

      setProducts(products);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        title: "Error",
        message: "Failed to load products.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts, baseUrl, brandId, categoryId, productTypeId]);

  // ==================== CART FUNCTIONALITY ====================

  /**
   * Add product to cart (guest or authenticated user)
   * Handles both localStorage for guests and API calls for logged-in users
   * @param {Object} product - Product object to add to cart
   */
  const handleAddToCart = useCallback(async (product) => {
    // Guest user - use localStorage
    if (!loggedIn) {
      try {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const existingItem = guestCart.find((item) => item.productId === product.id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          guestCart.push({ productId: product.id, quantity: 1, product });
        }

        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        setCartDep((prev) => prev + 1);

        setAlert({
          open: true,
          severity: "success",
          title: "Success",
          message: "Product added to cart",
        });
      } catch (error) {
        setAlert({
          open: true,
          severity: "error",
          title: "Error",
          message: "Failed to add product to cart",
        });
      }
      return;
    }

    // Authenticated user - use API
    try {
      const response = await fetch(`${baseUrl}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      setCartDep((prev) => prev + 1);
      setAlert({
        open: true,
        severity: "success",
        title: "Success",
        message: "Product added to cart",
      });
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        title: "Error",
        message: "Failed to add product to cart",
      });
    }
  }, [loggedIn, token, baseUrl, setCartDep]);

  // ==================== WISHLIST FUNCTIONALITY ====================

  /**
   * Add product to wishlist (requires authentication)
   * @param {Object} product - Product object to add to wishlist
   */
  const handleAddToWishlist = useCallback(async (product) => {
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!response.ok) throw new Error("Failed to add to wishlist");

      setAlert({
        open: true,
        severity: "success",
        title: "Added to Wishlist!",
        message: `${product.name} has been added to your wishlist`,
      });
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        title: "Failed to add to wishlist",
        message: error.message || "Unable to add item to wishlist. Please try again.",
      });
    }
  }, [token, baseUrl, navigate]);

  // ==================== PAGINATION ====================

  /**
   * Handle page change in pagination
   * @param {Event} event - Pagination click event
   * @param {number} page - New page number (1-based)
   */
  const handleChangePage = useCallback((event, page) => {
    setCurrentPage(page - 1);
    // Smooth scroll to top of products section
    window.scroll({ top: 400, behavior: "smooth" });
  }, []);

  // ==================== EFFECTS ====================

  /**
   * Main effect to load products based on current state
   * Switches between search and normal product loading
   */
  useEffect(() => {
    if (myFilter) {
      handleSearch(myFilter, currentPage);
    } else {
      loadProducts(currentPage);
    }
  }, [currentPage, myFilter, brandId, categoryId, productTypeId, handleSearch, loadProducts]);

  // ==================== RENDER ====================

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />

      {/* Alert notifications */}
      {alert && alert.severity && (
        <CustomAlert open={alert.open} details={alert} close={handleCloseAlert} />
      )}

      <div className="my-4 flex flex-col gap-2 lg:my-6">
        {/* Advertisement slider */}
        <div className="md:mx-8 lg:mx-16">
          <AdSlider />
        </div>

        {/* Main banner */}
        <Banner />

        <div className="px-2 md:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:gap-6">

            {/* ==================== DESKTOP SIDEBAR FILTERS ==================== */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-[15%] bg-filter-green rounded-lg shadow-md">
                <div className="p-4 flex flex-col gap-6">
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

                  <div className="text-center mt-2">
                    <LaptopCityButton onClick={() => loadProducts(0)} className="text-sm py-2 px-4">
                      Search
                    </LaptopCityButton>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== MOBILE FILTERS DROPDOWN ==================== */}
            <div className="lg:hidden relative">
              {showFilters && (
                <div className="absolute top-16 left-0 w-64 shadow-lg rounded-lg p-4 z-30 bg-filter-green">
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
                        loadProducts(0);
                        setShowFilters(false);
                      }}
                      className="text-sm py-2 px-4"
                    >
                      Apply
                    </LaptopCityButton>
                  </div>
                </div>
              )}
            </div>

            {/* ==================== MAIN CONTENT AREA ==================== */}
            <div className="flex-grow">

              {/* Search box - sticky on scroll */}
              <div className="top-[9%] z-20 bg-white mb-4">
                <SearchBox className="w-full" show={handleOpen} search={handleSearch} />
              </div>

              {/* ==================== PRODUCTS DISPLAY ==================== */}
              {isLoading ? (
                // Loading state - show skeleton
                <ProductLoadingFlex count={20} />
              ) : !products || products.length === 0 ? (
                // Empty state - no products found
                <EmptyState
                  message={
                    brandQuery
                      ? `No products found for brand: ${brandQuery}`
                      : myFilter
                        ? `No products found for "${myFilter}"`
                        : "No products found."
                  }
                />
              ) : (
                // Products display - flex layout with minimal spacing
                <div className="flex flex-wrap gap-1">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-[calc(50%-2px)] sm:w-[calc(33.333%-3px)] md:w-[calc(25%-3px)] lg:w-[calc(20%-4px)]"
                    >
                      <MainGroups
                        addToCart={handleAddToCart}
                        addToWishlist={handleAddToWishlist}
                        products={[product]}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ==================== PAGINATION ==================== */}
              {totalPages > 1 && (
                <div className="mt-6 mb-4 flex justify-center">
                  <ThemeProvider theme={theme}>
                    <Pagination
                      count={totalPages}
                      page={currentPage + 1}
                      shape="rounded"
                      color="primary"
                      size="large"
                      onChange={handleChangePage}
                      renderItem={(item) => (
                        <PaginationItem
                          sx={{
                            backgroundColor: (theme) => `${theme.palette.grey[200]}`,
                            mx: "2px",
                            minWidth: "36px",
                            height: "36px"
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
    </Suspense>
  );
}

export default ProductsListing;