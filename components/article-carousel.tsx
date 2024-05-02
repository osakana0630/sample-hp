'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { type CarouselApi } from '@/components/ui/carousel';

import { useEffect, useState } from 'react';
import { Article } from '@/types/article';
import { ArticleItem } from '@/components/article-list/article-item';

type Props = {
  articles: Article[];
};
export function ArticleCarousel({ articles }: Props) {
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
          {articles.map((article, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
              <ArticleItem article={article} />
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
