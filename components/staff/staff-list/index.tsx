import { StaffItem } from '@/components/staff/staff-list/staff-item';
import { Staff } from '@/types/staff';

type Props = {
  staffs: Staff[];
};
export function StaffList({ staffs }: Props) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {staffs.length > 0 ? (
        staffs.map((staff) => (
          <li key={staff._id}>
            <StaffItem staff={staff} />
          </li>
        ))
      ) : (
        <li>
          <p className="text-muted-foreground">コンサルタントがいません</p>
        </li>
      )}
    </ul>
  );
}
