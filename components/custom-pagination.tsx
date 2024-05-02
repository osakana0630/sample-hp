'use client';
import { usePathname, useSearchParams } from 'next/navigation';

import { paginate } from '@/lib/paginate';
import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  baseUrl,
  delta = 2,
  isSSG = true,
}: {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  baseUrl: string;
  delta?: number;
  isSSG?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  console.log({ pathname });
  console.log({ q: searchParams.get('q') });

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const { pages } = paginate({
    totalItems,
    itemsPerPage,
    currentPage,
    delta,
  });

  const createURL = (value: number) => {
    if (!isSSG) {
      // 既存のpathnameを取得して、pageの部分を置換する
      const searchParams = new URLSearchParams();
      searchParams.set('q', q || '');
      searchParams.set('page', value.toString());

      return `${pathname}?${searchParams.toString()}`;
    }

    if (value < 1) return `${baseUrl}/1`;
    if (value > pageCount) return `${baseUrl}/${currentPage}`;

    return `${baseUrl}/${value}`;
  };

  return (
    <_Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createURL(currentPage - 1)} />
        </PaginationItem>

        {pages.map((page, i) => {
          if (page.type === 'dots') {
            return (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page.value === currentPage}
                  href={createURL(page.value)}
                >
                  {page.value}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          <PaginationNext href={createURL(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </_Pagination>
  );
}
