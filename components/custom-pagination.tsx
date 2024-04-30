import { paginate } from "@/lib/paginate";
import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  baseUrl,
  delta = 2,
}: {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  baseUrl: string;
  delta?: number;
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const { pages } = paginate({
    totalItems,
    itemsPerPage,
    currentPage,
    delta,
  });

  const createURL = (value: number) => {
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
          if (page.type === "dots") {
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
