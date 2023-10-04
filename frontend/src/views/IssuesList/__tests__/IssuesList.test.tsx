import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import IssuesList from "../IssuesList";
import { Issue } from '../../../model';

const testIssues: Issue[] = [
  { id: "1", title: "Issue 1", description: "I am an issue 1", state: "Pending" },
  { id: "2", title: "Issue 2", description: "I am an issue 2", state: "Open" },
  { id: "3", title: "Issue 3", description: "I am an issue 3", state: "Closed" },
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
  await userEvent.click(screen.getByText(testIssues[0].title))
  
  // ASSERT
  expect(screen.getByText(testIssues[0].title)).toBeVisible()
})

test('When user expands an issue, he can choose to edit the issue.', async () => {
  // ARRANGE
  render(<IssuesList issues={testIssues} />)

  // ACT
  await userEvent.click(screen.getByText(testIssues[0].title))
  await userEvent.click(screen.getByRole("Edit"))
  
  // ASSERT
  // Navigation occurs
})