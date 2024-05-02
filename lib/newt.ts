import 'server-only';

import { createClient } from 'newt-client-js';
import { cache } from 'react';
import type { Article } from '@/types/article';
import { Staff } from '@/types/staff';
import { Category } from '@/types/category';
import { News } from '@/types/news';
import { Tag } from '@/types/tag';
import { PaginationOption } from '@/types/pagination';
import {
  ARTICLES_PER_PAGE,
  CATEGORIES_PER_PAGE,
  NEWS_PER_PAGE,
  STAFFS_PER_PAGE,
  TAGS_PER_PAGE,
} from '@/constants/pagination';

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID || '',
  token: process.env.NEWT_CDN_API_TOKEN || '',
  apiType: 'cdn',
  fetch: fetch, // https://github.com/Newt-Inc/newt-client-js?tab=readme-ov-file#configuration
});

// ----------------------------------------------------------------------------

// NewtのCDN APIでは認証に Authorization ヘッダを利用していますが、Next.jsの fetch() は Authorization ヘッダを利用する場合はキャッシュされないため、ここではReactの cache() を利用
export const getArticles = cache(async (option?: PaginationOption) => {
  const { items, total } = await client.getContents<Article>({
    appUid: process.env.APP_UID || '',
    modelUid: 'article',
    query: {
      order: ['-priority', '-_sys.createdAt'],
      ...buildPaginationParams(option, ARTICLES_PER_PAGE),
    },
  });
  return { articles: items, total };
});

export const getArticleById = cache(async (id: string) => {
  return await client.getContent<Article>({
    appUid: process.env.APP_UID || '',
    modelUid: 'article',
    contentId: id,
  });
});

export const getArticleBySlug = cache(async (slug: string) => {
  return await client.getFirstContent<Article>({
    appUid: process.env.APP_UID || '',
    modelUid: 'article',
    query: {
      slug,
    },
  });
});

export const getArticlesByCategoryIds = cache(
  async (categoryIds: string[], option?: PaginationOption) => {
    const { items, total } = await client.getContents<Article>({
      appUid: process.env.APP_UID || '',
      modelUid: 'article',
      query: {
        categories: {
          in: categoryIds,
        },
        ...buildPaginationParams(option, ARTICLES_PER_PAGE),
      },
    });
    return { articles: items, total };
  }
);

export const getArticlesByTagIds = cache(
  async (tagIds: string[], option?: PaginationOption) => {
    const { items, total } = await client.getContents<Article>({
      appUid: process.env.APP_UID || '',
      modelUid: 'article',
      query: {
        tags: {
          in: tagIds,
        },
        ...buildPaginationParams(option, ARTICLES_PER_PAGE),
      },
    });
    return { articles: items, total };
  }
);

export const searchArticles = cache(
  async (keyword: string, option?: PaginationOption) => {
    const { items, total } = await client.getContents<Article>({
      appUid: 'blog',
      modelUid: 'article',
      query: {
        title: {
          match: keyword,
        },
        ...buildPaginationParams(option, ARTICLES_PER_PAGE),
        order: ['-priority', '_sys.createdAt'],
      },
    });
    return { articles: items, total };
  }
);

export const getRecommendedArticles = cache(async () => {
  const { items, total } = await client.getContents<Article>({
    appUid: process.env.APP_UID || '',
    modelUid: 'article',
    query: {
      isRecommended: true,
      recommendedOrder: {
        ne: 0, // 0の記事を除外
      },
      order: ['-priority', 'recommendedOrder'],
    },
  });
  return { recommendedArticles: items, total };
});

// ----------------------------------------------------------------------------

export const getStaffs = cache(async (option?: PaginationOption) => {
  const { items, total } = await client.getContents<Staff>({
    appUid: process.env.APP_UID || '',
    modelUid: 'staff',
    query: {
      ...buildPaginationParams(option, STAFFS_PER_PAGE),
    },
  });
  return { staffs: items, total };
});

export const getStaffById = cache(async (id: string) => {
  return await client.getContent<Staff>({
    appUid: process.env.APP_UID || '',
    modelUid: 'staff',
    contentId: id,
  });
});

export const getTopThreeStaffs = cache(async () => {
  const { items } = await client.getContents<Staff>({
    appUid: process.env.APP_UID || '',
    modelUid: 'staff',
    query: {
      limit: 3,
      isTopThreeStaff: true,
      order: ['-priority', 'topThreeStaffOrder'],
    },
  });
  return items;
});

// ----------------------------------------------------------------------------

export const getCategories = cache(async (option?: PaginationOption) => {
  const { items, total } = await client.getContents<Category>({
    appUid: process.env.APP_UID || '',
    modelUid: 'category',
    query: {
      ...buildPaginationParams(option, CATEGORIES_PER_PAGE),
    },
  });
  return { categories: items, total };
});

export const getCategoryBySlug = cache(async (slug: string) => {
  return await client.getFirstContent<Category>({
    appUid: process.env.APP_UID || '',
    modelUid: 'category',
    query: {
      slug,
    },
  });
});

// ----------------------------------------------------------------------------

export const getNewsList = cache(async (option?: PaginationOption) => {
  const { items, total } = await client.getContents<News>({
    appUid: process.env.APP_UID || '',
    modelUid: 'news',
    query: {
      order: ['-priority', '-_sys.createdAt'],
      ...buildPaginationParams(option, NEWS_PER_PAGE),
    },
  });
  return { news: items, total };
});

export const getNewsById = cache(async (id: string) => {
  return await client.getContent<News>({
    appUid: process.env.APP_UID || '',
    modelUid: 'news',
    contentId: id,
  });
});

// ----------------------------------------------------------------------------
export const getTags = cache(async (option?: PaginationOption) => {
  const { items, total } = await client.getContents<Tag>({
    appUid: process.env.APP_UID || '',
    modelUid: 'tag',
    query: {
      ...buildPaginationParams(option, TAGS_PER_PAGE),
    },
  });

  return { tags: items, total };
});

export const getTagBySlug = cache(async (slug: string) => {
  return await client.getFirstContent<Category>({
    appUid: process.env.APP_UID || '',
    modelUid: 'tag',
    query: {
      slug,
    },
  });
});

// ----------------------------------------------------------------------------

// ページネーションパラメータを生成する関数
const buildPaginationParams = (
  paginationOption: PaginationOption | undefined,
  itemsPerPage: number
): { skip: number; limit: number } | Record<string, never> => {
  if (!paginationOption) return {};

  if ('limit' in paginationOption) {
    return { limit: paginationOption.limit || 100, skip: 0 };
  }

  const skip = (paginationOption.page - 1) * itemsPerPage;
  const limit = itemsPerPage;
  return { skip, limit };
};
