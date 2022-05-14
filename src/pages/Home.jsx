import { Box, Typography, IconButton, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../components/NavBar/Main";
import TypeButtonToggler from "../components/TypeButtonToggler";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthModal from "../components/AuthDialog/Main";

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
  const open = useSelector(state => state.auth.dialogOpen);

  useEffect(()=>{
    const getBus = async () => {
      try{
        const url = "https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/NearBy?%24top=30&%24spatialFilter=nearby(25.047675%2C%20121.517055%2C%201000)&%24format=JSON"
        const method = "GET";
          const result = await ajax(url, method);
          setBuses(result.data);
      }
      catch(err){
          console.log('err :', err);
      }
    }
    getBus();
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/search',
      search: '?search=' + search,
    });
  }

  const busCards = courses.map((course, index) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          course={course.code}
          name={course.courseNameZH_TW}
          teacher={course.instructorZH_TW}
          unit={course.departmentZH_TW}
          rate={course.avg_rate == -1 ? "無" : course.avg_rate.toFixed(1)}
          customRatePopulationm={course.num_of_custom_feedback}
          totalRatePopulation={course.num_of_feedback + course.num_of_custom_feedback}
        />
      </Grid>
    )
  })

  return (
    <HomeBox>
      <NavBar />
      {/* <Box sx={{ flexGrow: 1 }}>
        <SearchBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md>
              <Typography sx={{ fontWeight: "bold", fontSize: "2.5rem" }} color="primary">政大課程評價網</Typography>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", height: "80px" }}>
            <SearchBarBox>
              <SearchBarInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="輸入課名、老師或系所" />
            </SearchBarBox>
            <StyledIconButton color="primary" size="large" type="submit">
              <SearchIcon fontSize="large" />
            </StyledIconButton>
          </form>
        </SearchBox>
      </Box> */}
      <Container maxWidth="lg" sx={{ padding: "15px" }}>
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
        {
          genCards.length != 0 ?
            <PaginationBox sx={{ position: "fixed", bottom: 0, right: 0, left: 0, padding: "15px 0px", display: "flex", justifyContent: "center" }} elevation={0}>
              <Pagination
                page={Number(page)}
                count={length}
                onChange={(e, p) => navigate({
                  pathname: '/search',
                  search: '?search=' + search + '&page=' + p,
                })}
              />
            </PaginationBox>
            :
            ""
        }
      </Container>
      <AuthModal open={open} handleClose={() => dispatch({type: "auth.dialog.close"})} />
    </HomeBox>
  )

}

export default Home;