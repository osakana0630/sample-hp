import { getStaffs } from "@/lib/newt";
import BasicLayout from "@/components/layout/basic-layout";
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
      <div className="container relative">
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staffs.map((staff) => (
            <StaffItem key={staff._id} staff={staff} />
          ))}
        </ul>
      </div>
    </BasicLayout>
  );
}
