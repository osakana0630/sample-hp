import { getStaffs, getStaffById } from "@/lib/newt";
import BasicLayout from "@/components/layout/basic-layout";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  const staffs = await getStaffs();
  return staffs.map((staff) => ({
    id: staff._id,
  }));
}
export const dynamicParams = false;

export default async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const staff = await getStaffById(id);

  if (staff === null) {
    notFound();
  }

  return (
    <BasicLayout pageTitle="コンサルタント詳細">
      <div className="container">
        <div className="aspect-square w-40 overflow-hidden border rounded-lg bg-muted mb-4 relative">
          <Image
            src={staff.profileImage.src}
            alt={staff.fullName}
            fill
            className="object-cover object-center"
          />
        </div>
        <p>{staff.fullName}</p>
        <p>{staff.career}</p>
      </div>
    </BasicLayout>
  );
}
