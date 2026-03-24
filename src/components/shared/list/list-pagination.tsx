import Link from "next/link";

type ListPaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  preservedParams?: Record<string, string | undefined>;
};

const buildHref = ({
  page,
  basePath,
  preservedParams = {},
}: {
  page: number;
  basePath: string;
  preservedParams?: Record<string, string | undefined>;
}) => {
  const params = new URLSearchParams();
  params.set("page", String(page));

  for (const [key, value] of Object.entries(preservedParams)) {
    if (!value || !value.trim()) {
      continue;
    }
    params.set(key, value.trim());
  }

  return `${basePath}?${params.toString()}`;
};

export function ListPagination({
  page,
  totalPages,
  basePath,
  preservedParams,
}: ListPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const currentPage = Math.min(Math.max(page, 1), safeTotalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < safeTotalPages;

  return (
    <nav className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
      {hasPrev ? (
        <Link
          href={buildHref({
            page: currentPage - 1,
            basePath,
            preservedParams,
          })}
          className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Previous
        </Link>
      ) : (
        <span className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-muted px-3 text-sm font-medium text-muted-foreground cursor-pointer">
          Previous
        </span>
      )}

      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
        <span className="font-medium text-foreground">{safeTotalPages}</span>
      </p>

      {hasNext ? (
        <Link
          href={buildHref({
            page: currentPage + 1,
            basePath,
            preservedParams,
          })}
          className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Next
        </Link>
      ) : (
        <span className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-muted px-3 text-sm font-medium text-muted-foreground cursor-pointer">
          Next
        </span>
      )}
    </nav>
  );
}
