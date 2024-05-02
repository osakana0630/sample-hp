type Props = {
  name: string;
};
export function Tag({ name }: Props) {
  return (
    <span className="inline-flex items-center rounded-2xl border bg-muted px-2 py-1 text-[11px]">
      {name}
    </span>
  );
}
