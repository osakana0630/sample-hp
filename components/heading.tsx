import { delaGothicOne } from "@/lib/font";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  labelEn: string;
  component?: "h1" | "h2";
  className?: string;
};
export function Heading({
  label,
  labelEn,
  className,
  component = "h2",
}: Props) {
  const Component = component;
  return (
    <Component
      className={cn(
        `before:${delaGothicOne.className}`,
        className,
        "font-semibold text-lg md:text-xl before:content-[attr(data-label-en)] before:block before:text-3xl before:lg:text-4xl before:font-serif",
      )}
      data-label-en={labelEn || ""}
    >
      {label}
    </Component>
  );
}
