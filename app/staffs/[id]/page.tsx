import { getStaffs, getStaffById } from '@/lib/newt';
import { BasicLayout } from '@/components/layouts/basic-layout';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Heading } from '@/components/heading';
import { CustomBreadcrumb } from '@/components/custom-breadcrumb';
import { paths } from '@/routes';
import { Slash } from 'lucide-react';
import { Fragment } from 'react';
import { EMPTY_TEXT } from '@/constants/common';

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

  const profileData = [
    {
      label: '得意領域',
      value: staff.specialtyField,
    },
    {
      label: '経歴',
      value: staff.career,
    },
  ];

  return (
    <BasicLayout
      pageTitle={<Heading component="h1" label="コンサルタント" labelEn="Consultant" />}
      breadcrumb={
        <CustomBreadcrumb
          links={[
            { name: 'コンサルタント紹介', href: paths.staffs.list(1) },
            { name: staff.fullName },
          ]}
        />
      }
    >
      <div className="flex flex-col gap-4">
        {/* コンサルタント画像 */}
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border bg-muted">
          <Image
            src={staff.profileImage.src}
            alt={staff.fullName}
            fill
            className="object-contain object-center"
          />
        </div>
        <h2 className="text-2xl font-semibold">
          {staff.fullName}
          <Slash className="mx-2 inline-block" size={20} />
          <span className="text-xl font-normal">{staff.englishFullName}</span>
        </h2>
        {/* 紹介文 */}
        <div className="prose">
          <div dangerouslySetInnerHTML={{ __html: staff.biography }} />
        </div>

        {/* 得意領域/経歴 */}
        <dl className="rounded-lg border p-4">
          {profileData.map((data) => (
            <Fragment key={data.label}>
              <dt className="w-16 font-semibold">{data.label}</dt>
              <dd className="mb-3 ml-3 whitespace-pre-wrap text-muted-foreground">
                {data.value || EMPTY_TEXT}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </BasicLayout>
  );
}
