import React, { useState, useEffect } from "react";
import client from "../../utils/client";
import IMAGES from "../../assets";
import { Link } from "react-router-dom";
import Loading from "../../component/loading";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
        title,
        slug,
        body,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        }
      }`
      )
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="my-16 p-4 2xl:max-w-7xl 2xl:mx-auto space-y-10 md:space-y-12 lg:space-y-16">
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="text-dark-blue flex justify-center items-center gap-1 lg:text-xl">
            Blog <img src={IMAGES.icons.blogStar} alt="icon" />{" "}
          </p>
          <h1 className="text-4xl lg:text-5xl text-dark-blue font-bold">
            News and insights
          </h1>
          <p className="font-normal w-3/4">
            Learn about laptops, desktops, and laptop accessories, discover the
            most recent information about our products, partnerships, user
            experiences, and more.
          </p>
        </div>

        <div className="p-1 rounded-md border border-solid border-green flex justify-between items-center gap-0.5 flex-wrap md:justify-center md:gap-2 md:w-fit md:mx-auto">
          <button
            type="button"
            className="p-2 text-sm lg:text-base font-normal bg-transparent outline-0 rounded transition-colors duration-300 hover:bg-blue-300 hover:text-white hover:font-semibold active:bg-dark-blue active:text-white active:font-semibold focus:bg-dark-blue focus:text-white focus:font-semibold"
          >
            View all
          </button>
          <button
            type="button"
            className="p-2 text-sm lg:text-base font-normal bg-transparent outline-0 rounded transition-colors duration-300 hover:bg-blue-300 hover:text-white hover:font-semibold active:bg-dark-blue active:text-white active:font-semibold focus:bg-dark-blue focus:text-white focus:font-semibold"
          >
            Laptops
          </button>
          <button
            type="button"
            className="p-2 text-sm lg:text-base font-normal bg-transparent outline-0 rounded transition-colors duration-300 hover:bg-blue-300 hover:text-white hover:font-semibold active:bg-dark-blue active:text-white active:font-semibold focus:bg-dark-blue focus:text-white focus:font-semibold"
          >
            Desktops
          </button>
          <button
            type="button"
            className="p-2 text-sm lg:text-base font-normal bg-transparent outline-0 rounded transition-colors duration-300 hover:bg-blue-300 hover:text-white hover:font-semibold active:bg-dark-blue active:text-white active:font-semibold focus:bg-dark-blue focus:text-white focus:font-semibold"
          >
            Accessories
          </button>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug.current}
                className="border border-solid border-green rounded-md flex flex-col w-[90%] mx-auto md:w-full md:mx-0"
              >
                <div className="h-52 md:h-60">
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    className="max-w-full max-h-full w-full rounded-t-md"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between items-start flex-1">
                  <h3 className="text-xl md:text-2xl text-blog-title font-semibold mb-4">
                    {post.title}
                  </h3>
                  <button className="outline-0">
                    <Link
                      to={`/blog/${post.slug.current}`}
                      className="p-2 font-normal bg-transparent rounded border border-solid border-green transition-all duration-300 flex justify-center items-center hover:bg-green hover:text-white hover:font-semibold active:bg-green active:text-white active:font-semibold"
                    >
                      Read more <i className="bx bx-chevron-right md:bx-md"></i>
                    </Link>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Blog;
