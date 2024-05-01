import { StaffItem } from '@/components/staff-list/staff-item';
import { Staff } from '@/types/staff';

type Props = {
  staffs: Staff[];
};
export function StaffList({ staffs }: Props) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {staffs.map((staff) => (
        <li key={staff._id}>
          <StaffItem staff={staff} />
        </li>
      ))}
    </ul>
  );
}
