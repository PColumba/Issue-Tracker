import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import { IssueStatus } from '../model';
import { colors } from '@mui/material';

const colorStyleMap = {
  [IssueStatus.PENDING]: {backgroundColor: colors.amber[300], color: "whitesmoke"},
  [IssueStatus.CLOSED]: {backgroundColor: colors.green[300], color: "whitesmoke"},
  [IssueStatus.OPEN]: {backgroundColor: colors.blue[300], color: "whitesmoke"},
}

const StatusChip: React.FC<{ editable?: boolean, status: IssueStatus, onClick?: () => void}> = ({editable, status, onClick}) => {
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