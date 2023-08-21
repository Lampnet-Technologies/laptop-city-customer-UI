import React, { useEffect, useState } from "react";
import { Groups } from "../../component/homepage/productGroups";

function SubProducts() {
  const [bestSelling, setBestSelling] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState(null);

  const checkScreenSize = () => {
    if (window.innerWidth >= 1500) {
      return 5;
    } else {
      return 4;
    }
  };

  useEffect(() => {
    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/products/best-selling?pageNo=0&pageSize=${checkScreenSize()}`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setBestSelling(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://apps-1.lampnets.com/ecommb-staging/products/reviewed?pageNo=0&pageSize=${checkScreenSize()}&sortBy=createdOn&sortDir=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setRecentlyViewed(result.content);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  return (
    <div className="mt-16 mb-10 px-2 space-y-8 md:mx-12 lg:mt-24 lg:mx-24 ">
      <Groups heading="best selling products" products={bestSelling} seeMore />
      <Groups heading="recently viewed" products={recentlyViewed} seeMore />
    </div>
  );
}

export default SubProducts;
