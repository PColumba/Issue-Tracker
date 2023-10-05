import { useEffect, useState } from 'react';
import IssuesList from '../views/IssuesList/IssuesList';
import { Issue } from '../model';
import Container from "@mui/material/Container";
import { Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const fabStyle = {
  position: 'absolute',
  bottom: 60,
  right: 60,
};



const AddNewFAB = () => {
  return <Fab sx={fabStyle} variant="extended" color="primary">Add new issue <AddIcon /></Fab>
}
const Issues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  
  useEffect(() => {
    fetch("/issues").then(res => res.json()).then(issues => setIssues(issues))
  }, [])


  return (
    <Container maxWidth={"md"}>
      <Typography variant="h3">Issue Tracker</Typography>
      <IssuesList issues={issues} />
      <AddNewFAB />
    </Container>
  );
}

export default Issues;