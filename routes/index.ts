export const paths = {
  home: '/',
  companyInfo: '/company-info',
  contact: '/contact',
  privacyPolicy: '/privacy-policy',
  siteMap: '/sitemap',
  staffs: {
    detail: (id: string) => `/staffs/${id}`,
  },
  staffList: (page: number) => `/staff-list/${page}`,
  news: {
    detail: (id: string) => `/news/${id}`,
  },
  newsList: (page: number) => `/news-list/${page}`,
  medium: {
    list: (page: number) => `/medium/list/${page}`,
    detail: (articleSlug: string) => `/medium/${articleSlug}`,
    tags: {
      list: '/medium/tags',
      detail: (tagSlug: string) => `/medium/tags/${tagSlug}`,
    },
    categories: {
      list: (categorySlug: string, page: number) =>
        `/medium/categories/${categorySlug}/${page}`,
      detail: (categorySlug: string) => `/medium/categories/${categorySlug}`,
    },
    search: '/medium/search',
  },
} as const;
