import React from "react";

function Pagination() {
  return (
    <div className="flex justify-center items-center">
      <nav aria-label="pagination navigation">
        <ul className="flex justify-center items-center gap-3">
          <li className="inline-block">
            <button
              className="py-2 px-4 rounded flex justify-center items-center outline-none bg-pagination hover:bg-green hover:text-white hover:font-semibold focus:text-white focus:bg-green focus:font-semibold"
              tabIndex="0"
              type="button"
              aria-label="Go to previous page"
            >
              &lt;
            </button>
          </li>
          <li className="inline-block">
            <button
              className="py-2 px-4 rounded flex justify-center items-center outline-none bg-pagination hover:bg-green hover:text-white hover:font-semibold focus:text-white focus:bg-green focus:font-semibold"
              tabIndex="0"
              type="button"
              aria-label="Go to page 1"
            >
              1
            </button>
          </li>
          <li className="inline-block">
            <button
              className="py-2 px-4 rounded flex justify-center items-center outline-none bg-pagination hover:bg-green hover:text-white hover:font-semibold focus:text-white focus:bg-green focus:font-semibold"
              tabIndex="0"
              type="button"
              aria-label="Go to page 2"
            >
              2
            </button>
          </li>
          <li className="inline-block">
            <button
              className="py-2 px-4 rounded flex justify-center items-center outline-none bg-pagination hover:bg-green hover:text-white hover:font-semibold focus:text-white focus:bg-green focus:font-semibold"
              tabIndex="0"
              type="button"
              aria-label="page 3"
              aria-current="true"
            >
              3
            </button>
          </li>
          <li className="inline-block">
            <button
              className="py-2 px-4 rounded flex justify-center items-center outline-none bg-pagination hover:bg-green hover:text-white hover:font-semibold focus:text-white focus:bg-green focus:font-semibold"
              tabIndex="-1"
              type="button"
              aria-label="Go to next page"
              disabled=""
            >
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
