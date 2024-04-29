import Link from "next/link";
import { Staff } from "@/types/staff";
import Image from "next/image";
import { trimString } from "@/lib/utils";

type StaffItemProps = {
  staff: Staff;
};
export function StaffItem({ staff }: StaffItemProps) {
  return (
    <div className="relative rounded-lg border p-4 hover:bg-accent hover:shadow-lg">
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
    </div>
  );
}
