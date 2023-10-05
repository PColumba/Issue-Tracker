export enum IssueState {
  OPEN = "Open",
  PENDING = "Pending",
  CLOSED = "Closed"
}

export interface Issue {
  id: string,
  title: string,
  description: string,
  state: IssueState
}