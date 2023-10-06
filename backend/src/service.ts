import sql from './db'
import { CreatableIssue, Issue, IssueStatus } from "./model"

export class IssueNotFound extends Error {
  constructor(id: number) {
    super(`Issue with id: ${id} not found`)
  }
}

export class UpdateNotPossible extends Error {
  constructor(id: number, oldStatus: IssueStatus, newStatus: IssueStatus) {
    super(`Cannot update issue with id: ${id}. Cannot change status from ${oldStatus} to ${newStatus} `)
  }
}

export async function getIssues() {
  return await sql<Issue[]>`select id, title, description, status from issues`;
}


export async function createIssue(issue: CreatableIssue) {
  const {title, description, status} = issue
  return (await sql<Issue[]>`insert into issues (title, status, description) values (${title}, ${status}, ${description}) returning id, title, description, status`)[0]
}

export async function getIssue(id: number) {
  const found = await sql<Issue[]>`select id, title, description, status from issues where id = ${id}`
  if(found.length === 0)
    throw new IssueNotFound(id)
  else
    return found[0]
}

export async function updateIssue(id: number, newStatus: IssueStatus) {
  const oldStatus = (await getIssue(id)).status
  if(isUpdatePossible(oldStatus, newStatus))
    return (await sql<Issue[]>`update issues set status = ${newStatus} where id = ${id} returning id, title, description, status`)[0]
  else
    throw new UpdateNotPossible(id, oldStatus, newStatus)
}

function isUpdatePossible(oldStatus: IssueStatus, newStatus: IssueStatus) {
  switch (oldStatus) {
    case IssueStatus.OPEN:
      return [IssueStatus.CLOSED, IssueStatus.PENDING].includes(newStatus)
    case IssueStatus.PENDING:
      return newStatus === IssueStatus.CLOSED
    case IssueStatus.CLOSED:
      return false
    default:
      return false
  }
}



