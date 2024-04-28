import type { Content } from "newt-client-js";
import { Category } from "@/types/category";

export type Article = {
  title: string;
  slug: string;
  body: string;
  categories: Category[];
} & Content;
