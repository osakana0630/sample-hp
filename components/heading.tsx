import { delaGothicOne } from '@/lib/font';
import { cn } from '@/lib/utils';

export type HeadingProps = {
  label: string;
  labelEn?: string;
  component?: 'h1' | 'h2' | 'h3';
  className?: string;
};
export function Heading({ label, labelEn, className, component = 'h2' }: HeadingProps) {
  const Component = component;
  return (
    <Component
      className={cn(
        `before:${delaGothicOne.className}`,
        className,
        'text-lg font-semibold before:block before:font-serif before:text-3xl before:content-[attr(data-label-en)] md:text-xl before:lg:text-4xl'
      )}
      data-label-en={labelEn || ''}
    >
      {label}
    </Component>
  );
}
