export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "minRead",
      title: "Min Read",
      type: "number",
    },
    {
      name: "mainImage", 
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, 
      },
    },
  ],
};
