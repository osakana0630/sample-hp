import { getArticles, getArticleBySlug } from "@/lib/newt";
import { notFound } from "next/navigation";
import BasicLayout from "@/components/layout/basic-layout";
import { Heading } from "@/components/heading";
import { MediaLayout } from "@/components/layout/media-layout";

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
  if (!article) notFound();

  return (
    <MediaLayout
      pageTitle={
        <Heading component="h1" label="メディア詳細" labelEn="Media" />
      }
    >
      <section className="prose">
        <h2 className="font-bold text-3xl mb-6">{article.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </section>
    </MediaLayout>
  );
}
