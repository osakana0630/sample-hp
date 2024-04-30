import {
  getArticlesByCategoryIds,
  getCategories,
  getCategoryBySlug,
} from "@/lib/newt";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { paths } from "@/routes";

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
  if (category === null) {
    notFound();
  }
  const articles = await getArticlesByCategoryIds([category._id]);

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="mb-6 font-bold text-2xl">「{categorySlug}」の記事一覧</h1>
      <ul className="space-y-2">
        {articles.map((article) => (
          <li
            key={article._id}
            className="relative rounded-lg border p-4 hover:bg-accent"
          >
            <h3>
              <Link href={paths.medium.detail(article.slug)}>
                {article.title}
                <span className="absolute inset-0" />
              </Link>
            </h3>
            <time className="text-sm text-muted-foreground">
              {format(new Date(article._sys.createdAt), "yyyy年MM月dd日")}
            </time>
            <div>
              {article.categories.map((category) => (
                <span
                  key={category._id}
                  className="p-1 bg-muted border rounded-lg"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
