import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"

const EditIssue: React.FC = () => {
  const { id } = useParams()

  return <Typography>{id}</Typography>

}

export default EditIssue