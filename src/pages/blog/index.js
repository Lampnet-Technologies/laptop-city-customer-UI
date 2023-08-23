import React, { useState, useEffect } from "react";
import client from "../../utils/client";
import format from "date-fns/format";
import IMAGES from "../../assets";
import { Link } from "react-router-dom";
import Loading from "../../component/loading";

const filters = ["view all", "laptops", "desktops", "accessories"];

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultFilter, setDefaultFilter] = useState("view all");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
        title,
        slug,
        body,
        publishedAt,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt,
        },
        "name": author -> name,
      } | order(publishedAt desc)`
      )
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(console.error());
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
          <p className="font-normal w-3/4 max-w-sm mx-auto">
            Learn about laptops, desktops, and laptop accessories, discover the
            most recent information about our products, partnerships, user
            experiences, and more.
          </p>
        </div>

        <div className="p-1 rounded-md border border-solid border-green flex justify-between items-center gap-0.5 flex-wrap md:justify-center md:gap-3 w-fit mx-auto">
          {filters.map((filter, index) => {
            return (
              <button
                key={index}
                type="button"
                className={`p-2 text-xs md:text-sm lg:text-base font-normal bg-transparent outline-0 rounded transition-colors duration-300 hover:bg-blue-300 hover:text-white hover:font-semibold ${
                  defaultFilter == filter &&
                  "bg-dark-blue text-white font-semibold"
                } focus:bg-dark-blue focus:text-white focus:font-semibold`}
                onClick={() => setDefaultFilter(filter)}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {posts[0] && (
          <section>
            <article className="flex flex-col md:flex-row h-[700px] md:h-[500px] border border-solid border-green rounded-md">
              <div className="w-full h-3/5 md:h-full md:w-[110%] lg:w-[120%]">
                <img
                  src={posts[0].mainImage.asset.url}
                  alt={posts[0].title}
                  className="max-w-full h-full w-full object-cover rounded-l-md"
                />
              </div>
              <div className="w-full h-2/5 md:h-full md:w-[90%] lg:w-[80%] p-3 md:p-10 lg:p-14 flex flex-col justify-between gap-3">
                <div className="space-y-2 md:space-y-3 lg:space-y-2 overflow-y-hidden">
                  <div className="flex items-center gap-4 mb-2 lg:mb-3">
                    <span className="bg-black text-white py-1 px-2 text-sm rounded-sm">
                      category
                    </span>
                    <span className="font-light text-xs lg:text-sm">
                      {format(new Date(posts[0].publishedAt), "dd MMMM yyyy")}
                    </span>
                  </div>
                  <h2 className="text-blog-title text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px] font-semibold capitalize">
                    {posts[0].title}
                  </h2>
                  <p className="font-normal text-sm md:text-base">
                    {`${posts[0].body[1].children[0].text.substring(
                      0,
                      300
                    )}...`}
                  </p>
                </div>
                <div>
                  <button className="outline-0">
                    <Link
                      to={`/blog/${posts[0].slug.current}`}
                      className="py-2 px-4 font-normal bg-transparent rounded border border-solid border-green transition-all duration-300 flex justify-center items-center hover:bg-green hover:text-white hover:font-semibold active:bg-green active:text-white active:font-semibold"
                    >
                      Read more <i className="bx bx-chevron-right md:bx-md"></i>
                    </Link>
                  </button>
                </div>
              </div>
            </article>
            <figcaption className="mt-2 font-normal text-[10px] lg:text-xs">
              {posts[0].name}
            </figcaption>
          </section>
        )}

        {isLoading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto pb-4 flex flex-nowrap gap-3 md:py-0 md:gap-10 md:grid md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug.current}
                className="min-w-[168px] border border-solid border-green rounded-md flex flex-col h-[600px] mx-auto md:w-full md:mx-0"
              >
                <div
                  className="h-64 md:h-60 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${post.mainImage.asset.url})`,
                  }}
                >
                  {/* <img
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    className="max-w-full max-h-full h-full w-full rounded-t-md"
                    loading="lazy"
                  /> */}
                </div>
                {/* <figcaption className="my-2 mx-4 font-normal text-[10px] lg:text-xs">
                  {post.name ? `(${post.name})` : ""}
                </figcaption> */}

                <div className="px-[8px] py-[12px] md:p-4 flex flex-col justify-between items-start flex-1">
                  <div className="space-y-2 md:space-y-3 lg:space-y-2 overflow-y-hidden">
                    <div className="flex items-center justify-between gap-[2px] md:justify-start md:gap-4 mb-2 text-xs lg:text-sm lg:mb-3">
                      <span className="bg-black text-white p-1 md:py-1 md:px-2 rounded-sm">
                        category
                      </span>
                      <span className="font-normal">
                        {format(new Date(post.publishedAt), "dd MMMM yyyy")}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-2xl text-blog-title font-semibold mb-4">
                      {post.title}
                    </h3>
                    <p className="font-normal text-sm md:text-base">
                      {`${post.body[1].children[0].text.substring(0, 300)}...`}
                    </p>
                  </div>
                  <button className="outline-0">
                    <Link
                      to={`/blog/${post.slug.current}`}
                      className="p-2 font-normal text-xs md:text-sm lg:text-base bg-transparent rounded border-2 border-solid border-green transition-all duration-300 flex justify-center items-center hover:bg-green hover:text-white hover:font-semibold active:bg-green active:text-white active:font-semibold"
                    >
                      Read more <i className="bx bx-chevron-right "></i>
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
