import React, { useEffect, useState } from "react";

function ProductFilter({ fetchUrl, title, checked, setter }) {
  const [filters, setFilters] = useState();

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setFilters(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-bold capitalize text-center">{title}</h4>

      <div className="space-y-3">
        {filters &&
          filters.map((filter) => {
            return (
              <div
                key={filter.id}
                className="bg-white py-5 px-4 flex items-center gap-5 rounded-md"
              >
                <input
                  type="checkbox"
                  id={`${filter.name}-filter`}
                  name={filter.name}
                  value={filter.id}
                  checked={checked == filter.id}
                  onChange={() => {
                    setter(filter.id);
                  }}
                  className="accent-green cursor-pointer caret-green w-[18px] h-[18px] lg:w-5 lg:h-5"
                />
                <label
                  htmlFor={`${filter.name}-filter`}
                  className="capitalize text-sm font-semibold cursor-pointer"
                >
                  {filter.name}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductFilter;
