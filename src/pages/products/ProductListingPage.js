import { lazy, Suspense, useEffect, useState, useContext } from "react";
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

const AdSlider = lazy(() => import("../../component/adSlider"));
const Banner = lazy(() => import("../../component/homepage/banner"));
const ProductFilter = lazy(() => import("../../component/ProductFilter"));
const SearchBox = lazy(() => import("../../component/searchBox"));
const MainGroups = lazy(() => import("../../views/products/MainGroups"));

const theme = createTheme({
  palette: {
    primary: { main: "#009F7F" },
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
  const [isLoading, setIsLoading] = useState(true);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const brandQuery = new URLSearchParams(location.search).get("brand");
  const myFilter = new URLSearchParams(location.search).get("filter");

  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  // Helper: fetch wrapper
  const fetchProducts = async (url) => {
    try {
      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        return { products: data, totalPages: Math.ceil(data.length / 10) };
      }

      return {
        products: data.content || [],
        totalPages: data.totalPages || Math.ceil((data.totalElements || 0) / 10),
      };
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return { products: [], totalPages: 0 };
    }
  };

  // ✅ Search API
  const handleSearch = async (searchTerm, page = 0) => {
    if (!searchTerm?.trim()) return;

    setIsLoading(true);
    try {
      const url = `${baseUrl}/products/search?pageNo=${page}&pageSize=10&query=${encodeURIComponent(
        searchTerm.trim()
      )}&sortBy=id&sortDir=desc`;

      const { products: searchResults, totalPages } = await fetchProducts(url);
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
  };

  // ✅ Normal loading / filters
  const loadProducts = async (page = 0) => {
    setIsLoading(true);
    try {
      let url = `${baseUrl}/products/pagination/active?pageNo=${page}&pageSize=10&sortBy=id&sortDir=desc`;

      if (brandId || categoryId || productTypeId) {
        const params = new URLSearchParams({
          pageNo: page,
          pageSize: 10,
          sortBy: "id",
          sortDir: "desc",
          ...(categoryId && { categoryId }),
          ...(brandId && { brandId }),
          ...(productTypeId && { productTypeId }),
        });
        url = `${baseUrl}/products/filter-products?${params}`;
      }

      const { products, totalPages } = await fetchProducts(url);
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
  };

  // ✅ useEffect: switch between search or normal load
  useEffect(() => {
    if (myFilter) {
      handleSearch(myFilter, currentPage);
    } else {
      loadProducts(currentPage);
    }
  }, [currentPage, myFilter, brandId, categoryId, productTypeId]);

  // Pagination
  const handleChangePage = (event, page) => {
    setCurrentPage(page - 1);
    window.scroll({ top: 400, behavior: "smooth" });
  };

  const handleOpen = () => setShowFilters((prev) => !prev);

  // ✅ Add to Cart
  const handleAddToCart = async (product) => {
    if (!loggedIn) {
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
      return;
    }

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
  };

  // ✅ Add to Wishlist
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
  };

  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />

      {alert && alert.severity && (
        <CustomAlert open={alert.open} details={alert} close={handleCloseAlert} />
      )}

      <div className="my-4 flex flex-col gap-8 lg:my-8">
        <div className="md:mx-12 lg:mx-24">
          <AdSlider />
        </div>

        <Banner />

        <div className="px-4 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-[15%] bg-filter-green rounded-lg shadow-md">
                <div className="p-6 flex flex-col gap-8">
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
                    <LaptopCityButton onClick={loadProducts}>Search</LaptopCityButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            <div className="lg:hidden relative">
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
                        loadProducts();
                        setShowFilters(false);
                      }}
                    >
                      Apply
                    </LaptopCityButton>
                  </div>
                </div>
              )}
            </div>

            {/* Search + Products */}
            <div className="sticky top-[9%] z-20 bg-white mb-6 px-4">
              <SearchBox className="w-full" show={handleOpen} search={handleSearch} />

              {/* Grid */}
              <div className="flex-grow">
                {isLoading ? (
                  <div className="min-h-[400px] flex justify-center items-center">
                    <Loading />
                  </div>
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
                        page={currentPage + 1}
                        shape="rounded"
                        color="primary"
                        size="large"
                        onChange={handleChangePage}
                        renderItem={(item) => (
                          <PaginationItem
                            sx={{ backgroundColor: (theme) => `${theme.palette.grey[200]}`, mx: "4px" }}
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
      </div>
    </Suspense>
  );
}

export default ProductsListing;
