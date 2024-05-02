export const paths = {
  home: '/',
  companyInfo: '/company-info',
  contact: '/contact',
  privacyPolicy: '/privacy-policy',
  siteMap: '/sitemap',
  staffs: {
    detail: (id: string) => `/staffs/${id}`,
    list: (page: number) => `/staffs/list/${page}`,
  },
  news: {
    detail: (id: string) => `/news/${id}`,
  },
  newsList: (page: number) => `/news-list/${page}`,
  medium: {
    list: (page: number) => `/medium/list/${page}`,
    detail: (articleSlug: string) => `/medium/${articleSlug}`,
    tags: {
      detail: (tagSlug: string, page: number) => `/medium/tags/${tagSlug}/${page}`,
    },
    categories: {
      detail: (categorySlug: string, page: number) =>
        `/medium/categories/${categorySlug}/${page}`,
    },
    search: '/medium/search',
  },
} as const;
