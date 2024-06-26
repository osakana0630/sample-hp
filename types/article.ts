import type { Content } from 'newt-client-js';
import { Category } from '@/types/category';
import { Tag } from '@/types/tag';

export type Article = {
  title: string;
  slug: string;
  body: string;
  categories: Category[];
  isRecommended: boolean;
  recommendedOrder: number;
  tags: Tag[];
  coverImage: {
    src: string;
  };
} & Content;
