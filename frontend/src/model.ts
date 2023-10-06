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

export const getPossibleStateUpdates = (state: IssueState) => {
  switch (state)  {
    case IssueState.OPEN:
      return [IssueState.CLOSED, IssueState.PENDING]
    case IssueState.CLOSED:
      return []
    case IssueState.PENDING:
      return [IssueState.CLOSED]
    default:
      return []
  }
}