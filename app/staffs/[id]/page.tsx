import { getStaffs, getStaffById } from '@/lib/newt';
import { BasicLayout } from '@/components/layouts/basic-layout';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Heading } from '@/components/heading';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';
import { paths } from '@/routes';

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
        <Heading component="h1" label="コンサルタント詳細" labelEn="Consultant detail" />
      }
      breadcrumb={
        <CustomBreadcrumb
          links={[
            { name: 'コンサルタント紹介', href: paths.staffList(1) },
            { name: staff.fullName },
          ]}
        />
      }
    >
      <div className="flex flex-col">
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border bg-muted">
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

        <dl className="flex flex-col gap-6 rounded-lg border p-4 md:flex-row">
          <dt className="w-12 font-semibold">経歴</dt>
          <dd className="flex-1 whitespace-pre-wrap text-muted-foreground">
            {staff.career}
          </dd>
        </dl>
      </div>
    </BasicLayout>
  );
}
