import { BasicLayout } from '@/components/layouts/basic-layout';
import { NewsList } from '../../../../components/news/news-list';
import { getNewsList } from '@/lib/newt';
import { Heading } from '@/components/heading';
import { range } from '@/utils';
import { NEWS_PER_PAGE } from '@/constants/pagination';
import { Pagination } from '@/components/custom-pagination';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';
import { Suspense } from 'react';

/**
 * Note
 * Q: なぜlistセグメントを用意したか？
 * A: 静的レンダリングにおいて、ページネーションを実装すると、現在のページ位置をパスに含めて、ビルド時にページを生成できるようにする必要があるが、
 *    newsセグメントはすでにダイナミックパラメータ（[id]）が配置されているため、ビルド時にエラーが発生する。
 *    そこでlistという新たなセグメントを切って、ビルド時にエラーが発生しないようにする。
 *    他に良い方法があれば採用したい。
 */

export const generateStaticParams = async () => {
  const { total } = await getNewsList();

  const paths = range(1, Math.ceil(total / NEWS_PER_PAGE)).map((num) => ({
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
  const { news, total } = await getNewsList({ page: currentPage });
  return (
    <BasicLayout
      pageTitle={<Heading component="h1" label="お知らせ" labelEn="News" />}
      breadcrumb={<CustomBreadcrumb links={[{ name: 'お知らせ' }]} />}
    >
      <section className="space-y-4">
        <h2 className="mb-6 text-center text-2xl font-semibold">お知らせ一覧</h2>
        <NewsList newsList={news} />
        {/* TODO: 不足しているページアイテムの分だけ領域をとりたい */}
        <Suspense>
          <Pagination
            totalItems={total}
            itemsPerPage={NEWS_PER_PAGE}
            baseUrl="/news/list"
            currentPage={currentPage}
            delta={2}
          />
        </Suspense>
      </section>
    </BasicLayout>
  );
}
