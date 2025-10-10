import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlaceOrderContext } from "../../App";

const baseUrl = process.env.REACT_APP_BASE_URL;
const countriesApiUrl = process.env.REACT_APP_COUNTRIES_API_URL;

const createSenderAddressUrl = `${baseUrl}/shipping/sender-address`;

const accessToken = () => localStorage.getItem("token");

// Validate environment variables
if (!countriesApiUrl) {
  console.error('REACT_APP_COUNTRIES_API_URL is not defined in environment variables');
}

function ShippingAddress({ goTo }) {
  const [placeOrder, setPlaceOrder] = useContext(PlaceOrderContext);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
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
    fetch(`${countriesApiUrl}/states`, {
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

  const normalizeState = (state) => {
    if (!state) return state;
    return state.replace(/ State$/i, "").trim();
  };


  useEffect(() => {
    if (values.state && states.includes(values.state)) {
      setIsLoadingCities(true);
      setCities([]);
      setValues((prev) => ({ ...prev, city: "" })); // Reset city selection

      fetch(`${countriesApiUrl}/state/cities`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ country: "Nigeria", state: values.state }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.data && Array.isArray(result.data)) {
            // Sort cities alphabetically for better UX
            const sortedCities = result.data.sort((a, b) => a.localeCompare(b));
            setCities(sortedCities);
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

  const validateAndFormatPhoneNumber = (phone, countryCode) => {
    // Remove all non-digit characters
    let cleanPhone = phone.replace(/\D/g, '');

    console.log("Phone validation input:", { phone, countryCode, cleanPhone });

    // Handle Nigerian phone numbers specifically
    if (countryCode === '+234') {
      // Strip leading zero or duplicate country code
      if (cleanPhone.startsWith("234")) cleanPhone = cleanPhone.slice(3);
      if (cleanPhone.startsWith("0")) cleanPhone = cleanPhone.slice(1);

      // Should now have exactly 10 digits
      if (cleanPhone.length === 10) {
        const formatted = `+234${cleanPhone}`;
        console.log("Nigerian phone formatted:", formatted);
        return formatted;
      } else {
        throw new Error(`Invalid phone number format. Please enter 10 digits for Nigerian numbers.`);
      }
    }

    /*     For US numbers
       if (countryCode === '+1') {
         if (cleanPhone.length === 10) {
           return `+1${cleanPhone}`;
         } else {
           throw new Error(`Invalid US phone number. Expected 10 digits, got ${cleanPhone.length}.`);
         }
       }
       
       For UK numbers
       if (countryCode === '+44') {
         if (cleanPhone.startsWith('0')) {
           cleanPhone = cleanPhone.substring(1);
         }
         if (cleanPhone.length >= 10 && cleanPhone.length <= 11) {
           return `+44${cleanPhone}`;
         } else {
           throw new Error(`Invalid UK phone number. Expected 10-11 digits, got ${cleanPhone.length}.`);
         }
       }
        */
    // Fallback - return as formatted but may still fail validation
    return `${countryCode}${cleanPhone}`;
  };

  const validateCity = (cityName, availableCities) => {
    const trimmedCity = cityName.trim();

    console.log("City validation:", {
      input: cityName,
      trimmed: trimmedCity,
      availableCities: availableCities.slice(0, 5),
      totalCities: availableCities.length
    });

    // Exact match (case-sensitive)
    if (availableCities.includes(trimmedCity)) {
      return trimmedCity;
    }

    // Case-insensitive match
    const caseInsensitiveMatch = availableCities.find(
      city => city.toLowerCase() === trimmedCity.toLowerCase()
    );

    if (caseInsensitiveMatch) {
      console.log("Found case-insensitive match:", caseInsensitiveMatch);
      return caseInsensitiveMatch;
    }

    throw new Error(`Please select a valid city from the dropdown options that match your state and address.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("=== FORM SUBMISSION DEBUG ===");
      console.log("Form values:", values);
      console.log("Available cities:", cities.length, cities.slice(0, 10));
      console.log("Available states:", states.length);

      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'address', 'state', 'city', 'phone'];
      const missingFields = requiredFields.filter(field => !values[field]?.trim());

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate and format phone number
      let formattedPhone;
      try {
        formattedPhone = validateAndFormatPhoneNumber(values.phone, values.countryCode);
        console.log("Phone validation successful:", formattedPhone);
      } catch (phoneError) {
        console.error("Phone validation failed:", phoneError.message);
        throw phoneError;
      }

      // Validate city selection
      let validatedCity;
      try {
        validatedCity = validateCity(values.city, cities);
        console.log("City validation successful:", validatedCity);
      } catch (cityError) {
        console.error("City validation failed:", cityError.message);
        throw cityError;
      }

      // Build payload matching the exact API specification from Swagger
      const payload = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim() || "", // Email is optional based on your form
        address: values.address.trim(),
        state: normalizeState(values.state.trim()),
        city: validatedCity,
        zipCode: values.zipCode.trim() || "", // ZipCode might be optional
        phone: formattedPhone,
      };

      console.log("=== API PAYLOAD ===");
      console.log(JSON.stringify(payload, null, 2));

      // Check authentication
      const token = accessToken();
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      console.log("Making API request to:", createSenderAddressUrl);

      const response = await fetch(createSenderAddressUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("API Response status:", response.status);
      console.log("API Response headers:", Object.fromEntries(response.headers.entries()));

      let responseData;
      try {
        responseData = await response.json();
        console.log("API Response data:", responseData);
      } catch (parseError) {
        console.error("Failed to parse response JSON:", parseError);
        throw new Error("Invalid response format from server");
      }

      if (!response.ok) {
        console.error("=== API ERROR ===");
        console.error("Status:", response.status);
        console.error("Response:", responseData);

        // Handle specific error cases with shorter messages
        let errorMessage = "Failed to save shipping address";

        if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        } else {
          errorMessage += `: Error ${response.status}`;
        }

        throw new Error(errorMessage);
      }

      console.log("=== SUCCESS ===");
      console.log("Address created successfully:", responseData);

      // Update context with the new address data
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
          address_id: responseData.address_id || responseData.id, // Handle different response formats
        },
      }));

      // Navigate to next step
      if (goTo) {
        goTo("shipping-method");
      } else {
        console.log("No goTo function provided");
      }

      alert("Shipping address saved successfully!");

    } catch (error) {
      console.error("=== SUBMISSION ERROR ===");
      console.error("Error:", error);

      // Show user-friendly error message
      const userMessage = error.message || "An unexpected error occurred. Please try again.";
      alert(userMessage);
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
              {state}
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
          disabled={!values.state || isLoadingCities}
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
            placeholder="Phone Number * (10 digits for Nigeria)"
            name="phone"
            type="tel"
            id="phone"
            value={values.phone}
            onChange={handleChange("phone")}
            className="w-2/3 h-11 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
            maxLength={values.countryCode === '+234' ? 11 : 15}
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

      {/* Updated User Guidance */}
      <div className="text-sm text-gray-600 space-y-1 bg-blue-50 p-3 rounded">
        <p className="font-medium text-gray-800">📋 Required Information:</p>
        <p>📱 <strong>Phone:</strong> For Nigeria (+234), enter exactly 10 digits (e.g., 8012345678)</p>
        <p>🏙️ <strong>City & Address:</strong> Select city from dropdown (if not available, choose state name or nearest option). Address must match selected city for proper validation - use street number, name, and area only</p>
        <p>📮 <strong>Zip Code:</strong> Optional - can be left blank</p>
        <p className="pt-2 border-t border-gray-200 mt-2">
          <strong>Need Help?</strong> Contact us: 📞 +234-901-647-2503 | ✉️ support@lampnets.com
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting || isLoadingCities}
        className="inline-block w-full bg-green my-6 p-4 rounded outline-0 font-semibold text-white text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        style={{ marginTop: "2.5rem" }}
      >
        {submitting ? "Saving Address..." : isLoadingCities ? "Loading Cities..." : "Save & Continue"}
      </button>
    </form>
  );
}

export default ShippingAddress;