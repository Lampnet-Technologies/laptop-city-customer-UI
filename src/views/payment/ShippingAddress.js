import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlaceOrderContext } from "../../App";

const baseUrl = process.env.REACT_APP_BASE_URL;

const createSenderAddressUrl = `${baseUrl}/shipping/sender-address`;

const accessToken = () => localStorage.getItem("token");

function ShippingAddress({ goTo }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zipCode: "100001", // default value
    phone: "",
    countryCode: "+234",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoadingStates(true);
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ country: "Nigeria" }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data && Array.isArray(result.data.states)) {
          const rawStates = result.data.states.map((state) => state.name);
          setStates(rawStates);
        } else {
          console.error("States data missing or malformed:", result);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setIsLoadingStates(false));
  }, [location.pathname]);

  useEffect(() => {
    if (values.state && states.includes(values.state)) {
      setIsLoadingCities(true);
      setCities([]);
      setValues((prev) => ({ ...prev, city: "" })); // Reset city selection

      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ country: "Nigeria", state: values.state }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.data && Array.isArray(result.data)) {
            setCities(result.data);
          } else {
            setCities([]);
            console.warn("Cities data missing or malformed:", result);
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setIsLoadingCities(false));
    }
  }, [values.state, states]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validatePhoneNumber = (phone, countryCode) => {
    // Remove all non-digit characters
    let cleanPhone = phone.replace(/\D/g, '');
    
    // Handle Nigerian phone numbers specifically
    if (countryCode === '+234') {
      // Remove leading zero if present
      if (cleanPhone.startsWith('0')) {
        cleanPhone = cleanPhone.substring(1);
      }
      
      // Remove country code if already included
      if (cleanPhone.startsWith('234')) {
        cleanPhone = cleanPhone.substring(3);
      }
      
      // Should now have exactly 10 digits
      if (cleanPhone.length === 10) {
        return `+234${cleanPhone}`;
      } else {
        throw new Error(`Invalid Nigerian phone number. Expected 10 digits, got ${cleanPhone.length}. Please enter format: 8012345678`);
      }
    }
    
    // For other countries, basic validation
    if (countryCode === '+1' && cleanPhone.length === 10) {
      return `+1${cleanPhone}`;
    }
    
    if (countryCode === '+44' && cleanPhone.length >= 10) {
      return `+44${cleanPhone}`;
    }
    
    // Fallback - return as formatted but may still fail validation
    return `${countryCode}${cleanPhone}`;
  };

  // Add function to normalize city names
  const normalizeCityName = (cityName) => {
    return cityName.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Debug: Log current form values
      console.log("=== DEBUGGING FORM SUBMISSION ===");
      console.log("Current form values:", values);
      console.log("Available cities count:", cities.length);
      console.log("First 10 cities:", cities.slice(0, 10));
      console.log("Available states count:", states.length);

      // Validate required fields
      const requiredFields = {
        firstName: values.firstName?.trim(),
        lastName: values.lastName?.trim(),
        address: values.address?.trim(),
        state: values.state?.trim(),
        city: values.city?.trim(),
        phone: values.phone?.trim()
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate and format phone number
      const formattedPhone = validatePhoneNumber(values.phone, values.countryCode);
      console.log("Phone validation:");
      console.log("  Original:", values.phone);
      console.log("  Country code:", values.countryCode);
      console.log("  Formatted:", formattedPhone);
      
      // Normalize and validate city
      const normalizedCity = normalizeCityName(values.city);
      console.log("City validation:");
      console.log("  Selected city:", `"${values.city}"`);
      console.log("  Normalized city:", `"${normalizedCity}"`);
      console.log("  City exists in list:", cities.includes(normalizedCity));
      
      // Check if city exists (case-sensitive check)
      const cityExists = cities.some(city => city.trim() === normalizedCity);
      if (!cityExists) {
        console.log("Available cities:", cities);
        throw new Error(`Invalid city: "${normalizedCity}". Please select from the dropdown. Available options: ${cities.slice(0, 10).join(', ')}${cities.length > 10 ? `... and ${cities.length - 10} more` : ''}`);
      }

      // Build the exact payload the API expects
      const payload = {
        firstName: requiredFields.firstName,
        lastName: requiredFields.lastName,
        email: values.email?.trim() || "",
        address: requiredFields.address,
        state: requiredFields.state,
        city: normalizedCity,
        zipCode: values.zipCode?.trim() || "100001",
        phone: formattedPhone,
      };

      console.log("=== FINAL PAYLOAD ===");
      console.log(JSON.stringify(payload, null, 2));

      const token = accessToken();
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      console.log("Making API request to:", createSenderAddressUrl);
      
      const res = await fetch(createSenderAddressUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("API Response status:", res.status);
      console.log("API Response headers:", Object.fromEntries(res.headers.entries()));

      const responseData = await res.json();
      console.log("API Response data:", responseData);

      if (!res.ok) {
        console.error("=== API ERROR DETAILS ===");
        console.error("Status:", res.status);
        console.error("Response:", responseData);
        
        // Provide specific error messages
        let errorMessage = "Failed to save shipping address: ";
        if (responseData.message) {
          errorMessage += responseData.message;
          
          // Add specific guidance based on error message
          if (responseData.message.includes('phone format')) {
            errorMessage += `\n\nPhone troubleshooting:\n- Your phone: "${formattedPhone}"\n- For Nigeria: Use format +234XXXXXXXXXX (10 digits after +234)\n- Example: +2348012345678`;
          }
          
          if (responseData.message.includes('valid city')) {
            errorMessage += `\n\nCity troubleshooting:\n- Your city: "${normalizedCity}"\n- Must select from dropdown\n- Available: ${cities.slice(0, 5).join(', ')}`;
          }
        } else {
          errorMessage += `HTTP ${res.status}`;
        }
        
        throw new Error(errorMessage);
      }

      console.log("=== SUCCESS ===");
      console.log("Address created successfully:", responseData);

      // Update PlaceOrderContext with the shipping address
      setPlaceOrder((prev) => ({
        ...prev,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        streetAddress: payload.address,
        state: payload.state,
        city: payload.city,
        zipCode: payload.zipCode,
        phoneNumber: payload.phone,
        shippingAddress: {
          ...payload,
          address_id: responseData.address_id,
        },
      }));

      // Move to next step
      if (goTo) {
        goTo("shipping-method");
      }

      alert("Shipping address saved successfully!");

    } catch (error) {
      console.error("=== SUBMISSION ERROR ===");
      console.error("Error details:", error);
      alert(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="space-y-2 md:space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h4 className="font-medium text-lg text-dark-blue md:text-xl lg:text-2xl">
        Shipping Address
      </h4>

      <div className="flex justify-between gap-6 md:gap-11 lg:gap-20">
        <input
          required
          placeholder="First Name *"
          name="firstName"
          type="text"
          id="firstName"
          value={values.firstName}
          onChange={handleChange("firstName")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm capitalize"
        />

        <input
          required
          placeholder="Last Name *"
          name="lastName"
          type="text"
          id="lastName"
          value={values.lastName}
          onChange={handleChange("lastName")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm capitalize"
        />
      </div>

      <div className="">
        <input
          placeholder="Email"
          name="email"
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange("email")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      <div className="">
        <input
          required
          placeholder="Street Address *"
          name="address"
          type="text"
          id="address"
          value={values.address}
          onChange={handleChange("address")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      <div className="flex justify-between gap-6 md:gap-11 lg:gap-20">
        <select
          required
          name="state"
          id="state"
          value={values.state}
          onChange={handleChange("state")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        >
          <option value="" disabled>
            {isLoadingStates ? "Loading states..." : "Select State *"}
          </option>
          {states.map((state, i) => (
            <option key={i} value={state}>
              {state.replace(" State", "")}
            </option>
          ))}
        </select>

        <select
          required
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange("city")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
          disabled={!values.state}
        >
          <option value="" disabled>
            {isLoadingCities ? "Loading cities..." : "Select City *"}
          </option>
          {cities.map((city, i) => (
            <option key={i} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between gap-6 md:gap-11 lg:gap-20">
        <div className="w-full flex gap-2">
          <select
            name="countryCode"
            value={values.countryCode}
            onChange={handleChange("countryCode")}
            className="w-1/3 h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
          >
            <option value="+234">🇳🇬 +234</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
          </select>
          <input
            required
            placeholder="Phone Number * (e.g. 8012345678)"
            name="phone"
            type="tel"
            id="phone"
            value={values.phone}
            onChange={handleChange("phone")}
            className="w-2/3 h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
          />
        </div>

        <input
          placeholder="Zip Code"
          name="zipCode"
          type="text"
          id="zipCode"
          value={values.zipCode}
          onChange={handleChange("zipCode")}
          className="w-full h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      {/* Validation Messages */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>📱 Phone format: For Nigeria (+234), enter 10 digits (e.g. 8012345678)</p>
        <p>🏙️ City: Please select from the dropdown list only</p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-block w-full bg-green my-6 p-4 rounded outline-0 font-semibold text-white text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
        style={{ marginTop: "2.5rem" }}
      >
        {submitting ? "Saving..." : "Next"}
      </button>
    </form>
  );
}

export default ShippingAddress;