import { getStaffs } from "@/lib/newt";
import BasicLayout from "@/components/layout/basic-layout";
import { StaffItem } from "@/components/staff-item";

export default async function Page() {
  const staffs = await getStaffs();
  return (
    <BasicLayout
      pageTitle="コンサルタント紹介"
      leadText={`求人票だけを渡してすぐエントリーさせるコンサルタントは存在しません。\n求職者様へ、圧巻の伴走をお約束いたします。`}
    >
      <div className="container relative">
        <h2 className="font-semibold text-2xl mb-6 text-center">
          コンサルタント一覧
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staffs.map((staff) => (
            <StaffItem key={staff._id} staff={staff} />
          ))}
        </ul>
      </div>
    </BasicLayout>
  );
}
