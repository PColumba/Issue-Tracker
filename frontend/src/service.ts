import { Issue, IssueState } from "./model"

export const getIssues = async () => {
  const issues: Issue[] = [
    { id: "1", title: "Issue 1", description: "I am an issue 1", state: IssueState.PENDING },
    { id: "2", title: "Issue 2", description: "I am an issue 2", state: IssueState.OPEN },
    { id: "3", title: "Issue 3", description: "I am an issue 3", state: IssueState.CLOSED },
  ]
  return issues
}

export const getIssue = async (id: string) => {
  return { id: id, title: "Issue", description: `I am an issue with id: ${id}. DSASdads asd .a sdasd asd asd.asd ad asd asd asd ad asd asd asd asd ad asd asd d`, state: IssueState.PENDING }
}

export const updateIssue = async (id: string, state: IssueState) => {
  return { id: id, title: "Issue", description: `I am an issue with id: ${id}. DSASdads asd .a sdasd asd asd.asd ad asd asd asd ad asd asd asd asd ad asd asd d`, state: state }
}