import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentMethod({ goTo, back }) {
  const [paymentType, setPaymentType] = useState("withCard");

  const [values, setValues] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const expiryFormat = (value) => {
    const expDate = value;
    const expDateFormatter =
      expDate.replace(/\//g, "").substring(0, 2) +
      (expDate.length > 2 ? "/" : "") +
      expDate.replace(/\//g, "").substring(2, 4);

    return expDateFormatter;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleRadioChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="space-y-4 md:space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h4 className="font-medium text-lg text-dark-blue md:text-xl lg:text-2xl">
        Payment Method
      </h4>

      <div className="flex item-center gap-3">
        <input
          className="accent-green"
          type="radio"
          name="payment"
          value="withCard"
          id="withCard"
          checked={paymentType === "withCard"}
          onChange={handleChange}
        />

        <label htmlFor="withCard">Pay with Card</label>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cardNumber" className="font-normal text-sm lg:text-lg">
          Card Number
        </label>
        <input
          placeholder="0000 0000 0000 0000"
          name="cardNumber"
          type="number"
          id="cardNumber"
          value={values.cardNumber}
          onChange={handleChange("cardNumber")}
          className="w-full h-8 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
        />
      </div>

      <div className="flex justify-between gap-6 md:gap-11 lg:gap-20">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="expiry" className="font-normal text-sm lg:text-lg">
            Expiry
          </label>
          <input
            placeholder="MM/YY"
            name="expiry"
            type="text"
            id="expiry"
            value={expiryFormat(values.expiry)}
            onChange={handleChange("expiry")}
            className="w-full h-8 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="cvv" className="font-normal text-sm lg:text-lg">
            CVV
          </label>
          <input
            placeholder="***"
            name="cvv"
            type="number"
            id="cvv"
            value={values.cvv}
            onChange={handleChange("cvv")}
            className="w-full h-8 bg-transparent border-b-2 border-b-solid border-b-gray-300 py-1 outline-0 font-light text-sm"
          />
        </div>
      </div>

      <p
        className="text-sm font-normal lg:text-lg"
        style={{ marginTop: "2rem" }}
      >
        By Clicking *<span className="font-medium">Confirm Payment</span>* I
        agree to company terms of services
      </p>

      <div
        className="flex justify-between gap-6 lg:gap-8 md:justify-around lg:justify-end"
        style={{ marginBlock: "2.5rem 1rem" }}
      >
        <button
          type="button"
          className="inline-block w-full md:w-48 bg-transparent border border-solid border-green p-2 rounded outline-0 font-semibold text-black text-sm"
          // onClick={() => navigate(-1)}
          onClick={back}
        >
          {" "}
          Back
        </button>

        <button
          type="button"
          className="inline-block w-full md:w-48 bg-green p-2 rounded outline-0 font-semibold text-white text-sm"
          // onClick={() => navigate("/payment/review-order")}
          onClick={() => goTo("order-review")}
        >
          {" "}
          Confirm Payment
        </button>
      </div>
    </form>
  );
}

export default PaymentMethod;
