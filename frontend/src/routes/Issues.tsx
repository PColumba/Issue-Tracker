import { useEffect, useState } from 'react';
import IssuesList from '../views/IssuesList/IssuesList';
import { Issue } from '../model';
import Container from "@mui/material/Container";
import { Typography } from '@mui/material';

const Issues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  
  useEffect(() => {
    fetch("/issues").then(res => res.json()).then(issues => setIssues(issues))
  }, [])


  return (
    <Container maxWidth={"xs"}>
      <Typography>Issue Tracker</Typography>
      <IssuesList issues={issues} />
    </Container>
  );
}

export default Issues;