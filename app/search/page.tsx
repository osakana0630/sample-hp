import { Heading } from '@/components/heading';
import { searchArticles } from '@/lib/newt';
import { MediaLayout } from '@/components/layouts/media-layout';
import { ArticleList } from '@/components/article-list';

// FIXME: cloudflare workers のedgeで動かすaxiosがedgeランタイムに対応していないのでとエラーになる
//  https://github.com/axios/axios/issues/5523
export const runtime = 'edge';

type Props = {
  searchParams: {
    q: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const q = searchParams.q;
  const articles = await searchArticles(q);
  const hasArticles = articles.length > 0;

  return (
    <MediaLayout pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}>
      <section>
        <h2 className="mb-6 text-3xl font-bold">{`「${q}」の検索結果`}</h2>
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
