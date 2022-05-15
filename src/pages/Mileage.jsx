import { Box, Typography, IconButton, Grid, Container, Paper, Button, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NavBar from "../components/NavBar/Main";
import Card from "../components/Card/Main";
import TypeButtonToggler from "../components/TypeButtonToggler";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthModal from "../components/AuthDialog/Main";
import ajax from "../api/index.js"

const MileageBox = styled(Box)(({ theme }) => ({}));

const PrimaryCardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.spacing(2),
  boxShadow: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  padding: theme.spacing(3),
  height: "100%"
}));

const CardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  boxShadow: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  padding: theme.spacing(3),
  height: "100%",
}));

function Mileage() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.auth.dialogOpen);

  return (
    <MileageBox>
      <NavBar />
      <Container maxWidth="lg" sx={{ padding: "15px" }}>
        <Grid container spacing={3} sx={{ paddingBottom: "70px" }}>
          <Grid item xs={12}>
            <PrimaryCardBox>
              <Typography variant="h4"><DirectionsWalkIcon fontSize="large" />里程累積</Typography>
              <Typography variant="h6">3.5km</Typography>
            </PrimaryCardBox>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{padding: "0px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
              <Typography>你和</Typography>
              <Typography variant="h3" color="primary" sx={{alignSelf: "stretch"}}>30%</Typography>
              <Typography>的人成功保持了距離</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <AuthModal open={open} handleClose={() => dispatch({ type: "auth.dialog.close" })} />
    </MileageBox>
  )

}

export default Mileage;