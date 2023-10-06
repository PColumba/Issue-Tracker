import { Alert, Box, CircularProgress, Container, Select, Typography } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { IssueState, getPossibleStateUpdates } from "../model"
import useAsyncValue, { ActionState } from "../hooks/useAsyncValue"
import { getIssue, updateIssue } from "../service"
import StatusChip from "../components/StatusChip"
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';


const EditIssue: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [issue, setIssue] = useAsyncValue(() => getIssue(id!))
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleStatusUpade = (value: IssueState | undefined) => {
    setOpen(false)
    if(value) {
      setIssue({ type: ActionState.LOADING })
      updateIssue(id!, value)
        .then(issue => setIssue(({ type: ActionState.VALUE, value: issue})))
        .catch(error => setIssue({ type: ActionState.ERROR, error}))
    }
  }

  if(issue.type === ActionState.LOADING) {
    return <Container maxWidth="md">
      <CircularProgress />
    </Container>
  }

  if(issue.type === ActionState.ERROR) {
    return <Container maxWidth="md">
      <Alert severity="error">Ups something went wrong: {typeof issue.error === "string" ? issue.error : ""}</Alert>
    </Container>
  }

  const { title, description, state } = issue.value
  const possibleStateUpdates: IssueState[] = getPossibleStateUpdates(state)

  return <Container maxWidth="md">
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h3">{title}</Typography>
        <div>{possibleStateUpdates.length === 0 ? <StatusChip status={state} /> : <StatusChip status={state} editable onClick={handleClickOpen}/>}</div>
        <Typography>{description}</Typography>
        <UpdateStatusDialog open={open} onClose={(value) => handleStatusUpade(value)} options={possibleStateUpdates}/>
      </Box>
    </Box>

  </Container>

}

const UpdateStatusDialog: React.FC<{open: boolean, onClose: (value: IssueState | undefined) => void, options: IssueState[]}> = ({open, onClose, options}) => {

  const handleChange = (event: SelectChangeEvent) => {
    onClose(event.target.value as IssueState)
  };

  return (
    <Dialog onClose={() => onClose(undefined)} open={open}>
      <DialogTitle>Update Status</DialogTitle>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="status-select-label">Select Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={""}
          label="Select New Status"
          inputProps={{'data-testid': 'status-select'}}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>))
          }
        </Select>
      </FormControl>
    </Dialog>
  );
}

export default EditIssue