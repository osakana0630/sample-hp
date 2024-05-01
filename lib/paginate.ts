interface PaginationOptions {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  delta?: number;
}

type PageItem =
  | {
      type: "number";
      value: number;
    }
  | {
      type: "dots";
      value?: undefined;
    };

interface PaginationResult {
  pages: PageItem[];
}

export const paginate = (options: PaginationOptions): PaginationResult => {
  const { totalItems, itemsPerPage, currentPage, delta = 2 } = options;
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const pages: PageItem[] = [];
  let rangeStart = Math.max(2, currentPage - delta);
  let rangeEnd = Math.min(pageCount - 1, currentPage + delta);

  if (currentPage - delta > 2) {
    pages.push({ type: "dots" });
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push({ type: "number", value: i });
  }

  if (currentPage + delta < pageCount - 1) {
    pages.push({ type: "dots" });
  }

  if (pageCount > 1) {
    pages.unshift({ type: "number", value: 1 });
    pages.push({ type: "number", value: pageCount });
  }

  return {
    pages,
  };
};