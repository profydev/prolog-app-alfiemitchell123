import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue, IssueFilters } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(page?: number, filter?: IssueFilters) {
  if (page === undefined) {
    return [QUERY_KEY, filter];
  }
  return [QUERY_KEY, page, filter];
}

export function useGetIssues(page: number, filter: IssueFilters) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, filter),
    ({ signal }) => getIssues(page, filter, { signal }),
    { keepPreviousData: true },
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1, filter), ({ signal }) =>
        getIssues(page + 1, filter, { signal }),
      );
    }
  }, [query.data, page, filter, queryClient]);
  return query;
}
