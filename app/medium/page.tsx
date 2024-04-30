import { Heading } from "@/components/heading";
import { getArticles } from "@/lib/newt";
import { MediaLayout } from "@/components/layout/media-layout";
import { ArticleList } from "@/components/article-list";

export default async function Page() {
  const latestArticles = await getArticles();

  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
    >
      <section>
        <h2 className="font-bold text-3xl mb-6">最新の記事</h2>
        <ArticleList articles={latestArticles} />
        {/* TODO pagination */}
      </section>
    </MediaLayout>
  );
}
