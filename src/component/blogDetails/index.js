import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../sanityClient";
import Loading from "../../component/loading";
import { PortableText } from "@portabletext/react";

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "post" && _id == $id][0]{
          title,
          subtitle,
          category,
          minRead,
          body,
          mainImage {
            asset -> {
              url
            }
          }
        }`,
        { id }
      )
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <Loading />;
  if (!post) return <div className="text-center mt-10">Post not found</div>;

  return (
    <div className="w-[80%] mx-auto my-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <h1 className="text-xl mb-4">{post.subtitle}</h1>
      <div className="flex gap-4 mb-2">
        <span className="bg-black text-white rounded p-2 w-[100px] text-center">
          {post.category}
        </span>
        <span className="mt-2">{post.minRead} min read</span>
      </div>
      {post.mainImage?.asset?.url && (
        <img
          src={post.mainImage.asset.url}
          alt={post.title}
          className="w-full h-auto rounded-md my-4"
        />
      )}
      <div className="prose max-w-none">
        <PortableText value={post.body} />
      </div>
    </div>
  );
}
