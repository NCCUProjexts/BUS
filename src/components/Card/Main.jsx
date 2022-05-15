import { Box, Typography, ButtonBase } from "@mui/material";
import { styled } from '@mui/material/styles';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import People from "../../assets/people.svg"
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const rate = () => {
    const tmp = Math.floor(Math.random() * 3) + 1;
    switch (tmp) {
      case 1:
        return { backgroundColor: 'primary.main', color: 'primary.contrastText' };
      case 3:
        return { backgroundColor: 'error.main', color: 'error.contrastText' };
      case 2:
      default:
        return {}
    }
  }

  //const navigateToCourse = (id) => {
  //  navigate("/detail/" + id)
  //}

  return (
    <CardBox>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>{Route.RouteName.Zh_tw}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
        <Typography sx={{ ...rate(), borderRadius: 1, p: 0.5, minWidth: "70px", textAlign: "center" }}>
          {
            Route.EstimateTime == -1 ? "無資料" :
              Route.EstimateTime <= 60 ? "即將進站" :
                Math.floor(Route.EstimateTime / 60) + "分"
          }
        </Typography>
      </Box>

    </CardBox>
  )
}

export default Card;