import BasicLayout from "@/components/layout/basic-layout";
import { Heading } from "@/components/heading";
import { getArticles, getCategories } from "@/lib/newt";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MediaLayout } from "@/components/layout/media-layout";
import { ArticleList } from "@/components/article-list";

export default async function Page() {
  const categories = await getCategories();
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
