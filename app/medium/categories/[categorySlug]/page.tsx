import {
  getArticlesByCategoryIds,
  getCategories,
  getCategoryBySlug,
} from "@/lib/newt";
import { notFound } from "next/navigation";
import { MediaLayout } from "@/components/layouts/media-layout";
import { Heading } from "@/components/heading";
import { ArticleList } from "@/components/article-list";

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
        <Heading
          component="h1"
          label={`「${category.name}」`}
          labelEn="Media"
        />
      }
    >
      <section>
        <h1 className="mb-6 font-bold text-2xl">
          「{category.name}」の記事一覧
        </h1>
        {hasArticles ? (
          <ArticleList articles={articles} />
        ) : (
          <p>記事が見つかりませんでした。</p>
        )}
      </section>
    </MediaLayout>
  );
}
