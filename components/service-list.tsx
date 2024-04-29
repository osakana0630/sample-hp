import { BUSINESSES } from "@/constants/business";
import Image from "next/image";

export function ServiceList() {
  return (
    <ul className="space-y-6">
      {BUSINESSES.map((business) => (
        <li
          key={business.label}
          className="grid grid-cols-1 md:grid-cols-3 py-4 gap-6 rounded-lg"
        >
          <div className="relative aspect-video w-full self-start overflow-hidden rounded-lg border">
            <Image
              src={business.image}
              alt={business.label}
              fill
              className="object-contain object-center"
            />
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">{business.label}</h3>
            <p className="text-sm text-muted-foreground leading-8 whitespace-pre-wrap">
              {business.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
