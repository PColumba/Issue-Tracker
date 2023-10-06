import IssuesList from '../views/IssuesList/IssuesList';
import Container from "@mui/material/Container";
import { Alert, Button, Dialog, DialogTitle, Fab, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useAsyncValue, { ActionState } from '../hooks/useAsyncValue';
import { createIssue, getIssues } from '../service';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

const fabStyle = {
  position: 'absolute',
  bottom: 60,
  right: 60,
};



const AddNewFAB: React.FC<{onClick: () => void}> = ({onClick}) => {
  return <Fab sx={fabStyle} variant="extended" color="primary" onClick={onClick}>Open issue <AddIcon /></Fab>
}
const Issues: React.FC = () => {
  const [issues, _, refresh] = useAsyncValue(getIssues, [])
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreated = (title: string, description: string) => {
    setOpen(false)
    createIssue(title, description).then(_ => refresh())
  }

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
      <AddNewFAB onClick={() => setOpen(true)}/>
      <OpenIssueDialog onCreated={handleCreated} open={open} onClose={handleClose} />
    </Container>
  );
}

const OpenIssueDialog: React.FC<{onCreated: (title: string, description: string) => void, onClose: () => void, open: boolean }> = ({onCreated, onClose, open}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return <Dialog onClose={onClose} open={open}>
        <DialogTitle align='center'>Open New Issue</DialogTitle>
        <Stack paddingX={2} paddingBottom={2} minWidth={200}>
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              margin="normal"
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setTitle(event.target.value)}}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              placeholder='Descroasdad'
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setDescription(event.target.value)}}
              rows={4}
              maxRows={12}
            />
            <Button color="primary" onClick={() => onCreated(title, description)}>Open</Button>
        </Stack>
      </Dialog>
  
}

export default Issues;