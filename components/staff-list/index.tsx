import { StaffItem } from "@/components/staff-list/staff-item";
import { Staff } from "@/types/staff";

type Props = {
  staffs: Staff[];
};
export function StaffList({ staffs }: Props) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {staffs.map((staff) => (
        <StaffItem key={staff._id} staff={staff} />
      ))}
    </ul>
  );
}
