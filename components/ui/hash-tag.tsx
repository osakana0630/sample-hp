type Props = {
  name: string;
};

export function HashTag({ name }: Props) {
  return <span className="text-[11px]"># {name}</span>;
}
