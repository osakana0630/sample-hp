export const paths = {
  home: "/",
  companyInfo: "/company-info",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  siteMap: "/sitemap",
  search: "/search",
  staffs: {
    list: "/staffs",
    detail: (id: string) => `/staffs/${id}`,
  },
  news: {
    list: "/news",
    detail: (id: string) => `/news/${id}`,
  },
  medium: {
    list: "/medium",
    detail: (articleSlug: string) => `/medium/${articleSlug}`,
    tags: {
      list: "/medium/tags",
      detail: (tagSlug: string) => `/medium/tags/${tagSlug}`,
    },
    categories: {
      list: "/medium/categories",
      detail: (categorySlug: string) => `/medium/categories/${categorySlug}`,
    },
  },
} as const;
