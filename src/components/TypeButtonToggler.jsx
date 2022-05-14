import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  boxShadow: "inset -3px -3px 4px rgba(252, 252, 252, 0.7), inset 4px 4px 9px rgba(0, 0, 0, 0.1);",
  color: theme.palette.grey[400],
  fontWeight: "bold",
  borderRadius: "30px",
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(1),
    color: theme.palette.grey[400],
    border: 0,
    padding: theme.spacing(0.5, 2),
    '&.Mui-disabled': {
      border: 0,
    },
    "&.Mui-selected": {
      boxShadow: "-10px -11px 16px -9px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main
    },
    '&:not(:first-of-type)': {
      borderRadius: "30px",
    },
    '&:first-of-type': {
      borderRadius: "30px",
    },
  },
}));

function TypeButtonToggler({type, setType}) {
  const handleType = (event, newType) => {
    if (newType)
      setType(newType);
  };

  return (
    <StyledToggleButtonGroup value={type} exclusive onChange={handleType} size="small">
      <ToggleButton value={"name"}>
        課程名稱
      </ToggleButton>
      <ToggleButton value={"teacher"}>
        授課教師
      </ToggleButton>
      <ToggleButton value={"unit"}>
        開課單位
      </ToggleButton>
    </StyledToggleButtonGroup>
  )
}

export default TypeButtonToggler;