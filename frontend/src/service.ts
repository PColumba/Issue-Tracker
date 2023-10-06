import { Issue, IssueStatus } from "./model"

//ToDo: either check for proper response schemas at runtime with io-ts or be optimistic and use something that supports generic types for responses
//ToDo: Proper error handling based on server statuses
export const getIssues = async () => {
  return fetch("/issues").then(res => res.json()) as unknown as Issue[]
}


export const getIssue = async (id: number) => {
  return fetch(`/issues/${id}`).then(res => { 
    if(res.ok) return res.json()
    else throw new Error("Could not fetch the Issue with id " + id)
  }) as unknown as Issue
}

export const updateIssue = async (id: number, status: IssueStatus) => {
  return fetch(`/issues/${id}`, { 
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    }).then(res => { 
      if(res.ok) return res.json()
      else throw new Error("Could not update the issue status")
    }) as unknown as Issue
}

export const createIssue = async (title: string, description: string) => {
  return fetch(`/issues`, { 
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    }).then(res => { 
      if(res.ok) return res.json()
      else throw new Error("Could not create new issue")
    }) as unknown as Issue
}