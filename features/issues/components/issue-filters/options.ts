import { IssueStatus, IssueLevel } from "@api/issues.types";

export const statusOptions = [
  { value: IssueStatus.open, label: "Unresolved" },
  { value: IssueStatus.resolved, label: "Resolved" },
];
export const levelOptions = [
  { value: IssueLevel.info, label: "Info" },
  { value: IssueLevel.warning, label: "Warning" },
  { value: IssueLevel.error, label: "Error" },
];
