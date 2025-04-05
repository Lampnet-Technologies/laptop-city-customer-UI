import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mfhxtuoq",     
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-04-04",       
});

export default client;
