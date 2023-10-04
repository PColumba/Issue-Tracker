import express from "express";
import issuesRouter from "src/routers/issues";

const app = express()
const port = 3001

app.use(express.json())
app.use(issuesRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})