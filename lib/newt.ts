import "server-only";

import { createClient } from "newt-client-js";
import { cache } from "react";
import type { Article } from "@/types/article";
import { Staff } from "@/types/staff";
import { Category } from "@/types/category";
import { News } from "@/types/news";

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + "",
  token: process.env.NEWT_CDN_API_TOKEN + "",
  apiType: "cdn",
});

// NewtのCDN APIでは認証に Authorization ヘッダを利用していますが、Next.jsの fetch() は Authorization ヘッダを利用する場合はキャッシュされないため、ここではReactの cache() を利用
export const getArticles = cache(async () => {
  const { items } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      order: ["-priority", "_sys.createdAt"],
    },
  });
  return items;
});

export const searchArticles = cache(async (keyword: string) => {
  const { items } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      title: {
        match: keyword,
      },
      select: [
        "_id",
        "title",
        "slug",
        "body",
        "_sys.createdAt",
        "_sys.updatedAt",
      ],
      order: ["-priority", "_sys.createdAt"],
    },
  });
  return items;
});

export const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      slug,
      select: ["_id", "title", "slug", "body", "coverImage", "categories"],
    },
  });
  return article;
});

export const getStaff = cache(async (id: string) => {
  const item = await client.getFirstContent<Staff>({
    appUid: "blog",
    modelUid: "staff",
    query: {
      id,
      select: [
        "_id",
        "fullName",
        "career",
        "biography",
        "profileImage",
        "_sys.createdAt",
        "_sys.updatedAt",
      ],
    },
  });
  return item;
});

export const getStaffs = cache(async (skip?: number, limit?: number) => {
  const { items } = await client.getContents<Staff>({
    appUid: "blog",
    modelUid: "staff",
    query: {
      skip,
      limit,
      select: [
        "_id",
        "fullName",
        "career",
        "biography",
        "profileImage",
        "_sys.createdAt",
        "_sys.updatedAt",
      ],
    },
  });
  return items;
});

export const getCategories = cache(async () => {
  const { items } = await client.getContents<Category>({
    appUid: "blog",
    modelUid: "category",
    query: {
      select: ["_id", "name", "slug"],
    },
  });
  return items;
});

export const getArticlesByCategory = cache(async (category: string) => {
  const { items } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      categories: {
        in: [category],
      },
    },
  });
  return items;
});

export const getNews = cache(async () => {
  const { items } = await client.getContents<News>({
    appUid: "blog",
    modelUid: "news",
    query: {
      select: [
        "_id",
        "title",
        "slug",
        "body",
        "_sys.createdAt",
        "_sys.updatedAt",
      ],
      order: ["-priority", "_sys.createdAt"],
    },
  });
  return items;
});
