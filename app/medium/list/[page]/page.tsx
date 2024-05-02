import { MediaLayout } from '@/components/layouts/media-layout';
import { ArticleList } from '@/components/article-list';
import { Heading } from '@/components/heading';
import { range } from '@/utils';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';
import { Suspense } from 'react';
import { getArticles } from '@/lib/newt';
import { ARTICLES_PER_PAGE } from '@/constants/pagination';
import { Pagination } from '@/components/custom-pagination';
/**
 * Note
 * Q: なぜlistセグメントを用意したか？
 * A: 静的レンダリングにおいて、ページネーションを実装すると、現在のページ位置をパスに含めて、ビルド時にページを生成できるようにする必要があるが、
 *    mediumセグメントはすでにダイナミックパラメータ（[articleSlug]）が配置されているため、ビルド時にエラーが発生する。
 *    そこでlistという新たなセグメントを切って、ビルド時にエラーが発生しないようにする。
 *    他に良い方法があれば採用したい。
 */

export const generateStaticParams = async () => {
  const { total } = await getArticles();

  const paths = range(1, Math.ceil(total / ARTICLES_PER_PAGE)).map((num) => ({
    page: `${num}`, //stringにしなければいけない
  }));
  return paths;
};

export const dynamicParams = false;

type Props = {
  params: {
    page: string;
  };
};

export default async function Page({ params }: Props) {
  const currentPage = Number(params.page);
  const { articles, total } = await getArticles({ page: currentPage });
  return (
    <MediaLayout
      pageTitle={<Heading component="h1" label="メディア" labelEn="Media" />}
      breadcrumb={<CustomBreadcrumb links={[{ name: 'メディア' }]} />}
    >
      <section className="space-y-4">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">最新の記事</h2>
        <ArticleList articles={articles} />
        {/* TODO pagination */}
        <Suspense>
          <Pagination
            totalItems={total}
            currentPage={currentPage}
            baseUrl={'/medium/list'}
            itemsPerPage={ARTICLES_PER_PAGE}
            isSSG
          />
        </Suspense>
      </section>
    </MediaLayout>
  );
}
