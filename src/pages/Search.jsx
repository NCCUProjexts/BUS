import { Box, Grid, Container, CircularProgress, Typography, Pagination, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import NavBar from "../components/NavBar/Main";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { coursesPagination, coursesLength } from "../store/selectors/course";
import { getCourse } from "../store/actions/course";
import Card from "../components/Card/Main";
import AuthModal from "../components/AuthDialog/Main";

const SearchBox = styled(Box)(({ theme }) => ({}));
const PaginationBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchParams.get("search"));
  const [page, setPage] = useState(searchParams.get("page") ? searchParams.get("page") : 1);
  const loading = useSelector(state => state.course.loading);
  const courses = useSelector(state => coursesPagination(state, page));
  const length = useSelector(state => coursesLength(state));
  const open = useSelector(state => state.auth.dialogOpen);

  useEffect(() => {
    setSearch(searchParams.get("search"));
    setPage(searchParams.get("page") ? searchParams.get("page") : 1);
  }, [searchParams]);

  useEffect(() => {
    dispatch(getCourse(search));
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