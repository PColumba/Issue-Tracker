import { Issue } from "../../model";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";

const IssuesList: React.FC<{ issues: Issue[] }> = ({ issues }) => {
  return (
    <Box role={"list"}>
      {issues.map(issue => (<IssueView issue={issue} key={issue.id}/>))}
    </Box>
  )
}

const IssueView: React.FC<{ issue: Issue }> = ( { issue }) => {
  const { id, title, description, state } = issue
  const navigate = useNavigate()
  return <Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="issue-content"
    id={id}
  >
    <Typography role={"listitem"}>{title}</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      {description}
    </Typography>
    <Button variant="outlined" onClick={() => navigate(`/issues/${id}`)}>Edit</Button>
  </AccordionDetails>
</Accordion>
}

export default IssuesList;