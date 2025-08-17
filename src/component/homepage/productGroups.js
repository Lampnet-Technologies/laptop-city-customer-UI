import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IMAGES from "../../assets";
import NairaSymbol from "../nairaSymbol";
import Modal from "./Modal";


const baseUrl = process.env.REACT_APP_BASE_URL
function ProductContainer({ product }) {
  const navigate = useNavigate();

  const handleProductDesc = (id) => {
    navigate("/product-desc/" + id);
  };

  

  return (
    <div
      className="w-44 h-56 rounded-md flex flex-col justify-between cursor-pointer border-[#DADADA] border-tiny border-solid lg:w-60 lg:h-80"
      onClick={() => handleProductDesc(product.id)}
    >
      <div className="h-32 rounded bg-[#D9D9D9] flex justify-center items-center relative lg:h-48">
        {product.images && (
          <div className="w-4/5 h-4/5 flex justify-center items-center">
            {product.images.length >= 1 ? (
              <img
                loading="lazy"
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
          {product.category === "BRAND NEW" ? "new" : "used"}
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-between h-20 px-2 pb-3 lg:h-28 lg:pt-2">
        <p className="text-xs font-medium capitalize md:text-sm lg:text-base whitespace-break-spaces">
          {product.name}
        </p>

        <div className="flex justify-between items-center gap-2">
          <p className="text-base font-bold text-green md:text-lg lg:text-xl">
            <NairaSymbol />
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Groups({ heading, products, seeMore }) {
  return (
    <div className="max-w-full w-fit">
      {heading && (
        <h1 className="text-xl font-semibold capitalize lg:text-2xl">
          {heading}
        </h1>
      )}

      <div className="mt-8 lg:mt-14 flex flex-wrap justify-around gap-x-2 gap-y-6 md:justify-start md:gap-x-6">
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
          className="mt-10 flex justify-end items-center text-sm font-medium"
        >
          <Link
            to={{
              pathname: "/products",
              search: `?filter=${heading}`,
            }}
            className="flex justify-between items-center hover:text-green hover:font-bold"
          >
            See more <i className="bx bx-chevron-right bx-sm ml-0"></i>
          </Link>
        </div>
      )}
    </div>
  );
}

// Main groups I'm working with.
function ProductGroups() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/ecommb-staging/products`)
      .then((res) => {
        // First, check if the response was successful
        if (!res.ok) {
          // If not, throw an error and let the catch block handle it
          throw new Error(`Server returned status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Add a check to ensure 'data' is actually an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("API response was not an array:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const handleSeeMore = () => {
    setIsModalOpen(true);
  };

  const handleProductTypeSelect = (condition) => {
    navigate(`/product-type?condition=${condition}`);
  };

const ProductCard = ({ product }) => (
  <div className="relative border rounded-lg p-2 shadow hover:shadow-lg transition">
    {/* Tag */}
    <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-medium px-2 py-0.5 rounded-sm capitalize z-10 bg-green">
      {product.category?.toUpperCase() === "BRAND NEW" ? "new" : "used"}
    </div>

    <img
      src={product.images[0]?.image || "/placeholder.jpg"}
      alt={product.name}
      className="w-full h-48 object-cover rounded"
    />
    <h3 className="mt-2 font-semibold">{product.name}</h3>
    <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
    <p className="text-sm text-gray-500">{product.brand}</p>
  </div>
);


  // Add a check here before you start filtering
  const laptops = products && products.length > 0
    ? products
      .filter((p) => p.productType?.toLowerCase() === "laptops")
      .slice(0, 6)
    : [];

  const phones = products && products.length > 0
    ? products
      .filter((p) => p.productType?.toLowerCase() === "smartphones")
      .slice(0, 6)
    : [];
  
  const otherGadgets = products && products.length > 0
    ? products
      .filter((p) => {
        const others = p.productType?.toLowerCase();
        return others !== "smartphones" && others !== "laptops";
      })
      .slice(0, 6)
    : [];

  const Section = ({ title, items }) => (
    <section className="my-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSeeMore}
              className="text-blue-600 hover:underline"
            >
              See more &gt;
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No products available.</p>
      )}
    </section>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Section title="Laptops" items={laptops} />
      <Section title="Phones" items={phones} />
      <Section title="Other Gadgets" items={otherGadgets} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleProductTypeSelect}
      />
    </div>
  );
}

export default ProductGroups;