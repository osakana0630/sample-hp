import type { Content } from 'newt-client-js';

export type News = {
  title: string;
  slug: string;
  body: string;
  coverImage: string;
} & Content;
