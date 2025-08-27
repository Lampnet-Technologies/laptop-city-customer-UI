import React, { useContext, useEffect, useState } from "react";
import NairaSymbol from "../../component/nairaSymbol";
import { PlaceOrderContext } from "../../App";
import { ChosenMethodContext } from "../../pages/payment";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ShippingMethod({ goTo, back }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [chosenMethodPrice, setChosenMethodPrice] =
    useContext(ChosenMethodContext);
  const [methods, setMethods] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippingMethods = async () => {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        setError("Access token not found.");
        setLoading(false);
        return;
      }

      // Check if shippingAddress exists and has required fields
      if (!placeOrder?.shippingAddress) {
        setError("Shipping address not found. Please go back and enter your address.");
        setLoading(false);
        return;
      }

      const { shippingAddress } = placeOrder;
      
      // Validate required fields
      const requiredFields = ['address', 'city', 'firstName', 'lastName', 'phone', 'state'];
      const missingFields = requiredFields.filter(field => !shippingAddress[field]);
      
      if (missingFields.length > 0) {
        setError(`Missing required shipping address fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      try {
        // Build the payload according to API requirements
        const payload = {
          address: shippingAddress.address,
          city: shippingAddress.city,
          email: shippingAddress.email || "",
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          phone: shippingAddress.phone,
          state: shippingAddress.state.replace(" State", ""), // Clean state name
          zipCode: shippingAddress.zipCode || "100001",
        };

        console.log("Fetching shipping rates with payload:", payload);

        const response = await fetch(`${baseUrl}/shipping/rate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("API Error Response:", data);
          setError(data?.message || `HTTP ${response.status}: Failed to fetch shipping rates`);
          return;
        }

        console.log("Shipping rates response:", data);

        // Handle different response formats
        if (Array.isArray(data)) {
          const cleanedMethods = data.map((method) => ({
            id: method.id || method.rate_id, // Handle different ID field names
            amount: parseFloat(method.amount || method.rate || 0),
            carrier_name: method.carrier_name || method.service_name || method.carrier,
            delivery_time: method.delivery_time || method.estimated_delivery || "Unknown",
          }));

          setMethods(cleanedMethods);
          
          // Auto-select first method if available
          if (cleanedMethods.length > 0) {
            setShippingMethod(cleanedMethods[0].id);
            setChosenMethodPrice(cleanedMethods[0].amount);
          }
        } else if (data.rates && Array.isArray(data.rates)) {
          // Handle nested rates array
          const cleanedMethods = data.rates.map((method) => ({
            id: method.id || method.rate_id,
            amount: parseFloat(method.amount || method.rate || 0),
            carrier_name: method.carrier_name || method.service_name || method.carrier,
            delivery_time: method.delivery_time || method.estimated_delivery || "Unknown",
          }));

          setMethods(cleanedMethods);
          
          if (cleanedMethods.length > 0) {
            setShippingMethod(cleanedMethods[0].id);
            setChosenMethodPrice(cleanedMethods[0].amount);
          }
        } else {
          console.error("Unexpected response format:", data);
          setError("Unexpected response format from shipping API.");
        }
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
        setError(`Network error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingMethods();
  }, [placeOrder, setChosenMethodPrice]);

  const handleChange = (e) => {
    const selectedMethodId = e.target.value;
    setShippingMethod(selectedMethodId);
    
    // Update chosen method price immediately
    const selectedMethod = methods.find(method => method.id === selectedMethodId);
    if (selectedMethod) {
      setChosenMethodPrice(selectedMethod.amount);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!shippingMethod) {
      setError("Please select a shipping method.");
      return;
    }

    const selectedMethod = methods.find(method => method.id === shippingMethod);
    
    if (selectedMethod) {
      // Update contexts with selected shipping method
      setChosenMethodPrice(selectedMethod.amount);
      setPlaceOrder(prevOrder => ({
        ...prevOrder,
        shippingMethodId: shippingMethod,
        shippingCost: selectedMethod.amount,
        shippingCarrier: selectedMethod.carrier_name,
        estimatedDelivery: selectedMethod.delivery_time,
      }));
      
      console.log("Selected shipping method:", selectedMethod);
      goTo("order-review");
    } else {
      setError("Selected shipping method not found.");
    }
  };

  const handleBack = () => {
    if (back) {
      back();
    }
  };

  return (
    <form
      className="space-y-4 md:space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h4 className="font-medium text-lg text-dark-blue md:text-xl lg:text-2xl">
        Shipping Method
      </h4>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green mx-auto mb-2"></div>
            <p>Loading shipping methods...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-600 mb-2">⚠️ {error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700"
          >
            Retry
          </button>
        </div>
      ) : methods.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-yellow-700">No shipping methods available for your location.</p>
          <p className="text-sm text-yellow-600 mt-1">Please check your shipping address and try again.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {methods.map((method) => (
            <div 
              className="flex items-start gap-4 lg:gap-6 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors" 
              key={method.id}
            >
              <div className="mt-0.5 md:mt-1">
                <input
                  className="accent-green md:w-5 md:h-5"
                  type="radio"
                  name="shippingMethods"
                  value={method.id}
                  id={`shipping-${method.id}`}
                  checked={shippingMethod === method.id}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor={`shipping-${method.id}`} className="cursor-pointer flex-1">
                <div className="lg:space-y-2">
                  <p className="font-medium lg:text-lg">
                    <span className="font-semibold text-green">
                      <NairaSymbol />
                      {method.amount.toFixed(2)}
                    </span>{" "}
                    - {method.carrier_name}
                  </p>
                  <p className="font-normal text-sm lg:text-base text-gray-600 capitalize">
                    Delivery: {method.delivery_time}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      )}

      <div
        className="flex justify-between gap-6 lg:gap-8 md:justify-around lg:justify-end"
        style={{ marginBlock: "2.5rem 1rem" }}
      >
        <button
          type="button"
          className="inline-block w-full md:w-48 bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm hover:bg-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBack}
          disabled={loading}
        >
          Back
        </button>

        <button
          type="submit"
          className="inline-block w-full md:w-48 bg-green p-2 rounded outline-0 font-semibold text-white text-sm hover:bg-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !shippingMethod || methods.length === 0}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default ShippingMethod;