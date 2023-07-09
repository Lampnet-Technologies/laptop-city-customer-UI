import client from "@sanity/client";

export default client({
  projectId: "z3tajca4",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-07-09",
});
