import Link from 'next/link';
import { Staff } from '@/types/staff';
import Image from 'next/image';
import { paths } from '@/routes';

type StaffItemProps = {
  staff: Staff;
};
export function StaffItem({ staff }: StaffItemProps) {
  return (
    <div className="relative rounded-lg border p-4 hover:bg-accent hover:shadow-lg">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg border bg-muted">
        <Image
          src={staff.profileImage.src}
          alt={staff.fullName}
          fill
          className="object-cover object-center"
        />
      </div>
      <h3>
        <Link href={paths.staffs.detail(staff._id)}>
          {staff.fullName}
          <span className="absolute inset-0" />
        </Link>
      </h3>
      <p className="line-clamp-4 min-h-20 text-sm text-muted-foreground">
        {staff.career}
      </p>
    </div>
  );
}
