import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import IssuesList from "../IssuesList";
import { Issue, IssueState } from '../../../model';
import { useNavigate } from "react-router-dom";

const mockNavigate = jest.fn((path: string) => {})

// We need to mock it since this is only to be used when in router context
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}))


const testIssues: Issue[] = [
  { id: "1", title: "Issue 1", description: "I am an issue 1", state: IssueState.PENDING },
  { id: "2", title: "Issue 2", description: "I am an issue 2", state: IssueState.OPEN },
  { id: "3", title: "Issue 3", description: "I am an issue 3", state: IssueState.CLOSED },
]

test('All provided issues are rendered, only title is visible in list view', async () => {
  // ARRANGE
  render(<IssuesList issues={testIssues} />)

  // ASSERT all items rendered
  expect(screen.getAllByRole('listitem')).toHaveLength(testIssues.length)
  // ASSERT only titles visible in list view
  const descriptions = screen.getAllByText(/I am an issue.*/)
  descriptions.forEach(desc => expect(desc).not.toBeVisible())
})

test('When user clicks an issue, it will expand and the description will be visible', async () => {
  // ARRANGE
  render(<IssuesList issues={testIssues} />)

  // ACT
  fireEvent.click(screen.getByText(testIssues[0].title))
  
  // ASSERT
  expect(screen.getByText(testIssues[0].title)).toBeVisible()
})

test('When user expands an issue, he can choose to edit the issue.', async () => {
  // ARRANGE
  render(<IssuesList issues={testIssues} />)

  // ACT
  fireEvent.click(screen.getByText(testIssues[0].title))
  fireEvent.click(screen.getAllByText("Edit")[0])
  
  // ASSERT naviagation was triggered
  expect(mockNavigate).toHaveBeenCalledWith(`/issues/${testIssues[0].id}`)
})