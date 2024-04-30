type Props = {
  name: string;
};
export function Tag({ name }: Props) {
  return (
    <span className="text-[11px] inline-flex items-center border rounded-2xl bg-muted px-2 py-1">
      {name}
    </span>
  );
}
