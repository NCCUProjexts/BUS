import { Box, Grid, Container, CircularProgress, Typography, Pagination, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import NavBar from "../components/NavBar/Main";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card/Main";
import AuthModal from "../components/AuthDialog/Main";
import ajax from  "../api/index.js"

const SearchBox = styled(Box)(({ theme }) => ({}));
const PaginationBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchParams.get("search"));
  const [buses, setBuses] = useState(searchParams.get("search"));
  const [page, setPage] = useState(searchParams.get("page") ? searchParams.get("page") : 1);
  const loading = useSelector(state => state.course.loading);
  const courses = useSelector(state => coursesPagination(state, page));
  const length = useSelector(state => coursesLength(state));
  const open = useSelector(state => state.auth.dialogOpen);

  useEffect(() => {
    setSearch(searchParams.get("search"));
    setPage(searchParams.get("page") ? searchParams.get("page") : 1);
  }, [searchParams]);
  /*
  data:[
    0:{
        A2EventType: 1
        BusStatus: 0
        Direction: 1
        DutyStatus: 1
        GPSTime: "2022-05-15T05:19:29+08:00"
        OperatorID: "100"
        PlateNumb: "072-U7"
        RouteID: "16111"
        RouteName: {Zh_tw: '307', En: '307'}
        RouteUID: "TPE16111"
        SrcUpdateTime: "2022-05-15T05:20:00+08:00"
        StopID: "15314"
        StopName: {Zh_tw: '行政院', En: 'Executive Yuan'}
        StopSequence: 19
        StopUID: "TPE15314"
        SubRouteID: "157462"
        SubRouteName: {Zh_tw: '307莒光往板橋前站', En: '307'}
        SubRouteUID: "TPE157462"
        UpdateTime: "2022-05-15T05:20:03+08:00"
    }
  ]
  */
  25.04235,121.5650027
  useEffect(()=>{
    const getBus = async () => {
      try{
        const url = "https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/NearBy?%24top=30&%24spatialFilter=nearby(25.04235%2C%20121.5650027%2C%201000)&%24format=JSON"
        const method = "GET";
          const result = await ajax(url, method);
          setBuses(result.data);
      }
      catch(err){
          console.log('err :', err);
      }
    }
    getBus();
  }, [search]); 

  const genCards = courses.map((course, index) => {
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
    <SearchBox>
      <NavBar />
      <Container maxWidth="lg" sx={{ padding: "15px" }}>
        {
          genCards.length == 0 && !loading ?
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>查無資料</Typography>
            </Box>
            :
            <Grid container spacing={3} sx={{ paddingBottom: "70px" }}>
              {genCards}
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
    </SearchBox>

  )
}

export default Search;