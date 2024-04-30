import { getArticles, getArticleBySlug } from "@/lib/newt";
import { notFound } from "next/navigation";
import BasicLayout from "@/components/layout/basic-layout";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    articleSlug: article.slug,
  }));
}
export const dynamicParams = false;

type Props = {
  params: {
    articleSlug: string;
  };
};

export default async function Page({ params: { articleSlug } }: Props) {
  const article = await getArticleBySlug(articleSlug);
  if (article === null) notFound();

  return (
    <BasicLayout pageTitle="">
      <div className="prose container">
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </BasicLayout>
  );
}
