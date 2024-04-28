import { getArticleBySlug, getArticles } from "@/lib/newt";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
export const dynamicParams = false;

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const article = await getArticleBySlug(slug);

  if (!article) return;
  return (
    <div className="prose container">
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </div>
  );
}
