import { useEffect, useState } from 'react';
import IssuesList from './IssuesList';
import { Issue } from './model';
import Container from "@mui/material/Container";
import { Typography } from '@mui/material';

function App() {
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

export default App;