import MuiStep, {StepProps} from '@mui/material/Step';
import {styled} from '@mui/material/styles';

export const Step = styled(MuiStep)<StepProps>(({theme}) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0,
  },
  '&:last-of-type': {
    paddingRight: 0,
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none',
  },
  '& .step-subtitle': {
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
  '& + svg': {
    color: theme.palette.text.disabled,
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled,
  },
  '&.Mui-completed + svg': {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBottom: theme.spacing(6),
    },
  },
}));