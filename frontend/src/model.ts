export enum IssueStatus {
  OPEN = "Open",
  PENDING = "Pending",
  CLOSED = "Closed"
}

export interface Issue {
  id: string,
  title: string,
  description: string,
  status: IssueStatus
}

export const getPossibleStateUpdates = (state: IssueStatus) => {
  switch (state)  {
    case IssueStatus.OPEN:
      return [IssueStatus.CLOSED, IssueStatus.PENDING]
    case IssueStatus.CLOSED:
      return []
    case IssueStatus.PENDING:
      return [IssueStatus.CLOSED]
    default:
      return []
  }
}