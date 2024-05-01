import { getStaffs, getStaffById } from "@/lib/newt";
import { BasicLayout } from "@/components/layouts/basic-layout";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Heading } from "@/components/heading";

export async function generateStaticParams() {
  const { staffs } = await getStaffs();
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
    <BasicLayout
      pageTitle={
        <Heading
          component="h1"
          label="コンサルタント詳細"
          labelEn="Consultant detail"
        />
      }
    >
      <div className="flex flex-col">
        <div className="aspect-video overflow-hidden border rounded-lg bg-muted mb-4 relative">
          <Image
            src={staff.profileImage.src}
            alt={staff.fullName}
            fill
            className="object-contain object-center"
          />
        </div>
        <p className="text-2xl font-semibold">{staff.fullName}</p>

        <div className="prose">
          <div dangerouslySetInnerHTML={{ __html: staff.biography }} />
        </div>

        <dl className="flex flex-col md:flex-row gap-6 border p-4 rounded-lg">
          <dt className="w-12 font-semibold">経歴</dt>
          <dd className="whitespace-pre-wrap flex-1 text-muted-foreground">
            {staff.career}
          </dd>
        </dl>
      </div>
    </BasicLayout>
  );
}
