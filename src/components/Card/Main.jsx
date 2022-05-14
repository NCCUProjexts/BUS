import { Box, Typography, ButtonBase } from "@mui/material";
import { styled } from '@mui/material/styles';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Star from "../../assets/star.svg"
import { useNavigate } from "react-router-dom";

const CardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  boxShadow: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(3),
  height: "100%",
  cursor: "pointer"
}));

const TotalRateAnnounce = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: "0.9rem"
}));

function Card({ name, teacher, unit, rate, customRatePopulationm, totalRatePopulation, course }) {
  const navigate = useNavigate();

  const navigateToCourse = (id) => {
    navigate("/detail/" + id)
  }

  return (
    <CardBox onClick={() => navigateToCourse(course)}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>{name}</Typography>
        <Typography>{teacher} / {unit}</Typography>
      </Box>
      <br />
      <Box>
        <TotalRateAnnounce>總評價</TotalRateAnnounce>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={Star} style={{ height: "1rem" }} />
            <span>&nbsp;{rate} ({customRatePopulationm}人)</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ChatOutlinedIcon />
            <span>&nbsp;{totalRatePopulation}</span>
          </Box>
        </Box>
      </Box>
    </CardBox>
  )
}

export default Card;