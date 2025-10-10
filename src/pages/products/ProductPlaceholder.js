import React from 'react';

// Single Product Placeholder
export function ProductPlaceholder({ className = "" }) {
  return (
    <div className={`w-44 h-56 lg:w-60 lg:h-80 rounded-md flex flex-col justify-between border border-[#DADADA] animate-pulse ${className}`}>
      <div className="h-32 lg:h-48 rounded bg-gray-200 flex justify-center items-center relative">
        {/* Image placeholder */}
        <div className="w-12 h-12 bg-gray-300 rounded animate-pulse"></div>
        {/* Condition badge placeholder */}
        <div className="absolute top-4 right-2 w-9 h-4 bg-gray-300 rounded-sm animate-pulse"></div>
      </div>
      
      <div className="flex flex-col gap-2 justify-between h-20 px-2 pb-3 lg:h-28 lg:pt-2">
        <div className="space-y-2">
          {/* Title placeholder */}
          <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
        {/* Price placeholder */}
        <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
      </div>
    </div>
  );
}

// Grid of Product Placeholders
export function ProductPlaceholderGrid({ 
  count = 6, 
  showAsGrid = true, 
  className = "",
  gridCols = "grid-cols-2 md:grid-cols-3" 
}) {
  const placeholders = Array.from({ length: count }, (_, index) => (
    <div className={showAsGrid ? "" : "flex-none w-44 lg:w-60"} key={`placeholder-${index}`}>
      <ProductPlaceholder />
    </div>
  ));

  if (showAsGrid) {
    return (
      <div className={`grid ${gridCols} gap-4 ${className}`}>
        {placeholders}
      </div>
    );
  }

  return (
    <div className={`flex gap-4 pb-4 min-w-0 ${className}`}>
      {placeholders}
    </div>
  );
}

// Horizontal scrolling placeholder (for "other gadgets" section)
export function ProductPlaceholderScroll({ count = 4, className = "" }) {
  return (
    <div className={`relative overflow-x-auto hide-scrollbar ${className}`}>
      <ProductPlaceholderGrid 
        count={count} 
        showAsGrid={false}
      />
    </div>
  );
}

export default ProductPlaceholder;