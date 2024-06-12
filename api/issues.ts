import { axios } from "./axios";
import type { Issue, IssueFilters } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  filter: IssueFilters,
  options?: { signal?: AbortSignal },
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, ...filter },
    signal: options?.signal,
  });
  return data;
}
