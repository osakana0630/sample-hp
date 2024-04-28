import Image from "next/image";
import { getStaffs } from "@/lib/newt";
import Link from "next/link";
import { trimString } from "@/lib/utils";
import BasicLayout from "@/components/layout/basic-layout";

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
            <li
              key={staff._id}
              className="relative rounded-lg border p-4 hover:bg-accent"
            >
              <div className="aspect-square overflow-hidden border rounded-lg bg-muted mb-4 relative">
                <Image
                  src={staff.profileImage.src}
                  alt={staff.fullName}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3>
                <Link href={`staffs/${staff._id}`}>
                  {staff.fullName}
                  <span className="absolute inset-0" />
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                {trimString(staff.career, 88)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </BasicLayout>
  );
}
