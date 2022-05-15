import { Box, Grid, Container, CircularProgress, Typography, Pagination, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import NavBar from "../components/NavSearchBar/Main";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/BusDetailCard/Main";
import AuthModal from "../components/AuthDialog/Main";
import ajax from  "../api/index.js"
import { busRoutes } from "../data/busRoutes.js";
import MaxWidthDialog from "../components/BusDetail/Dialog.jsx";
const SearchBox = styled(Box)(({ theme }) => ({}));

const PaginationBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));


const SearchBarBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  margin: "0px 30px",
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
  border: "none",
  backgroundColor: "transparent",
  outlineWidth: 0,
  fontWeight: "bold",
  fontFamily: "Noto Sans TC"
}));

function SearchBar({search, setSearch}) {
  return (
      <SearchBarBox>
          <SearchBarInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="公車號碼" />
      </SearchBarBox>
  )
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search"));
  const [buses, setBuses] = useState([]);
  const [page, setPage] = useState(searchParams.get("page") ? searchParams.get("page") : 1);
  // const loading = useSelector(state => state.course.loading);
  // const courses = useSelector(state => coursesPagination(state, page));
  // const length = useSelector(state => coursesLength(state));
  // const open = useSelector(state => state.auth.dialogOpen);

  useEffect(() => {
    setSearch(searchParams.get("search"));
    setPage(searchParams.get("page") ? searchParams.get("page") : 1);
  }, [searchParams]);

  useEffect(()=>{
    const getBus = async () => {
      try{
        const filteredBusRoutes = getFilteredBusRoutes(search);
        console.log('filteredBusRoutes :', filteredBusRoutes);
        setBuses(filteredBusRoutes);
      }
      catch(err){
          console.log('err :', err);
      }
    }
    getBus();
  }, [search]); 

  const busCards = buses? buses.map((bus, index) => {
    return (
      <Grid item xs={12} sm={6} key={index}>
        <Card Route={bus} />
      </Grid>
    )
  }) : "";

  return (
    <SearchBox>
      <NavBar search={search} setSearch={setSearch} />
      <Container maxWidth="lg" sx={{ padding: "15px" }}>
      {
          buses.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>查無資料</Typography>
            </Box>
            :
            <Grid container spacing={3} sx={{ paddingBottom: "70px" }}>
              {busCards}
            </Grid>
        }
      </Container>
    </SearchBox>
  )
}

function getFilteredBusRoutes(search) {
    return busRoutes.filter(route => {
      return route.RouteName.Zh_tw.includes(search);
  });
}

export default Search;