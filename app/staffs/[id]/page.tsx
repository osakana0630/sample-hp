import { getStaff } from "@/lib/newt";
import BasicLayout from "@/components/layout/basic-layout";
import { notFound } from "next/navigation";
import Image from "next/image";

export const runtime = "edge";
export default async function Page({
  searchParams: { id },
}: {
  searchParams: {
    id: string;
  };
}) {
  const staff = await getStaff(id);

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
