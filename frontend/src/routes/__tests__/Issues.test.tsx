import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Issues from '../Issues';
import * as service from "../../service";
import { IssueState } from '../../model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import rrd from "react-router-dom"; 

const mockService = service
jest.mock("../../service")
jest.mock("react-router-dom")

beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.clearAllMocks()
})

// ToDo: add proper typings and remove ts-ignore annotations
test('When waiting for service request, loading is displayed, after that data is loaded', async () => {

  // ARRANGE
  //@ts-ignore
  mockService.getIssues.mockResolvedValue([{ id: "1", title: "Issue 1", description: "I am an issue 1", state: IssueState.PENDING }])
  render(<Issues />)

  // ASSERT Loding visible
  expect(screen.getByRole('progressbar')).toBeVisible()

  // ASSERT after awaiting data will be visible
  expect(await screen.findByRole("list")).toBeVisible()
})

test('When error ocurres, error message is displayed', async () => {

  // ARRANGE
  //@ts-ignore
  mockService.getIssues.mockRejectedValue(Error("Network Error"))
  render(<Issues />)

  // ASSERT after awaiting error should be displayed
  const errorAlert = await screen.findByRole("alert")
  expect(errorAlert).toBeVisible()
  expect(errorAlert).toHaveTextContent(/.*Ups something went wrong.*/)
})
