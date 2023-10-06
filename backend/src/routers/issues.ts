import { Request, Response, Router} from "express";
import { IssueCreateRequest, IssueStatus } from "src/model";
import { IssueNotFound, UpdateNotPossible, createIssue, getIssue, getIssues, updateIssue } from "src/service";

const router = Router()

router.get("/issues", async (req: Request, res: Response) => {
  let issues
  try {
    issues = await getIssues()
  } catch(e: unknown) {
    console.log(e)
    return res.sendStatus(500)
  }
  
  res.json(issues)
})

router.get("/issues/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  let issue
  try {
    issue = await getIssue(id)
  } catch(e: unknown) {
    return e instanceof IssueNotFound ? res.status(404).json({ message: e.message }) : res.sendStatus(500)
  }
  
  res.json(issue)
})

router.post("/issues", async (req: Request, res: Response) => {
  const issueReq: IssueCreateRequest= req.body
  let udpateResult
  
  try {
    udpateResult = await createIssue({ ...issueReq, status: IssueStatus.OPEN})
  } catch(e: unknown) {
    return res.sendStatus(500)
  }
  
  res.json(udpateResult)
})

router.patch("/issues/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { status }: { status: IssueStatus }= req.body
  
  let result
  try {
    result = await updateIssue(id, status)
  } catch(e: unknown) {
    if(e instanceof IssueNotFound) {
      return res.status(404).json({ message: e.message })
    } else if(e instanceof UpdateNotPossible) {
      return res.status(400).json({ message: e.message })
    } else {
      res.sendStatus(500)
    }
  }
  
  res.json(result)
})

export default router