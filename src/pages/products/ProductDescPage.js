import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IMAGES from "../../assets";
import { Banner } from "../../component/homepage";
import { ProductPlaceholder } from "../../component/homepage/productGroups";
import NairaSymbol from "../../component/nairaSymbol";
import { LoginContext, UserCartDependency } from "../../App";
import Loading from "../../component/loading";
import CustomAlert from "../../component/CustomAlert";
import CustomSnackbar from "../../component/CustomSnackbar";

const images = [
  { image: `${IMAGES.productDesc.productMain}` },
  { image: `${IMAGES.productDesc.productSide}` },
  { image: `${IMAGES.productDesc.productBack}` },
];

const example = `The smartphone is powered by a Mediatek Helio G96 Octa-core processor and Mali-G57 MC2 GPU. It comes in a big screen that has a 6.95 inches display IPS LCD capacitive touchscreen with a resolution of 1080 x 2460 pixels.

DISPLAY
Type: IPS LCD, 120Hz
Size: 6.95 inches, 114.7 cm2 (~84.5% screen-to-body ratio)
Resolution: 1080 x 2460 pixels (~387 ppi density)

PLATFORM
OS: Android 11, XOS 8
Chipset: Mediatek Helio G96 (12 nm)
Chipset: Mediatek Helio G96 (12 nm)
CPU: Octa-core (2x2.05 GHz Cortex-A76 & 6x2.0 GHz Cortex-A55)
GPU: Mali-G57 MC2

MEMORY
Card slot: microSDXC (dedicated slot)
Internal: 128GB 8GB RAM
UFS 2.2

MAIN CAMERA - Triple
64 MP, f/1.7, (wide), PDAF
13 MP, (telephoto), AF
2 MP, (depth)
Features: Quad-LED flash, HDR, panorama
Video: 1440p@30fps

SELFIE CAMERA - Single
16 MP
Video: 1080p@30fps

SOUND
Loudspeaker: Yes, dual speakers
3.5mm jack: Yes

COMMS
WLAN: Wi-Fi 802.11 a/b/g/n/ac
Bluetooth: 5.0
GPS: Yes
Radio: FM radio
USB: USB Type-C 2.0

BATTERY
Type: Li-Po 5000 mAh
Charging: Fast Charging 33W`;

const baseUrl = process.env.REACT_APP_BASE_URL;

// Cache for different product categories with timestamps
let productCaches = {
  bestSelling: { data: null, timestamp: null, expiry: 5 * 60 * 1000 },
  otherGadgets: { data: null, timestamp: null, expiry: 5 * 60 * 1000 },
  recentlyViewed: { data: null, timestamp: null, expiry: 3 * 60 * 1000 },
};

const isCacheValid = (cacheKey) => {
  const cache = productCaches[cacheKey];
  return cache.data &&
    cache.timestamp &&
    Date.now() - cache.timestamp < cache.expiry;
};

function ImagesPreviews({ files }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const arrowNext = () => {
    if (files.length - 1 !== currentIndex) setCurrentIndex((prev) => prev + 1);
  };

  const arrowPrev = () => {
    if (currentIndex !== 0) setCurrentIndex((prev) => prev - 1);
  };

  if (!files || files.length === 0) return null;

  return (
    <div>
      <div className="p-4 flex flex-col gap-6 relative lg:gap-3 lg:flex-row-reverse lg:justify-around lg:items-center">
        {/* Mobile navigation */}
        <div className="lg:hidden">
          <i
            onClick={arrowPrev}
            className="bx bx-chevron-left bx-lg text-gray-400 cursor-pointer absolute top-1/4 left-2"
            style={{ color: currentIndex !== 0 ? "#009F7F" : "#9ca3af" }}
          ></i>
          <i
            onClick={arrowNext}
            className="bx bx-chevron-right bx-lg cursor-pointer absolute top-1/4 right-2"
            style={{
              color: currentIndex === files.length - 1 ? "#9ca3af" : "#009F7F",
            }}
          ></i>
        </div>

        {/* Main image */}
        <div className="flex justify-center items-center">
          <div className="h-60 w-4/5 mx-auto flex justify-center items-center md:w-80 lg:h-[360px] lg:w-full">
            <img
              src={files[currentIndex].image}
              alt="product"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="bg-[#ECF3F9] rounded p-2 flex justify-between items-center gap-4 md:rounded-lg md:py-6 lg:py-11 lg:flex-col lg:w-48 lg:min-h-[500px]">
          {files.map((image, index) => (
            <div
              key={index}
              className="h-24 w-28 rounded py-4 flex justify-center items-center lg:rounded-md lg:w-32 lg:h-28 cursor-pointer"
              style={{
                border: currentIndex === index ? "2px solid #009F7F" : "none",
              }}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image.image}
                alt={`image-${index + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden lg:flex justify-center items-center gap-6 mt-10 lg:mt-20">
        <i
          onClick={arrowPrev}
          className="bx bx-chevron-left bx-lg cursor-pointer"
          style={{ color: currentIndex !== 0 ? "#009F7F" : "#9ca3af" }}
        ></i>
        <div>
          {currentIndex + 1} / {files.length}
        </div>
        <i
          onClick={arrowNext}
          className="bx bx-chevron-right bx-lg cursor-pointer"
          style={{
            color: currentIndex === files.length - 1 ? "#9ca3af" : "#009F7F",
          }}
        ></i>
      </div>
    </div>
  );
}

// Enhanced skeleton component for the product details page
function ProductSkeleton() {
  return (
    <div className="animate-pulse p-4 flex flex-col gap-6">
      <div className="h-60 w-full bg-gray-200 rounded" />
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="flex gap-4 mt-6">
        <div className="h-10 w-24 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

// Enhanced Groups component with skeleton loading
function GroupsWithSkeleton({ heading, products, onProductClick, loading, showSeeMore = true }) {
  const renderPlaceholders = () =>
    Array.from({ length: 4 }, (_, index) => (
      <ProductPlaceholder key={`skeleton-${heading}-${index}`} />
    ));

  const renderProducts = () => {
    if (loading) return renderPlaceholders();

    if (!products || products.length === 0) {
      return (
        <div className="col-span-full bg-gray-50 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <img
              src={IMAGES.icons.cartGreen}
              alt="No products"
              className="w-12 h-12 opacity-50"
            />
            <p className="text-gray-600 font-medium">
              No {heading.toLowerCase()} available
            </p>
            <p className="text-gray-500 text-sm">
              Check back later for new products
            </p>
          </div>
        </div>
      );
    }

    return products.map((product) => (
      <ProductContainer
        key={product.id}
        product={product}
        onClick={onProductClick}
      />
    ));
  };

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg font-bold capitalize">{heading}</h2>
      </div>

      <div className="relative overflow-x-auto hide-scrollbar">
        <div className="flex gap-3 pb-3 min-w-0">{renderProducts()}</div>
      </div>

      {!loading && products && products.length > 0 && showSeeMore && (
        <div className="flex justify-end mt-3">
          <button
            onClick={() => {/* Add see more functionality if needed */ }}
            className="text-green hover:text-dark-green transition-colors font-medium text-sm"
          >
           {/*  See more &gt; */}
          </button>
        </div>
      )}
    </div>
  );
}

// Product Container component to match the styling from productGroups
function ProductContainer({ product, onClick }) {
  const formatPrice = (price) =>
    price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

  const getConditionText = (p) => {
    if (p.condition) return p.condition.toLowerCase() === "new" ? "new" : "used";
    if (p.category) return p.category === "BRAND NEW" ? "new" : "used";
    return "used";
  };

  return (
    <div
      className="w-full h-[240px] rounded-lg flex flex-col justify-between cursor-pointer border border-[#DADADA] hover:shadow-lg transition-shadow duration-300 bg-white min-w-[200px]"
      onClick={() => onClick(product.id)}
    >
      {/* Image Section - Fixed height for complete uniformity */}
      <div className="h-[140px] rounded-t-lg bg-[#F8F9FA] flex justify-center items-center relative p-2">
        <div className="w-full h-full flex items-center justify-center">
          {product.images?.length > 0 ? (
            <img
              loading="lazy"
              src={product.images[0].image || product.images[0]}
              alt={product.name || "Product"}
              className="w-full h-full object-contain max-w-[120px] max-h-[120px]"
              onError={(e) => {
                e.target.src = IMAGES.icons.cartGreen;
                e.target.className = "w-[40px] h-[40px] object-contain";
              }}
            />
          ) : (
            <img
              src={IMAGES.icons.cartGreen}
              alt="no product"
              className="w-[40px] h-[40px]"
            />
          )}
        </div>
        <div className="absolute top-2 right-2 bg-green text-white font-medium capitalize px-2 py-0.5 rounded-sm text-[10px]">
          {getConditionText(product)}
        </div>
      </div>

      {/* Product Info Section - Fixed height for uniformity */}
      <div className="flex flex-col gap-1 p-2 h-[80px] justify-between">
        <p
          className="text-xs font-medium capitalize line-clamp-2 leading-tight"
          title={product.name}
        >
          {product.name || "Product Name"}
        </p>
        <p className="text-sm font-bold text-green">
          &#8358;{formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}

function AboutProduct({ product }) {
  const { loggedIn, token } = useContext(LoginContext);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "", title: "" });
  const [toast, setToast] = useState({ open: false, severity: "", message: "" });

  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseAlert = () => setAlert({ ...alert, open: false });
  const handleCloseToast = () => setToast({ ...toast, open: false });

  const handleAddToCart = async (id) => {
    if (!loggedIn || !token) {
      navigate("/login", { state: { previousUrl: location.pathname } });
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/cart-items/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: id, quantity }),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      setCartDep(id);
      setAlert({
        open: true,
        severity: "success",
        title: "1 item added to cart",
        message: `${product.name} added to cart`,
      });
    } catch (err) {
      setAlert({ open: true, severity: "error", title: "Failed to add to cart", message: err.message });
    }
  };

  const handleAddToWishlist = async (id) => {
    if (!loggedIn || !token) {
      navigate("/login", { state: { previousUrl: location.pathname } });
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/wish-lists/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ basketId: 1, productId: id, quantity }),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      setToast({ open: true, severity: "success", message: "Added to wishlist" });
    } catch {
      setToast({ open: true, severity: "error", message: "Failed to add to wishlist" });
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Product info */}
      <h2 className="text-2xl font-semibold lg:text-3xl">{product.name}</h2>
      <div className="my-5 flex justify-start items-start gap-10 md:gap-20">
        <div className="text-sm flex flex-col gap-4 lg:gap-8 font-normal lg:text-base">
          <p>Product id: {product.id}</p>
          <p>Brand: {product.brand}</p>
          <div className="flex justify-between items-center gap-4 md:gap-10">
            <p>Quantity</p>
            <div className="text-base flex items-center divide-x-2 w-28 border border-gray-700 rounded">
              <button className="w-full p-1 font-semibold" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
              <p className="w-full p-1 text-center font-semibold text-green">{quantity}</p>
              <button className="w-full p-1 font-semibold" onClick={() => quantity < product.stock && setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
        </div>
        <div className="self-end lg:self-start py-1 px-4 rounded border-2 border-secondary-button text-secondary-button font-semibold">
          {product.stock} in stock
        </div>
      </div>

      {/* Price & Wishlist */}
      <div className="flex justify-between items-center gap-1 md:gap-20">
        <h2 className="text-2xl font-semibold lg:text-3xl">
          <NairaSymbol /> {quantity * product.price}
        </h2>
        <button className="text-sm flex items-center gap-1" onClick={() => handleAddToWishlist(product.id)}>
          <i className="bx bx-heart bx-sm"></i> Add to Wishlist
        </button>
      </div>

      {/* Action buttons */}
      <div className="my-5 flex flex-wrap gap-4 md:gap-8">
        <button
          className="w-full border-2 border-secondary-button text-secondary-button hover:bg-gray-100 hover:font-semibold transition-all text-sm rounded flex items-center gap-3 py-2 px-4 md:w-fit"
          onClick={() => handleAddToCart(product.id)}
        >
          <img src={IMAGES.icons.cartGreen} alt="cart" className="w-3" />
          Add to cart
        </button>

        <button
          className="w-full text-white text-sm rounded border-2 border-green bg-green py-2 px-4 hover:bg-dark-green md:w-fit"
          onClick={() => {
            if (!loggedIn || !token) {
              navigate("/login", { state: { previousUrl: "/shopping-cart" } });
            } else {
              navigate("/shopping-cart");
            }
          }}
        >
          Checkout
        </button>

        <button
          className="w-full text-green text-sm rounded border-2 border-light-green py-2 px-4 hover:bg-light-green hover:text-white md:w-fit"
          onClick={() => navigate("/products")}
        >
          Continue shopping
        </button>
      </div>

      {/* Alerts & Toasts */}
      {alert.open && <CustomAlert open={alert.open} details={alert} close={handleCloseAlert} />}
      {toast.open && <CustomSnackbar open={toast.open} close={handleCloseToast} toast={toast} />}
    </div>
  );
}

function Description({ descr }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex flex-col gap-6 my-4 text-sm font-light px-4 md:px-0 text-[#111]">
      <div className="w-2/4 h-14 bg-filter-green text-lg font-medium rounded-md flex justify-center items-center tracking-tight lg:text-[22px] lg:w-full">
        Description
      </div>
      {descr && (
        <div className="whitespace-pre-wrap lg:text-base">
          {showMore ? descr : `${descr.substring(0, 800)}`}
          {descr.length >= 800 && (
            <div>
              <button
                className="capitalize text-green font-semibold text-base flex items-center gap-1 py-2"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}{" "}
                <i className="bx bx-chevron-down bx-sm"></i>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProductDetails({ bestSelling, bestSellingLoading, otherGadgets, otherGadgetsLoading, product }) {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="mt-20">
      {product && (
        <>
          {/* Mobile layout */}
          <div className="flex flex-col gap-4 md:px-10 lg:hidden">
            <ImagesPreviews files={product.images || images} />
            <div className="w-4/5 border border-pagination rounded self-center my-3" />
            <AboutProduct product={product} />
            <Description descr={product.description || example} />
          </div>

          {/* Desktop layout */}
          <div className="hidden lg:flex justify-between items-start gap-4 px-20 mb-12">
            <div className="flex flex-col gap-4 w-[120%]">
              <ImagesPreviews files={product.images || images} />
              <div className="w-4/5 border border-pagination rounded self-center my-3" />
              <AboutProduct product={product} />
            </div>
            <div className="w-[80%]">
              <Description descr={product.description || example} />
            </div>
          </div>
        </>
      )}

      <Banner />

      {/* Sections with skeleton loading */}
      <div className="mt-8 md:mt-12 px-4 md:px-12 lg:mt-24 lg:px-24">
        <GroupsWithSkeleton
          heading="best selling products"
          products={bestSelling}
          onProductClick={handleProductClick}
          loading={bestSellingLoading}
        />
      </div>
      <div className="mt-8 md:mt-12 px-4 md:px-12 lg:mt-24 lg:px-24">
        <GroupsWithSkeleton
          heading="other gadgets"
          products={otherGadgets}
          onProductClick={handleProductClick}
          loading={otherGadgetsLoading}
          showSeeMore={false}
        />
      </div>
    </div>
  );
}

function ProductDesc() {
  const [bestSelling, setBestSelling] = useState(null);
  const [bestSellingLoading, setBestSellingLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState(null);
  const [otherGadgets, setOtherGadgets] = useState(null);
  const [otherGadgetsLoading, setOtherGadgetsLoading] = useState(true);
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "", title: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const prodId = params.id;

  // Enhanced back button functionality
  const handleBack = () => {
    // Check if there's a state with a previous URL
    if (location.state?.from) {
      navigate(location.state.from);
    } else if (window.history.length > 2) {
      // If there's history, go back
      navigate(-1);
    } else {
      // Fallback to products page
      navigate("/products");
    }
  };

  // Optimized fetch with caching and parallel requests
  const fetchWithCache = async (url, cacheKey) => {
    if (isCacheValid(cacheKey)) {
      return productCaches[cacheKey].data;
    }

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Server responded with ${response.status}`);

    const data = await response.json();
    const processedData = Array.isArray(data) ? data : data.content || [];

    // Cache the result
    productCaches[cacheKey] = {
      data: processedData,
      timestamp: Date.now(),
      expiry: productCaches[cacheKey].expiry,
    };

    return processedData;
  };

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      if (!prodId) return;
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/products/${prodId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        if (!data.images || data.images.length === 0) {
          data.images = [{ image: IMAGES.productDesc.productMain, id: "default-image" }];
        }
        setProduct(data);
      } catch (err) {
        setAlert({
          open: true,
          severity: "error",
          title: "Error Loading Product",
          message: "Unable to load product details."
        });
        navigate("/products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [prodId, navigate]);

  // Fetch other data in parallel with better error handling
  useEffect(() => {
    const fetchAllData = async () => {
      // Start all requests simultaneously
      const promises = [
        fetchWithCache(`${baseUrl}/products/best-selling?limit=6`, 'bestSelling')
          .then((data) => {
            setBestSelling(data);
            setBestSellingLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch best selling:", err);
            setBestSelling([]);
            setBestSellingLoading(false);
          }),

        fetchWithCache(`${baseUrl}/products?limit=8`, 'otherGadgets')
          .then((data) => {
            setOtherGadgets(data);
            setOtherGadgetsLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch other gadgets:", err);
            setOtherGadgets([]);
            setOtherGadgetsLoading(false);
          }),

        fetchWithCache(`${baseUrl}/products/reviewed?limit=6`, 'recentlyViewed')
          .then((data) => {
            setRecentlyViewed(data);
          })
          .catch((err) => {
            console.error("Failed to fetch recently viewed:", err);
            setRecentlyViewed([]);
          }),
      ];

      // Execute all promises
      await Promise.allSettled(promises);
    };

    fetchAllData();
  }, []);

  return (
    <div className="my-10">
      {/* Header */}
      <div className="h-28 bg-filter-green" style={{ backgroundImage: `radial-gradient(circle, #009F7F, #63BB8280)` }}>
        <div className="h-full flex items-center gap-5 px-4 relative md:px-12 lg:px-24">
          <button
            className="rounded-full bg-transparent flex items-center text-lg lg:text-[22px] font-medium"
            onClick={handleBack}
          >
            <i className="bx bx-chevron-left bx-md"></i> Back
          </button>
          <h2 className="capitalize text-3xl lg:text-[45px] font-bold absolute top-1/3 left-1/3 md:left-[45%]">
            {product?.category || 'Product'}
          </h2>
        </div>
      </div>

      {/* Product Details with Skeleton */}
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <ProductDetails
          bestSelling={bestSelling}
          bestSellingLoading={bestSellingLoading}
          otherGadgets={otherGadgets}
          otherGadgetsLoading={otherGadgetsLoading}
          product={product}
        />
      )}

      {/* Alert */}
      {alert.open && (
        <CustomAlert
          open={alert.open}
          details={alert}
          close={() => setAlert({ ...alert, open: false })}
        />
      )}
    </div>
  );
}

export default ProductDesc;