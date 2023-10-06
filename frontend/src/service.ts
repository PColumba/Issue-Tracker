import { Issue, IssueState } from "./model"

//ToDo: either check for proper response schemas at runtime with io-ts or be optimistic and use something that supports generic types for responses
export const getIssues = async () => {
  return fetch("/issues").then(res => res.json()) as unknown as Issue[]
}

export const getIssue = async (id: number) => {
  return fetch(`/issues/${id}`).then(res => res.json()) as unknown as Issue
}

export const updateIssue = async (id: number, state: IssueState) => {
  return fetch(`/issues/${id}`, { 
      method: "patch",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ state })
    }).then(res => res.json()) as unknown as Issue
}