import { Heading } from '@/components/heading';
import { searchArticles } from '@/lib/newt';
import { MediaLayout } from '@/components/layouts/media-layout';
import { ArticleList } from '@/components/article-list';
import { Pagination } from '@/components/custom-pagination';
import { ARTICLES_PER_PAGE } from '@/constants/pagination';
import { paths } from '@/routes';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';

// FIXME: cloudflare workers のedgeで動かすaxiosがedgeランタイムに対応していないのでとエラーになる
//  https://github.com/axios/axios/issues/5523
export const runtime = 'edge';

type Props = {
  searchParams: {
    q: string;
    page: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const q = searchParams.q;
  const currentPage = Number(searchParams.page) || 1;
  const { articles, total } = await searchArticles(q, { page: currentPage });
  const hasArticles = articles.length > 0;

  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
      breadcrumb={
        <CustomBreadcrumb
          links={[
            { name: 'メディア', href: paths.medium.list },
            { name: `「${q}」の検索結果` },
          ]}
        />
      }
    >
      <section className="space-y-2">
        <h2 className="mb-6 text-3xl font-bold">{`「${q}」の検索結果`}</h2>
        {/* TODO pagination */}
        {!hasArticles && <p>記事が見つかりませんでした。</p>}
        {hasArticles && (
          <>
            <ArticleList articles={articles} />
            <Pagination
              totalItems={total}
              currentPage={currentPage}
              baseUrl={paths.medium.search}
              itemsPerPage={ARTICLES_PER_PAGE}
              isSSG={false}
            />
          </>
        )}
      </section>
    </MediaLayout>
  );
}
