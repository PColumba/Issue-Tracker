import { Request, Response, Router} from "express";

const router = Router()

router.get("/issues", (req: Request, res: Response) => {
  res.json([
    { id: "1", title: "Hello", description: "I am an issue", state: "Pending" }
  ])
})

export default router