import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";

function Pagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex justify-center items-center">
      <nav aria-label="pagination navigation">
        <ul className="flex justify-center items-center gap-3">
          <li className="inline-block">
            <button
              className="disabled:pointer-events-none py-2 px-4 rounded flex justify-center items-center outline-none bg-pagination hover:bg-green hover:text-white hover:font-semibold focus:text-white focus:bg-green focus:font-semibold"
              tabIndex="0"
              type="button"
              aria-label="Go to previous page"
              disabled={currentPage === 1}
              onClick={onPrevious}
            >
              &lt;
            </button>
          </li>
          {paginationRange.map((pageNumber, index) => {
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === DOTS) {
              return <li className="pagination-item dots">&#8230;</li>;
            }

            // Render our Page Pills
            return (
              <li className="inline-block" key={index}>
                <button
                  className="py-2 px-4 rounded flex justify-center items-center outline-none bg-pagination hover:bg-green hover:text-white hover:font-semibold focus:text-white focus:bg-green focus:font-semibold"
                  tabIndex="0"
                  type="button"
                  aria-label="Go to page 1"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

         
          <li className="inline-block">
            <button
              className="disabled:pointer-events-none py-2 px-4 rounded flex justify-center items-center outline-none bg-pagination hover:bg-green hover:text-white hover:font-semibold focus:text-white focus:bg-green focus:font-semibold"
              tabIndex="-1"
              type="button"
              aria-label="Go to next page"
              disabled={currentPage === lastPage}
              onClick={onNext}
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
