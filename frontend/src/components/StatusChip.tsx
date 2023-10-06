import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import { IssueState } from '../model';
import { colors } from '@mui/material';

const colorStyleMap = {
  [IssueState.PENDING]: {backgroundColor: colors.amber[300], color: "whitesmoke"},
  [IssueState.CLOSED]: {backgroundColor: colors.green[300], color: "whitesmoke"},
  [IssueState.OPEN]: {backgroundColor: colors.blue[300], color: "whitesmoke"},
}

const StatusChip: React.FC<{ editable?: boolean, status: IssueState, onClick?: () => void}> = ({editable, status, onClick}) => {
  return editable ? <Chip
      data-testid="issue-status-chip"
      onClick={onClick}
      icon={<EditIcon fontSize="medium" color="primary" sx={{ color: "whitesmoke"}}/>} 
      label={status} 
      sx={colorStyleMap[status]}
    /> : 
    <Chip
      data-testid="issue-status-chip"
      label={status} 
      sx={colorStyleMap[status]}
    />
}

export default StatusChip;