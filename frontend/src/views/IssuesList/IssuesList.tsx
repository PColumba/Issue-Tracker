import { Issue, IssueStatus } from "../../model";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import StatusChip from "../../components/StatusChip";

const IssuesList: React.FC<{ issues: Issue[] }> = ({ issues }) => {
  return (
    <Box role={"list"}>
      {issues.map(issue => (<IssueView issue={issue} key={issue.id}/>))}
    </Box>
  )
}

const IssueView: React.FC<{ issue: Issue }> = ( { issue }) => {
  const { id, title, description, status: state } = issue
  const navigate = useNavigate()
  return <Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="issue-content"
    id={id}
  >
    <Title state={state} title={title} />
  </AccordionSummary>
  <AccordionDetails>
    <Typography variant={"body1"}>
      {description}
    </Typography>
    <Button variant="outlined" onClick={() => navigate(`/issues/${id}`)}>Edit</Button>
  </AccordionDetails>
</Accordion>
}

const Title: React.FC<{title: string, state: IssueStatus}> = ({title, state}) => {
  return <Box display={"flex"} flexDirection={"row"} alignItems={"center"} alignContent={"center"} gap={1}>
    <StatusChip status={state} editable={false}/>
    <Typography variant="h5" role={"listitem"}>{title}</Typography>
  </Box>
}

export default IssuesList;