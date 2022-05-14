import { Container, Grid, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../store/actions/courseDetail";
import { getRate } from "../store/actions/courseRate";
import { isLoggedIn } from "../store/selectors/auth"
import NavBar from "../components/NavBar/Main";
import CourseDetailPannel from "../components/CourseDetailPannel/Main";
import CourseRatePannel from "../components/CourseRatePannel/Main";
import AuthModal from "../components/AuthDialog/Main";

const DetailBox = styled("div")(({ theme }) => ({}));

function Detail() {
  const params = useParams();
  const dispatch = useDispatch();
  const courseId = params.courseId;
  const [loading, setLoading] = useState(true);
  const [leftPannelHeight, setLeftPannelHeight] = useState(0);
  const isLoggedin = useSelector(state => isLoggedIn(state));
  const open = useSelector(state => state.auth.dialogOpen);

  useEffect(() => {
    dispatch(getDetail(courseId)).catch(err => {
      console.log(err);
    }).then(() => {
      setLoading(false);
    });
  }, [params]);

  useEffect(() => {
    if(isLoggedin) {
      dispatch(getRate(courseId)).catch(err => {
        console.log(err);
      })
    }
  }, [isLoggedin]);

  return (
    <DetailBox>
      <NavBar />
      <Container maxWidth="xl" sx={{ padding: "15px" }}>
        {
          loading ?
            <Box sx={{ position: "absolute", top: "50%", left: 0, display: "flex", justifyContent: "center", width: "100%" }}>
              <CircularProgress />
            </Box>
            :
            <Grid container spacing={5}>
              <Grid item xs={12} md={8}>
                <CourseDetailPannel setLeftPannelHeight={setLeftPannelHeight} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CourseRatePannel leftPannelHeight={leftPannelHeight} />
              </Grid>
            </Grid>
        }
      </Container>
      <AuthModal open={open} handleClose={() => dispatch({type: "auth.dialog.close"})} />
    </DetailBox>
  );
}

export default Detail;