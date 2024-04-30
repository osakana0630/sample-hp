import "server-only";

import { createClient } from "newt-client-js";
import { cache } from "react";
import type { Article } from "@/types/article";
import { Staff } from "@/types/staff";
import { Category } from "@/types/category";
import { News } from "@/types/news";
import { Tag } from "@/types/tag";

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID || "",
  token: process.env.NEWT_CDN_API_TOKEN || "",
  apiType: "cdn",
});

// ----------------------------------------------------------------------------

// NewtのCDN APIでは認証に Authorization ヘッダを利用していますが、Next.jsの fetch() は Authorization ヘッダを利用する場合はキャッシュされないため、ここではReactの cache() を利用
export const getArticles = cache(async () => {
  const { items } = await client.getContents<Article>({
    appUid: process.env.APP_UID || "",
    modelUid: "article",
    query: {
      order: ["-priority", "-_sys.createdAt"],
    },
  });
  return items;
});

export const getArticleById = cache(async (id: string) => {
  return await client.getContent<Article>({
    appUid: process.env.APP_UID || "",
    modelUid: "article",
    contentId: id,
  });
});

export const getArticlesByCategoryIds = cache(async (categoryIds: string[]) => {
  const { items } = await client.getContents<Article>({
    appUid: process.env.APP_UID || "",
    modelUid: "article",
    query: {
      categories: {
        in: categoryIds,
      },
    },
  });
  return items;
});

export const getArticlesByCategorySlug = cache(
  async (categorySlugs: string[]) => {
    const { items } = await client.getContents<Article>({
      appUid: process.env.APP_UID || "",
      modelUid: "article",
      query: {
        categories: {
          in: categorySlugs,
        },
      },
    });
    return items;
  },
);

export const getArticlesByTagIds = cache(async (tagIds: string[]) => {
  const { items } = await client.getContents<Article>({
    appUid: process.env.APP_UID || "",
    modelUid: "article",
    query: {
      tags: {
        in: tagIds,
      },
    },
  });
  return items;
});

// ----------------------------------------------------------------------------

export const getStaffs = cache(async (skip?: number, limit?: number) => {
  const { items } = await client.getContents<Staff>({
    appUid: process.env.APP_UID || "",
    modelUid: "staff",
    query: {
      skip,
      limit,
    },
  });
  return items;
});

export const getStaffById = cache(async (id: string) => {
  return await client.getContent<Staff>({
    appUid: process.env.APP_UID || "",
    modelUid: "staff",
    contentId: id,
  });
});

// ----------------------------------------------------------------------------

export const getCategories = cache(async () => {
  const { items } = await client.getContents<Category>({
    appUid: process.env.APP_UID || "",
    modelUid: "category",
  });
  return items;
});

export const getCategoryBySlug = cache(async (slug: string) => {
  return await client.getFirstContent<Category>({
    appUid: process.env.APP_UID || "",
    modelUid: "category",
    query: {
      slug,
    },
  });
});

// ----------------------------------------------------------------------------

export const getNewsList = cache(async () => {
  const { items } = await client.getContents<News>({
    appUid: process.env.APP_UID || "",
    modelUid: "news",
    query: {
      order: ["-priority", "_sys.createdAt"],
    },
  });
  return items;
});

export const getNewsById = cache(async (id: string) => {
  return await client.getContent<News>({
    appUid: process.env.APP_UID || "",
    modelUid: "news",
    contentId: id,
  });
});

// ----------------------------------------------------------------------------
export const getTags = cache(async () => {
  const { items } = await client.getContents<Tag>({
    appUid: process.env.APP_UID || "",
    modelUid: "tag",
  });
  return items;
});

export const getTagBySlug = cache(async (slug: string) => {
  return await client.getFirstContent<Category>({
    appUid: process.env.APP_UID || "",
    modelUid: "tag",
    query: {
      slug,
    },
  });
});

// ----------------------------------------------------------------------------
