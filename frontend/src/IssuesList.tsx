import { Issue } from "./model";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IssuesList: React.FC<{ issues: Issue[] }> = ({ issues }) => {
  return (
    <Box>
      {issues.map(issue => (<IssueView issue={issue} />))}
    </Box>
  )
}

const IssueView: React.FC<{ issue: Issue }> = ( { issue }) => {
  const { id, title, description, state } = issue
  return <Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="issue-content"
    id={id}
  >
    <Typography>{title}</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      {description}
    </Typography>
  </AccordionDetails>
</Accordion>
}

export default IssuesList;