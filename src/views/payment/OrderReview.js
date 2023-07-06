import React from "react";
import { useNavigate } from "react-router-dom";
import NairaSymbol from "../../component/nairaSymbol";

function OrderReview() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/payment/successful");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl">
        <h4 className="font-medium text-lg text-gray-700 ">Order Review</h4>

        <div className="flex justify-between items-center gap-2 text-sm font-normal">
          <p>1 item in Cart</p>
          <p>
            <NairaSymbol />
            350,000.00
          </p>
        </div>
      </div>

      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg text-gray-700 ">Coupons</h4>

          <i className="bx bx-plus-circle text-gray-700"></i>
        </div>
      </div>

      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl">
        <h4 className="font-medium text-lg text-gray-700 ">Order Review</h4>

        <table className="w-full text-sm font-normal">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td className="text-right">
                <NairaSymbol />
                350,000.00
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

      <button
        type="submit"
        style={{ marginBlock: "2.5rem 1rem" }}
        className="inline-block w-full bg-green p-4 rounded-md outline-0 font-semibold text-white text-sm"
      >
        {" "}
        Pay <NairaSymbol />
        350,910.00
      </button>
    </form>
  );
}

export default OrderReview;
