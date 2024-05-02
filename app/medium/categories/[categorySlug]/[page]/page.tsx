import { getArticlesByCategoryIds, getCategories, getCategoryBySlug } from '@/lib/newt';
import { notFound } from 'next/navigation';
import { MediaLayout } from '@/components/layouts/media-layout';
import { Heading } from '@/components/heading';
import { ArticleList } from '@/components/article-list';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';
import { paths } from '@/routes';
import { Suspense } from 'react';
import { Pagination } from '@/components/custom-pagination';
import { ARTICLES_PER_PAGE } from '@/constants/pagination';
import { range } from '@/utils';

type TotalPerSlug = { categorySlug: string; total: number };
type Path = { categorySlug: string; page: string };

// https://ja.next-community-docs.dev/docs/app-router/api-reference/functions/generate-static-params#%E3%83%9C%E3%83%88%E3%83%A0%E3%82%A2%E3%83%83%E3%83%97%E3%81%A7%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E3%82%92%E7%94%9F%E6%88%90%E3%81%99%E3%82%8B
export async function generateStaticParams() {
  const { categories } = await getCategories();

  const totalPerSlug: TotalPerSlug[] = [];
  for (const category of categories) {
    const { total } = await getArticlesByCategoryIds([category._id]);
    totalPerSlug.push({
      categorySlug: category.slug,
      total: total || 1, // 0件の場合は1ページ目を表示するために1を設定
    });
  }

  const paths: Path[] = [];
  for (const item of totalPerSlug) {
    const pageRange = range(1, Math.ceil(item.total / ARTICLES_PER_PAGE));
    for (const num of pageRange) {
      paths.push({
        categorySlug: item.categorySlug,
        page: `${num}`,
      });
    }
  }

  return paths;
}
export const dynamicParams = false;

type Props = {
  params: { categorySlug: string; page: string };
};
export default async function Page({ params: { categorySlug, page } }: Props) {
  const currentPage = Number(page) || 1;
  // 記事の参照先のカテゴリはIDでのみ絞り込み可能という制約のため
  // カテゴリスラッグからカテゴリを取得し、IDを特定したい
  // https://developers.newt.so/apis/cdn#tag/contents_general/Queries/%E6%B3%A8%E6%84%8F
  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const { articles, total } = await getArticlesByCategoryIds([category._id], {
    page: currentPage,
  });
  const hasArticles = articles.length > 0;

  return (
    <MediaLayout
      pageTitle={
        <Heading component="h1" label={`「${category.name}」`} labelEn="Media" />
      }
      breadcrumb={
        <CustomBreadcrumb
          links={[
            { name: 'メディア', href: paths.medium.list(1) },
            { name: 'カテゴリ' },
            { name: category.name },
          ]}
        />
      }
    >
      <section className="space-y-2">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
          「{category.name}」の記事
        </h2>
        {!hasArticles && <p>記事が見つかりませんでした。</p>}
        {hasArticles && (
          <>
            <ArticleList articles={articles} />
            <Suspense>
              <Pagination
                totalItems={total}
                currentPage={currentPage}
                baseUrl={`/medium/categories/${categorySlug}`}
                itemsPerPage={ARTICLES_PER_PAGE}
                isSSG
              />
            </Suspense>
          </>
        )}
      </section>
    </MediaLayout>
  );
}
