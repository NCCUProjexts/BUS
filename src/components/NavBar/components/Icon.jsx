import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const IconBox = styled(Box)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  maxWidth: "50px",
  maxHeight: "50px",
  aspectRatio: "1 / 1",
  boxShadow: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25);",
  backgroundColor: theme.palette.background,
  cursor: "pointer"
}));

const BusIcon = styled(DirectionsBusIcon)(({ theme }) => ({
  height: "100%",
  width: "100%",
  color: theme.palette.grey["400"]
}));


function Icon() {
  const navigate = useNavigate();

  return (
    <IconBox onClick={() => navigate("/")}>
      <BusIcon />
    </IconBox>
  )
}

export default Icon;