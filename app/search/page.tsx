import { Heading } from "@/components/heading";
import { searchArticles } from "@/lib/newt";
import { MediaLayout } from "@/components/layout/media-layout";
import { ArticleList } from "@/components/article-list";

type Props = {
  searchParams: {
    q: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const q = searchParams.q;
  const articles = await searchArticles(q);
  const hasArticles = articles.length > 0;

  console.log("メディア検索結果画面です。", q);

  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
    >
      <section>
        <h2 className="font-bold text-3xl mb-6">{`「${q}」の検索結果`}</h2>
        {/* TODO pagination */}
        {hasArticles ? (
          <ArticleList articles={articles} />
        ) : (
          <p>記事が見つかりませんでした。</p>
        )}
      </section>
    </MediaLayout>
  );
}
