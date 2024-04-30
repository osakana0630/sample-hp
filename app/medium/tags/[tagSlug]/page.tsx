import { MediaLayout } from "@/components/layout/media-layout";
import { getArticlesByTagIds, getTagBySlug } from "@/lib/newt";
import { notFound } from "next/navigation";
import { ArticleList } from "@/components/article-list";
import { Heading } from "@/components/heading";

type Props = {
  params: { tagSlug: string };
};
export default async function Page({ params: { tagSlug } }: Props) {
  const tag = await getTagBySlug(tagSlug);
  if (tag === null) notFound();
  const articles = await getArticlesByTagIds([tag._id]);
  const hasArticles = articles.length > 0;

  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
    >
      <section>
        <h2 className="font-bold text-lg md:text-xl mb-6">
          「{tag.name}」の記事一覧
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
