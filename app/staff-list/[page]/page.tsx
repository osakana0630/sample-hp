import { BasicLayout } from "@/components/layouts/basic-layout";
import { getStaffs } from "@/lib/newt";
import { Heading } from "@/components/heading";
import { range } from "@/utils";
import { NEWS_PER_PAGE, STAFFS_PER_PAGE } from "@/constants/pagination";
import { Pagination } from "@/components/custom-pagination";
import { StaffItem } from "@/components/staff-list/staff-item";

/**
 * Note
 * Q: staffsセグメントが存在するのに、なぜstaff-listセグメントを用意したか？
 * A: 静的レンダリングにおいて、ページネーションを実装すると、現在のページ位置をパスに含めて、ビルド時にページを生成できるようにする必要があるが、
 *    newsセグメントはすでにダイナミックパラメータ（[id]）が配置されているため、ビルド時にエラーが発生する。
 *    そこでnews-listという新たなセグメントを切って、ビルド時にエラーが発生しないようにする。
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
        <Heading
          component="h1"
          label="コンサルタント紹介"
          labelEn="Consultants"
        />
      }
    >
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl mb-6 text-center">
          コンサルタント一覧
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staffs.map((staff) => (
            <StaffItem key={staff._id} staff={staff} />
          ))}
        </ul>
        {/* TODO: 不足しているページアイテムの分だけ領域をとりたい */}
        <Pagination
          totalItems={total}
          itemsPerPage={STAFFS_PER_PAGE}
          baseUrl="/staff-list"
          currentPage={currentPage}
          delta={2}
        />
      </section>
    </BasicLayout>
  );
}