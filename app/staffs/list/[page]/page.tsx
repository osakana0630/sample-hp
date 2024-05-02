import { BasicLayout } from '@/components/layouts/basic-layout';
import { getStaffs } from '@/lib/newt';
import { Heading } from '@/components/heading';
import { range } from '@/utils';
import { NEWS_PER_PAGE, STAFFS_PER_PAGE } from '@/constants/pagination';
import { Pagination } from '@/components/custom-pagination';
import { StaffItem } from '@/components/staff-list/staff-item';
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
  const { total } = await getStaffs();

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
  const { staffs, total } = await getStaffs({ page: currentPage });
  return (
    <BasicLayout
      pageTitle={
        <Heading component="h1" label="コンサルタント紹介" labelEn="Consultants" />
      }
      breadcrumb={<CustomBreadcrumb links={[{ name: 'コンサルタント紹介' }]} />}
    >
      <section className="space-y-4">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {staffs.map((staff) => (
            <StaffItem key={staff._id} staff={staff} />
          ))}
        </ul>
        {/* TODO: 不足しているページアイテムの分だけ領域をとりたい */}
        <Suspense>
          <Pagination
            totalItems={total}
            itemsPerPage={STAFFS_PER_PAGE}
            baseUrl="/staffs/list"
            currentPage={currentPage}
            delta={2}
          />
        </Suspense>
      </section>
    </BasicLayout>
  );
}
