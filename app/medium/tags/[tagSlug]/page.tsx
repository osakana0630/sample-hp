import { MediaLayout } from "@/components/layout/media-layout";
import { getArticlesByTagIds, getTagBySlug } from "@/lib/newt";
import { notFound } from "next/navigation";
import { ArticleList } from "@/components/article-list";

type Props = {
  params: { tagSlug: string };
};
export default async function Page({ params: { tagSlug } }: Props) {
  const tag = await getTagBySlug(tagSlug);
  if (tag === null) notFound();
  const articles = await getArticlesByTagIds([tag._id]);

  return (
    <MediaLayout>
      <h1>「{tag.name}」の記事一覧</h1>
      <ArticleList articles={articles} />
    </MediaLayout>
  );
}
