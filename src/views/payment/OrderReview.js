import React from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

function OrderReview({ cart, back }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/payment/successful");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl lg:px-6 lg:py-4">
        <h4 className="font-medium text-lg text-gray-700 lg:text-xl">
          Order Review
        </h4>

        <div className="flex justify-between items-center gap-2 text-sm font-normal lg:text-base">
          <p>
            {cart.cartItems.length} item{cart.cartItems.length > 1 ? "s" : null}{" "}
            in Order
          </p>
          <p>
            <NairaSymbol />
            {/* 350,000.00 */}
            {cart.total}
          </p>
        </div>
      </div>

      {/* <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl lg:px-6 lg:py-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg text-gray-700 lg:text-xl">
            Coupons
          </h4>

          <i className="bx bx-plus-circle text-gray-700"></i>
        </div>
      </div> */}

      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl lg:px-6 lg:py-4">
        <h4 className="font-medium text-lg text-gray-700 lg:text-xl">
          Order Review
        </h4>

        <table className="w-full text-sm font-normal lg:text-base">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td className="text-right">
                <NairaSymbol />
                {/* 350,000.00 */}
                {cart.total}
              </td>
            </tr>
            <tr>
              <td>Discount</td>
              <td className="text-right">
                <NairaSymbol />
                500.00
              </td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td className="text-right">
                <NairaSymbol />
                1400
              </td>
            </tr>
            <tr>
              <td>VAT</td>
              <td className="text-right">
                <NairaSymbol />
                10
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t border-t-solid border-t-gray-200">
              <td colSpan={2} style={{ height: "10px" }}></td>
            </tr>
            <tr className="font-semibold">
              <td>Total</td>
              <td className="text-right">
                <NairaSymbol />
                350,910.00
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        className="flex justify-between gap-6 lg:gap-8 md:justify-around lg:justify-end"
        style={{ marginBlock: "2.5rem 1rem" }}
      >
        <button
          type="button"
          className="inline-block w-full bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm"
          // onClick={() => navigate(-1)}
          onClick={back}
        >
          {" "}
          Back
        </button>

        <button
          type="submit"
          // style={{ marginBlock: "2.5rem 1rem" }}
          className="inline-block w-full bg-green p-4 rounded-md outline-0 font-semibold text-white text-sm"
        >
          {" "}
          Pay <NairaSymbol />
          350,910.00
        </button>
      </div>
    </form>
  );
}

export default OrderReview;
