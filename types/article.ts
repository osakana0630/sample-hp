import type { Content } from "newt-client-js";

export type Article = {
  title: string;
  slug: string;
  body: string;
} & Content;
