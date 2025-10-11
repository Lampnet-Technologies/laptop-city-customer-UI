import { useContext, useState } from "react";
import NairaSymbol from "../../component/nairaSymbol";
import { CouponDiscount } from "../../App";
import {
  ChosenMethodContext,
  PlaceOrderResponseContext,
} from "../../pages/payment";
import { PlaceOrderContext } from "../../App";

function OrderReview({ cart, back, goTo }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [discount] = useContext(CouponDiscount);
  const [chosenMethodPrice] = useContext(ChosenMethodContext);
  const [responseData, setResponseData] = useContext(PlaceOrderResponseContext);
  const [isLoading, setIsLoading] = useState(false);

  const VAT = "0.00";

  const sumTotal = () => {
    let sum = cart.total - discount + chosenMethodPrice;
    return Number(sum.toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate a transaction reference for this order
      const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const orderNumber = Math.floor(Math.random() * 10000); // Generate order number

      console.log("=== ORDER REVIEW SUBMIT ===");
      console.log("Cart total:", cart.total);
      console.log("Discount:", discount);
      console.log("Shipping cost:", chosenMethodPrice);
      console.log("Final total:", sumTotal());
      console.log("Generated transaction ID:", transactionId);

      // Prepare the response data that will be used by PaymentMethod
      const orderData = {
        orderNumber: orderNumber,
        transactionId: transactionId,
        message: "Order ready for payment",
        totalAmount: sumTotal(),
        cartItems: cart.cartItems,
        shippingDetails: {
          cost: chosenMethodPrice,
          methodId: placeOrder.shippingMethodId,
          carrier: placeOrder.shippingCarrier,
          estimatedDelivery: placeOrder.estimatedDelivery,
        },
      };

      console.log("Setting response data:", orderData);

      // Set the response data and amount to pay
      setResponseData(orderData);
      setPlaceOrder(prev => ({ 
        ...prev, 
        amountToPay: sumTotal(),
        orderNumber: orderNumber,
        transactionId: transactionId,
      }));

      // Proceed to payment method selection
      goTo("payment-method");

    } catch (error) {
      console.error("Error in order review:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Validation checks
  const canProceed = () => {
    const hasCartItems = cart.cartItems && cart.cartItems.length > 0;
    const hasShippingAddress = placeOrder.shippingAddress;
    const hasShippingMethod = placeOrder.shippingMethodId;
    const hasShippingCost = chosenMethodPrice >= 0;

    return hasCartItems && hasShippingAddress && hasShippingMethod && hasShippingCost;
  };

  const getValidationErrors = () => {
    const errors = [];
    
    if (!cart.cartItems || cart.cartItems.length === 0) {
      errors.push("No items in cart");
    }
    
    if (!placeOrder.shippingAddress) {
      errors.push("Missing shipping address");
    }
    
    if (!placeOrder.shippingMethodId) {
      errors.push("No shipping method selected");
    }
    
    if (chosenMethodPrice === undefined || chosenMethodPrice === null) {
      errors.push("Shipping cost not calculated");
    }

    return errors;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl lg:px-6 lg:py-4">
        <h4 className="font-medium text-lg text-gray-700 lg:text-xl">
          Order Review
        </h4>

        <div className="flex justify-between items-center gap-2 text-sm font-normal lg:text-base">
          <p>
            {cart.cartItems?.length || 0} item{(cart.cartItems?.length || 0) > 1 ? "s" : ""}{" "}
            in Order
          </p>
          <p>
            <NairaSymbol />
            {cart.total?.toLocaleString() || "0.00"}
          </p>
        </div>
      </div>

      <div className="space-y-2 border border-solid border-gray-300 p-3 rounded-2xl lg:px-6 lg:py-4">
        <h4 className="font-medium text-lg text-gray-700 lg:text-xl">
          Order Summary
        </h4>

        <table className="w-full text-sm font-normal lg:text-base">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td className="text-right">
                <NairaSymbol />
                {cart.total?.toLocaleString() || "0.00"}
              </td>
            </tr>
            <tr>
              <td>Discount</td>
              <td className="text-right">
                <NairaSymbol />
                {discount?.toFixed(2).toLocaleString() || "0.00"}
              </td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td className="text-right">
                <NairaSymbol />
                {(chosenMethodPrice || 0).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>VAT</td>
              <td className="text-right">
                <NairaSymbol />
                {VAT}
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
                {sumTotal().toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Shipping Details Display */}
      {placeOrder.shippingCarrier && (
        <div className="space-y-2 border border-solid border-gray-200 p-3 rounded-2xl lg:px-6 lg:py-4 bg-gray-50">
          <h4 className="font-medium text-sm text-gray-600 lg:text-base">
            Shipping Details
          </h4>
          <div className="text-sm space-y-1">
            <p><span className="font-medium">Carrier:</span> {placeOrder.shippingCarrier}</p>
            <p><span className="font-medium">Delivery:</span> {placeOrder.estimatedDelivery || "Standard"}</p>
            <p><span className="font-medium">Cost:</span> <NairaSymbol />{(chosenMethodPrice || 0).toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Validation Errors */}
      {!canProceed() && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <h5 className="font-medium text-red-800 mb-2">Please complete the following:</h5>
          <ul className="text-sm text-red-600 space-y-1">
            {getValidationErrors().map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Debug information - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 p-3 rounded text-xs">
          <h5 className="font-semibold mb-2">Debug Info:</h5>
          <div className="grid grid-cols-2 gap-2">
            <p>Cart Items: {cart.cartItems?.length || 0}</p>
            <p>Shipping Cost: ₦{chosenMethodPrice || 0}</p>
            <p>Has Address: {placeOrder.shippingAddress ? 'Yes' : 'No'}</p>
            <p>Shipping Method: {placeOrder.shippingMethodId || 'None'}</p>
            <p>Carrier: {placeOrder.shippingCarrier || 'None'}</p>
            <p>Total: ₦{sumTotal()}</p>
          </div>
        </div>
      )}

      <div
        className="flex justify-between gap-6 lg:gap-8 md:justify-around lg:justify-end"
        style={{ marginBlock: "2.5rem 1rem" }}
      >
        <button
          className="inline-block w-full bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm hover:bg-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={back}
          disabled={isLoading}
        >
          Back
        </button>

        <button
          type="submit"
          className="inline-block w-full bg-green p-4 rounded-md outline-0 font-semibold text-white text-sm hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading || !canProceed()}
        >
          {isLoading ? "Processing..." : `Proceed to Payment`}
        </button>
      </div>
    </div>
  );
}

export default OrderReview;