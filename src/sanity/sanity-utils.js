import { createClient, groq } from "next-sanity";
import { clientConfig } from "./config/client-config";

export const getProjects = async () => {
  return createClient(clientConfig).fetch(groq`*[_type=="project"]{
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    url,
    content
  }`);
};

export const getProject = async (slug) => {
  return createClient(clientConfig).fetch(
    groq`*[_type=="project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
    { slug }
  );
};

export const getPages = async () => {
  return createClient(clientConfig).fetch(groq`*[_type=="page"]{
    _id,
    _createdAt,
    title,
    "slug": slug.current,
  }`);
};

export const getPage = async (slug) => {
  return createClient(clientConfig).fetch(
    groq`*[_type=="page" && slug.current==$slug][0]{
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    content
  }`,
    { slug }
  );
};
