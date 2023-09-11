import React from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";
import StarRating from "../../component/StarRating";

function ProductContainer({ item, deleteItem, addToCart }) {
  const navigate = useNavigate();

  const handleProductDesc = (id) => {
    navigate("/product-desc/" + id);
  };

  return (
    <div
      className="h-[330px] xl:h-[420px] rounded-md flex flex-col justify-between cursor-pointer border-[#DADADA] border-tiny border-solid"
      onClick={() => handleProductDesc(item.product.id)}
    >
      <div className="h-[42%] md:h-[45%] rounded-t-md rounded-b bg-[#D9D9D9] flex justify-center items-center relative">
        <div className="w-4/5 h-4/5 flex justify-center items-center">
          <img
            loading="lazy"
            src={item.product.images[0]?.image}
            alt={item.product.name}
            className="max-w-full max-h-full"
          />
        </div>
        <div className="bg-green text-[10px] text-white font-medium capitalize w-10 h-5 rounded-sm flex justify-center items-center absolute top-4 right-2 z-10">
          {item.product.category.name == "BRAND NEW" ? "new" : "used"}
        </div>
      </div>
      <div className="h-[58%] md:h-[55%] flex flex-col gap-1 justify-between px-2 py-3">
        <p className="text-[13px] font-medium capitalize md:text-sm lg:text-base whitespace-break-spaces">
          {item.product.name}
        </p>
        <div className="flex justify-between items-center gap-2">
          <p className="text-base font-bold text-green md:text-lg lg:text-xl">
            <NairaSymbol />

            {item.product.price}
          </p>
          <StarRating rating={5} />
        </div>
        <div className="flex justify-between items-center gap-2">
          <button
            type="button"
            className="text-sm lg:text-base font-semibold flex justify-center items-center gap-2 text-secondary-button border-2 border-secondary-button border-solid p-3 rounded"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item.product.id, item.quantity);
            }}
          >
            <i className="bx bx-cart-add bx-sm"></i>
            Add to Cart
          </button>
          <button
            className="outline-0 p-2"
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(item.id);
            }}
          >
            <i className="bx bxs-trash text-[26px] xl:text-3xl text-green"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

function RenderedWishlist({ items, addToCart, deleteItem }) {
  return (
    <div className="mt-12 mb-24 px-12 md:px-20 xl:px-28">
      <div className="grid grid-cols-1 gap-10 lg:gap-14 xl:grid-cols-2 xl:gap-20">
        {items &&
          items.map((item) => {
            return (
              <ProductContainer
                key={item.id}
                item={item}
                addToCart={addToCart}
                deleteItem={deleteItem}
              />
            );
          })}
      </div>
    </div>
  );
}

export default RenderedWishlist;
