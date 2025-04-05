import React, { useState, useEffect } from "react";
import Loading from "../../component/loading";
import client from "../../sanityClient";
import { PortableText } from "@portabletext/react";

export default function Blog() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "post"]{
          _id,
          title,
          subtitle,
          category,
          minRead,
          body,
          mainImage {
            asset -> {
              _id,
              url
            }
          }
        }`
      )
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[80%] mx-auto my-10">
          <h1 className="text-center text-base">Blog</h1>
          <div className="w-[80%] mx-auto my-5">
            <h1 className="text-4xl text-center mb-5 font-semibold">
              News and insights
            </h1>
            <p className="text-center w-[70%] mx-auto text-gray-600 mb-5">
              Learn about laptops, desktops, and laptop accessories, discover
              the most recent information about our products, partnerships, user
              experiences, and more.
            </p>
          </div>
          {posts.map((post) => (
            <div key={post._id} className="my-10">
              {post.mainImage?.asset?.url && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  className="w-full h-auto rounded-md mb-4"
                />
              )}

              <p className="flex gap-4 align-center">
                <p className="bg-black text-white rounded p-2 w-[100px] text-center">
                  {post.category}
                </p>
                <p className="mt-2">
                  {" "}
                  {post.minRead} {""}min read
                </p>
              </p>

              <h2 className="my-3 font-semibold text-2xl w-[200px]">
                {post.title}
              </h2>

              <div className="my-7">
                <PortableText value={post.body} />
              </div>
              <a
                className="rounded w-[200px] border border-blue-500 p-2 "
                href="/"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
