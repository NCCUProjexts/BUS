import { Box, Typography, IconButton, Grid, Container, Paper, Pagination, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../components/NavBar/Main";
import Card from "../components/Card/Main";
import TypeButtonToggler from "../components/TypeButtonToggler";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthModal from "../components/AuthDialog/Main";
import ajax from "../api/index.js"

const HomeBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column"
}));

const SearchBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  left: "10%",
  width: "80%"
}));

const SearchBarBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(0) + " " + theme.spacing(1),
  height: "70%",
  borderRadius: "50px",
  boxShadow: "inset 2px 2px 8px rgba(0, 0, 0, 0.25)",
  display: "flex",
  alignItems: "center"
}));

const SearchBarInput = styled("input")(({ theme }) => ({
  height: "100%",
  width: "calc(100% - 20px)",
  margin: "0px 20px",
  fontSize: "1.2rem",
  border: "none",
  backgroundColor: "transparent",
  outlineWidth: 0,
  fontWeight: "bold",
  fontFamily: "Noto Sans TC"
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0) + " " + theme.spacing(1),
  boxShadow: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
  backgroundColor: theme.palette.background.default
}));

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const loading = useSelector(state => state.bus.loading);
  const nearestStop = useSelector(state => state.bus.nearestStop);
  const open = useSelector(state => state.auth.dialogOpen);

  const SearchBox = styled(Box)(({ theme }) => ({}));
  const PaginationBox = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/search',
      search: '?search=' + search,
    });
  }

  const busCards = nearestStop.Stops ? nearestStop.Stops.map((bus, index) => {
    return (
      <Grid item xs={12} sm={6} key={index}>
        <Card Route={bus} />
      </Grid>
    )
  }) : "";

  return (
    <HomeBox>
      <NavBar />
      <Container maxWidth="lg" sx={{ padding: "15px" }}>
        <Typography variant="h5" sx={{ padding: "0px 15px" }}>{nearestStop?.StationName?.Zh_tw}</Typography>
        <br />
        {
          busCards.length == 0 && !loading ?
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>查無資料</Typography>
            </Box>
            :
            <Grid container spacing={3} sx={{ paddingBottom: "70px" }}>
              {busCards}
            </Grid>
        }
        {
          loading ?
            <Box sx={{ position: "absolute", top: "50%", left: 0, display: "flex", justifyContent: "center", width: "100%" }}>
              <CircularProgress />
            </Box>
            :
            ""
        }
      </Container>
      <AuthModal open={open} handleClose={() => dispatch({ type: "auth.dialog.close" })} />
    </HomeBox>
  )

}

export default Home;