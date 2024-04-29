import { delaGothicOne } from "@/lib/font";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  labelEn: string;
};
export function Heading({ label, labelEn }: Props) {
  return (
    <h2
      className={cn(
        `before:${delaGothicOne.className}`,
        "font-semibold text-xl mb-6 before:content-[attr(data-label-en)] before:block before:text-4xl before:mb-3 before:font-serif",
      )}
      data-label-en={labelEn || ""}
    >
      {label}
    </h2>
  );
}
