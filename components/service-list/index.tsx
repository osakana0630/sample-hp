import { BUSINESSES } from '@/constants/business';
import Image from 'next/image';

export function ServiceList() {
  return (
    <ul className="space-y-6">
      {BUSINESSES.map((business) => (
        <li key={business.label}>
          <article className="grid grid-cols-1 gap-6 rounded-lg md:grid-cols-5">
            <div className="relative aspect-video w-full self-start overflow-hidden rounded-lg border md:col-span-2">
              <Image
                src={business.image}
                alt={business.label}
                fill
                className="object-contain object-center"
              />
            </div>
            <div className="md:col-span-3">
              <h3 className="mb-3 text-xl font-semibold">{business.label}</h3>
              <p className="whitespace-pre-wrap text-sm leading-8 text-muted-foreground">
                {business.description}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
