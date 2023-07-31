import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import client from "../../utils/client";
import SanityBlockContent from "@sanity/block-content-to-react";
import Loading from "../../component/loading";

function SingleBlogPost() {
  const [singlePost, setSinglePost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
        title,
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
      }`
      )
      .then((data) => {
        setSinglePost(data[0]);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-16 p-4 2xl:max-w-6xl 2xl:mx-auto">
          <section className="block__content">
            <SanityBlockContent
              blocks={singlePost.body}
              projectId="z3tajca4"
              dataset="production"
            />
          </section>
          <button className="flex outline-0 mt-10 mx-auto md:mt-20">
            <Link
              to="/blog"
              className="p-2 px-4 bg-transparent rounded border border-solid border-green transition-all duration-300 flex justify-center items-center hover:bg-green hover:text-white hover:font-semibold active:bg-green active:text-white active:font-semibold"
            >
              <i className="bx bx-chevron-left md:bx-md"></i>
              Read more articles{" "}
            </Link>
          </button>
        </div>
      )}
    </>
  );
}

export default SingleBlogPost;
