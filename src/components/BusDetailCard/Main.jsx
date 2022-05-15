import { Box, Typography, ButtonBase } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Star from "../../assets/star.svg"
import { useNavigate } from "react-router-dom";
import MaxWidthDialog from "./components/Dialog.jsx";

const CardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  boxShadow: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(3),
  height: "100%",
  cursor: "pointer"
}));

const TotalRateAnnounce = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: "0.9rem"
}));

function Card({ Route }) {
console.log('Route :', Route);
  const [open, setOpen] = useState(false);
  open
  return (
    <>
    <CardBox  onClick={() => {setOpen(true)}}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>{Route.RouteName.Zh_tw}</Typography>
      <Typography>
        {Route.DepartureStopNameZh}-{Route.DestinationStopNameZh}
        </Typography>
    </CardBox>
      <MaxWidthDialog open={open} setOpen={setOpen} bus={Route} />
    </>
  )
}
export default Card;