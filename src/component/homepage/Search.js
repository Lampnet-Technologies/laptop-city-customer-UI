import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LaptopCityButton from "../button";

const baseUrl = process.env.REACT_APP_BASE_URL

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const showSearchResult = async (term) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseUrl}/products/search?query=${encodeURIComponent(
          term
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Navigate to /products with search results in state
      navigate("/products", {
        state: { results: data, searchTerm: term },
      });
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          showSearchResult(searchTerm);
        }}
        className="flex flex-row items-center justify-center gap-3 w-full max-w-3xl"
      >
        <div className="flex items-center w-full bg-white border-2 border-[#BBC8D4] rounded-lg px-4 h-[45px] md:h-[56px]">
          <i className="bx bx-search bx-sm text-[#94A3B1] mr-2"></i>
          <input
            id="searchGadget"
            type="text"
            placeholder="Search for gadgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 placeholder:text-[#BBC8D4] text-sm md:text-base font-medium outline-none"
          />
        </div>

        <LaptopCityButton
          className="min-w-[90px] px-6 py-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </LaptopCityButton>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center w-full">{error}</p>
      )}
    </div>
  );
}
