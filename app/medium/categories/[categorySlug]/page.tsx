import { getArticlesByCategoryIds, getCategories, getCategoryBySlug } from '@/lib/newt';
import { notFound } from 'next/navigation';
import { MediaLayout } from '@/components/layouts/media-layout';
import { Heading } from '@/components/heading';
import { ArticleList } from '@/components/article-list';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';
import { paths } from '@/routes';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((categories) => ({
    categorySlug: categories.slug,
  }));
}
export const dynamicParams = false;

type Props = {
  params: { categorySlug: string };
};
export default async function Page({ params: { categorySlug } }: Props) {
  // 記事の参照先のカテゴリはIDでのみ絞り込み可能という制約のため
  // カテゴリスラッグからカテゴリを取得し、IDを特定したい
  // https://developers.newt.so/apis/cdn#tag/contents_general/Queries/%E6%B3%A8%E6%84%8F
  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const articles = await getArticlesByCategoryIds([category._id]);
  const hasArticles = articles.length > 0;

  return (
    <MediaLayout
      pageTitle={
        <Heading component="h1" label={`「${category.name}」`} labelEn="Media" />
      }
      breadcrumb={
        <CustomBreadcrumb
          links={[
            { name: 'メディア', href: paths.medium.list },
            { name: 'カテゴリ' },
            { name: category.name },
          ]}
        />
      }
    >
      <section>
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
          「{category.name}」の記事
        </h2>
        {hasArticles ? (
          <ArticleList articles={articles} />
        ) : (
          <p>記事が見つかりませんでした。</p>
        )}
      </section>
    </MediaLayout>
  );
}
