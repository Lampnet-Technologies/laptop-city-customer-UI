import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IMAGES from "../../assets";
import NairaSymbol from "../nairaSymbol";

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
          {product.category == "BRAND NEW" ? "new" : "used"}
          {/* {product.category} */}
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

function ProductGroups() {
  //   const [newArrivals, setNewArrivals] = useState([]);
  //   const [bestSelling, setBestSelling] = useState([]);
  //   const [recentlyViewed, setRecentlyViewed] = useState([]);

  //   const checkScreenSize = () => {
  //     if (window.innerWidth >= 1500) {
  //       return 5;
  //     } else {
  //       return 4;
  //     }
  //   };

  //   useEffect(() => {
  //     fetch(
  //       `https://apps-1.lampnets.com/ecommb-prod/products/pagination/active?pageNo=0&pageSize=${checkScreenSize()}&sortBy=createdOn&sortDir=desc`
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((result) => {
  //         setNewArrivals(result.content);
  //       })
  //       .catch((error) => {
  //         console.error();
  //       });
  //   }, []);

  //   useEffect(() => {
  //     fetch(
  //       `https://apps-1.lampnets.com/ecommb-prod/products/best-selling?pageNo=0&pageSize=${checkScreenSize()}`
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((result) => {
  //         setBestSelling(result.content);
  //       })
  //       .catch((error) => {
  //         console.error();
  //       });
  //   }, []);

  //   useEffect(() => {
  //     fetch(
  //       `https://apps-1.lampnets.com/ecommb-prod/products/reviewed?pageNo=0&pageSize=${checkScreenSize()}&sortBy=createdOn&sortDir=desc`
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((result) => {
  //         setRecentlyViewed(result.content);
  //       })
  //       .catch((error) => {
  //         console.error();
  //       });
  //   }, []);

  //   return (
  //     <div className="my-10 px-4 flex flex-col justify-between gap-10 md:gap-12 md:px-12 lg:px-24">
  //       <Groups heading="new arrivals" products={newArrivals} seeMore />
  //       <Groups heading="best selling products" products={bestSelling} seeMore />
  //       <Groups heading="recently viewed" products={recentlyViewed} seeMore />
  //     </div>
  //   );
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // https://apps-1.lampnets.com/ecommb-prod/products
  useEffect(() => {
    fetch(
      "https://apps-1.lampnets.com/ecommb-prod/products"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products data:", JSON.stringify(data, null, 2));
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const ProductCard = ({ product }) => (
    <div className="border rounded-lg p-2 shadow hover:shadow-lg transition">
      <img
        src={product.images[0]?.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{product.brand}</p>
    </div>
  );

  const laptops = products.slice(0, 6);
  const phones = products.slice(0, 6);
  const otherGadgets = products.slice(0, 6);

  const Section = ({ title, items }) => (
    <section className="my-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => navigate("/products")}
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
    </div>
  );
}

export default ProductGroups;
