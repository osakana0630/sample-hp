'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { StaffItem } from '@/components/staff-list/staff-item';
import Autoplay from 'embla-carousel-autoplay';
import { type CarouselApi } from '@/components/ui/carousel';

import { Staff } from '@/types/staff';
import { useEffect, useState } from 'react';

type Props = {
  staffs: Staff[];
};
export function StaffCarousel({ staffs }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center gap-1">
      <Carousel
        className="mx-auto w-full" //max-w-xs
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
      >
        <CarouselContent>
          {staffs.map((staff, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
              <StaffItem staff={staff} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-5 h-14 w-14 shadow-xl" variant="outline" />
        <CarouselNext className="-right-5 h-14 w-14 shadow-xl" variant="outline" />
      </Carousel>
      <p className="text-sm tracking-widest text-muted-foreground">
        {current}/{count}
      </p>
    </div>
  );
}
