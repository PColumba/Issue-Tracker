export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
}

export type IssueCreateRequest = Pick<Issue, "description" | "title">;

export interface CreatableIssue extends IssueCreateRequest {
  status: IssueStatus.OPEN;
}

export enum IssueStatus {
  OPEN = "Open",
  PENDING = "Pending",
  CLOSED = "Closed",
}
