export const paths = {
  home: "/",
  companyInfo: "/company-info",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  siteMap: "/sitemap",
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
    detail: (id: string) => `/medium/${id}`,
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
