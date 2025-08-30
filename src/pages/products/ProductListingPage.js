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

class SimpleCache {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key, data, ttl = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl
    });
  }

  clear() {
    this.cache.clear();
  }
}

// Global cache instance
const apiCache = new SimpleCache();

// ==================== LOADING COMPONENTS ====================

function ProductLoadingFlex({ count = 20 }) {
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[calc(50%-2px)] sm:w-[calc(33.333%-3px)] md:w-[calc(25%-3px)] lg:w-[calc(20%-4px)] h-[240px] rounded-lg border border-[#DADADA] animate-pulse bg-white"
        >
          <div className="h-[140px] rounded-t-lg bg-gray-200 flex justify-center items-center relative p-2">
            <div className="w-10 h-10 bg-gray-300 rounded animate-pulse"></div>
            <div className="absolute top-2 right-2 w-8 h-4 bg-gray-300 rounded-sm animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-2 p-2 h-[80px] justify-between">
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
  const urlParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const brandQuery = urlParams.get("brand");
  const typeQuery = urlParams.get("type");
  const conditionQuery = urlParams.get("condition");
  const myFilter = urlParams.get("filter");

  // ==================== MEMOIZED VALUES ====================

  // Current filter state for cache key and pagination reset detection
  const filterState = useMemo(() => ({
    brandId,
    categoryId,
    productTypeId,
    myFilter
  }), [brandId, categoryId, productTypeId, myFilter]);

  const cacheKey = useMemo(() => {
    return `products_${currentPage}_${brandId}_${categoryId}_${productTypeId}_${myFilter || 'none'}`;
  }, [currentPage, brandId, categoryId, productTypeId, myFilter]);

  // Track if filters have changed to reset pagination
  const [prevFilterState, setPrevFilterState] = useState(filterState);

  // ==================== EVENT HANDLERS ====================

  const handleCloseAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, open: false }));
  }, []);

  const handleOpen = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  // ==================== API UTILITIES ====================

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
          'Cache-Control': 'public, max-age=300'
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

  // ==================== CART & WISHLIST FUNCTIONALITY ====================

  const handleAddToCart = useCallback(async (product) => {
    // Check if user is logged in
    if (!loggedIn || !token) {
      navigate("/login", { state: { previousUrl: location.pathname } });
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/cart-items/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      // Update cart dependency to trigger cart updates
      setCartDep(product.id);

      setAlert({
        open: true,
        severity: "success",
        title: "1 item added to cart",
        message: `${product.name} added to cart`,
      });
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        title: "Failed to add to cart",
        message: error.message || "Unable to add item to cart",
      });
    }
  }, [loggedIn, token, baseUrl, navigate, location.pathname, setCartDep]);

  const handleAddToWishlist = useCallback(async (product) => {
    // Check if user is logged in
    if (!loggedIn || !token) {
      navigate("/login", { state: { previousUrl: location.pathname } });
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/wish-lists/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          basketId: 1,
          productId: product.id,
          quantity: 1
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      setAlert({
        open: true,
        severity: "success",
        title: "Added to wishlist",
        message: `${product.name} added to wishlist`,
      });
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        title: "Failed to add to wishlist",
        message: error.message || "Unable to add item to wishlist",
      });
    }
  }, [loggedIn, token, baseUrl, navigate, location.pathname]);

  // ==================== FILTER RESOLUTION EFFECTS ====================

  // Resolve brand name to brandId
  useEffect(() => {
    if (!brandQuery) {
      setBrandId("");
      return;
    }

    const fetchBrandId = async () => {
      try {
        let brands = apiCache.get("all_brands");
        if (!brands) {
          const response = await fetch(`${baseUrl}/brands`);
          brands = await response.json();
          apiCache.set("all_brands", brands, 10 * 60 * 1000);
        }

        const brand = brands.find(
          (b) => b.name.toLowerCase() === brandQuery.toLowerCase()
        );
        setBrandId(brand ? brand.id : "");
        if (!brand) console.warn("Brand not found for query:", brandQuery);
      } catch (err) {
        console.error("Error fetching brand:", err);
        setBrandId("");
      }
    };
    fetchBrandId();
  }, [brandQuery, baseUrl]);

  // Resolve product type name to productTypeId
  useEffect(() => {
    if (!typeQuery) {
      setProductTypeId("");
      return;
    }

    const fetchProductTypeId = async () => {
      try {
        let types = apiCache.get("all_types");
        if (!types) {
          const response = await fetch(`${baseUrl}/product-types`);
          types = await response.json();
          apiCache.set("all_types", types, 10 * 60 * 1000);
        }
        const type = types.find(
          (t) => t.name.toLowerCase() === typeQuery.toLowerCase()
        );
        setProductTypeId(type ? type.id : "");
        if (!type) console.warn("Product type not found for query:", typeQuery);
      } catch (err) {
        console.error("Error fetching product types:", err);
        setProductTypeId("");
      }
    };
    fetchProductTypeId();
  }, [typeQuery, baseUrl]);

  // Resolve condition to categoryId
  useEffect(() => {
    if (!conditionQuery) {
      setCategoryId("");
      return;
    }

    const fetchCategoryId = async () => {
      try {
        let categories = apiCache.get("all_categories");
        if (!categories) {
          const res = await fetch(`${baseUrl}/categories`);
          categories = await res.json();
          apiCache.set("all_categories", categories, 10 * 60 * 1000);
        }
        const cat = categories.find(
          (c) => c.name.toLowerCase() === conditionQuery.toLowerCase()
        );
        setCategoryId(cat ? cat.id : "");
        if (!cat) console.warn("Unknown condition category:", conditionQuery);
      } catch (err) {
        console.error("Error resolving category ID:", err);
        setCategoryId("");
      }
    };
    fetchCategoryId();
  }, [conditionQuery, baseUrl]);

  // ==================== PAGINATION ====================

  const handleChangePage = useCallback((event, page) => {
    setCurrentPage(page - 1);
    window.scroll({ top: 400, behavior: "smooth" });
  }, []);

  // ==================== FILTER CHANGE DETECTION & PAGINATION RESET ====================

  // Reset page to 0 when filters change
  useEffect(() => {
    const hasFilterChanged = (
      prevFilterState.brandId !== filterState.brandId ||
      prevFilterState.categoryId !== filterState.categoryId ||
      prevFilterState.productTypeId !== filterState.productTypeId ||
      prevFilterState.myFilter !== filterState.myFilter
    );

    if (hasFilterChanged && currentPage !== 0) {
      console.log('🔄 Filters changed, resetting to page 0');
      setCurrentPage(0);
    }

    setPrevFilterState(filterState);
  }, [filterState, prevFilterState, currentPage]);

  // ==================== MAIN DATA LOADING EFFECT ====================

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
                    <LaptopCityButton
                      onClick={() => {
                        setCurrentPage(0); // Reset page when manually applying filters
                        loadProducts(0);
                      }}
                      className="text-sm py-2 px-4"
                    >
                      Apply Filters
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
                        setCurrentPage(0); // Reset page when applying mobile filters
                        loadProducts(0);
                        setShowFilters(false);
                      }}
                      className="text-sm py-2 px-4"
                    >
                      Apply Filters
                    </LaptopCityButton>
                  </div>
                </div>
              )}
            </div>

            {/* ==================== MAIN CONTENT AREA ==================== */}
            <div className="flex-grow">

              {/* Search box */}
              <div className="top-[9%] z-20 bg-white mb-4">
                <SearchBox className="w-full" show={handleOpen} search={handleSearch} />
              </div>

              {/* ==================== PRODUCTS DISPLAY ==================== */}
              {isLoading ? (
                <ProductLoadingFlex count={20} />
              ) : !products || products.length === 0 ? (
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
              {!isLoading && totalPages > 1 && (
                <div className="mt-6 mb-4 flex justify-center">
                  <ThemeProvider theme={theme}>
                    <Pagination
                      count={totalPages}
                      page={currentPage + 1}
                      shape="rounded"
                      color="primary"
                      size="large"
                      onChange={handleChangePage}
                      showFirstButton
                      showLastButton
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