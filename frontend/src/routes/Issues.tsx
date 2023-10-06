import IssuesList from '../views/IssuesList/IssuesList';
import Container from "@mui/material/Container";
import { Alert, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useAsyncValue, { ActionState } from '../hooks/useAsyncValue';
import { getIssues } from '../service';
import CircularProgress from '@mui/material/CircularProgress';

const fabStyle = {
  position: 'absolute',
  bottom: 60,
  right: 60,
};



const AddNewFAB = () => {
  return <Fab sx={fabStyle} variant="extended" color="primary">Add new issue <AddIcon /></Fab>
}
const Issues: React.FC = () => {
  const [issues, _] = useAsyncValue(getIssues, [])

  if(issues.type === ActionState.LOADING) {
    return <Container maxWidth={"md"}>
      <CircularProgress />
    </Container>
  }

  if(issues.type === ActionState.ERROR) {
    return <Container maxWidth={"md"}>
      <Alert severity="error">Ups something went wrong: {typeof issues.error === "string" ? issues.error : ""}</Alert>
    </Container>
  }

  return (
    <Container maxWidth={"md"}>
      <Typography variant="h3">Issue Tracker</Typography>
      <IssuesList issues={issues.value} />
      <AddNewFAB />
    </Container>
  );
}

export default Issues;