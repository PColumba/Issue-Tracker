import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as service from "../../service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import rrd from "react-router-dom"; 
import { IssueState } from '../../model';
import EditIssue from '../EditIssue';

const mockService = service
const testIssue = { id: "1", title: "Issue 1", description: "I am an issue 1", state: IssueState.PENDING }
const mockId = testIssue.id

// We need to mock it since router hooks can only be used when in router context
jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: mockId})
}))
jest.mock("../../service")

test('When waiting for service request, loading is displayed, after that issue details are displayed', async () => {

  //ARRANGE
 
  //@ts-ignore
  mockService.getIssue.mockResolvedValue(testIssue)
  render(<EditIssue />)
  
  // ASSERT Loding visible
  expect(screen.getByRole('progressbar')).toBeVisible()

  // ASSERT after awaiting data will be visible
  expect(await screen.findByText(testIssue.title)).toBeVisible()
  expect(await screen.findByText(testIssue.state)).toBeVisible()
  expect(await screen.findByText(testIssue.description)).toBeVisible()

})

test('When error ocurres, error message is displayed', async () => {
  // ARRANGE
  //@ts-ignore
  mockService.getIssue.mockRejectedValue(Error("Network Error"))
  render(<EditIssue />)

  // ASSERT after awaiting error should be displayed
  const errorAlert = await screen.findByRole("alert")
  expect(errorAlert).toBeVisible()
  expect(errorAlert).toHaveTextContent(/.*Ups something went wrong.*/)
})


test('When the status is open user can change it to pending or closed', async () => {
  // ARRANGE
  const testIssueOpen = { ...testIssue, state: IssueState.OPEN}
  const testIssueClosed = { ...testIssue, state: IssueState.PENDING}

  //@ts-ignore
  mockService.getIssue.mockResolvedValue(testIssueOpen)
  //@ts-ignore
  mockService.updateIssue.mockImplementation(async (status) => testIssueClosed)
  render(<EditIssue />)
 
  // ACT wait for edit button
  const editButton = await screen.findByRole("button")
  fireEvent.click(editButton)
  const statusSelect = await screen.findByTestId("status-select")
  fireEvent.change(statusSelect, { target: { value: IssueState.PENDING}})
  
  const editButtonAfterChange = await screen.findByRole("button")
  expect(editButtonAfterChange).toHaveTextContent(IssueState.PENDING)

})

test('When the status is pedning user can change it to closed', async () => {
  // ARRANGE
  const testIssuePending = { ...testIssue, state: IssueState.PENDING}
  const testIssueClosed = { ...testIssue, state: IssueState.CLOSED}

  //@ts-ignore
  mockService.getIssue.mockResolvedValue(testIssuePending)
  //@ts-ignore
  mockService.updateIssue.mockImplementation(async (status) => testIssueClosed)
  render(<EditIssue />)
 
  // ACT wait for edit button
  const editButton = await screen.findByRole("button")
  fireEvent.click(editButton)
  const statusSelect = await screen.findByTestId("status-select")
  fireEvent.change(statusSelect, { target: { value: IssueState.CLOSED}})
  
  const editButtonAfterChange = await screen.findByTestId("issue-status-chip")
  expect(editButtonAfterChange).toHaveTextContent(IssueState.CLOSED)
})

test('When the status is closed user should not be able to change it', async () => {
  // ARRANGE
  const testIssueClosed = { ...testIssue, state: IssueState.CLOSED}

  //@ts-ignore
  mockService.getIssue.mockResolvedValue(testIssueClosed)
  render(<EditIssue />)
 
  // ACT wait for edit button
  const editButton = await screen.findByTestId("issue-status-chip")
  fireEvent.click(editButton)
  
  // ToDo: This does not look good, ideally we should check that element is null, but there is no await equivalents for querBy* methods :shruggs:
  // ASSERT select controls not present in DOM
  await expect(screen.findByLabelText("Status")).rejects.not.toBeNull()
})



