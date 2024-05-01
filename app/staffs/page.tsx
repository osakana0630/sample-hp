import { getStaffs } from "@/lib/newt";
import { BasicLayout } from "@/components/layouts/basic-layout";
import { StaffItem } from "@/components/staff-list/staff-item";
import { Heading } from "@/components/heading";

export default async function Page() {
  const staffs = await getStaffs();
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
      <section>
        <h2 className="font-semibold text-2xl mb-6 text-center">
          コンサルタント一覧
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staffs.map((staff) => (
            <StaffItem key={staff._id} staff={staff} />
          ))}
        </ul>
      </section>
    </BasicLayout>
  );
}
