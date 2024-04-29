import { getArticleById, getArticles } from "@/lib/newt";
import { notFound } from "next/navigation";
import BasicLayout from "@/components/layout/basic-layout";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    id: article._id,
  }));
}
export const dynamicParams = false;

export default async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <BasicLayout pageTitle="">
      <div className="prose container">
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </BasicLayout>
  );
}
