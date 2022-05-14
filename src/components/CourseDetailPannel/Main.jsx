import { Card, CardHeader, CardContent, CardActions, Grid, Typography, Rating, Button, Box, CircularProgress } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import { borderRadius } from '@mui/system';
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../store/selectors/auth"
import { useRef, useEffect } from "react"
import CourseTypeTag from "./components/CourseTypeTag";
import CourseRatingDialog from './components/CourseRatingDialog';
import RadarChart from './components/RadarChart';

const CourseDetailPannelBox = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  boxShadow: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  borderBottom: "3px solid " + theme.palette.grey[400]
}));

const SubTitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: "0.8rem"
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px !important",
  border: "2px solid " + theme.palette.grey[400] + " !important",
  color: theme.palette.primary.main,
  padding: theme.spacing(0.5, 2),
  margin: theme.spacing(0.5),
  "&:hover": {
    border: "2px solid " + theme.palette.primary.main + " !important",
    backgroundColor: theme.palette.primary.main + '!important',
    color: theme.palette.primary.contrastText + '!important',
  },
}));


function CourseDetailPannel({ setLeftPannelHeight }) {
  const elementRef = useRef(null);
  const courseDetail = useSelector(state => state.courseDetail.detail);
  const loading = useSelector(state => state.courseDetail.loading);
  const loggedIn = useSelector(state => isLoggedIn(state));

  const resize = () => {
    setLeftPannelHeight(elementRef.current.clientHeight);
  }

  useEffect(() => {
    setLeftPannelHeight(elementRef.current.clientHeight);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  const handleClick = () => {
    const semester_code = courseDetail.semester;
    const course_code = courseDetail.code;
    const year = semester_code.slice(0, 3);
    const semester = semester_code.slice(3, 4);
    const sixcode = course_code.slice(0, 6);
    const twocode = course_code.slice(6, 8);
    const onecode = course_code.slice(8, 9);

    window.open(
      `https://newdoc.nccu.edu.tw/teaschm/${semester_code}/schmPrv.jsp-yy=${year}&smt=${semester}&num=${sixcode}&gop=${twocode}&s=${onecode}.html`
    );
  }

  return (
    <CourseDetailPannelBox ref={elementRef}>
      {
        loading ?
          ""
          :
          <Box>
            <CardHeader
              title={courseDetail.courseNameZH_TW}
              subheader={courseDetail.instructorZH_TW}
              action={<CourseTypeTag courseType={courseDetail.typeOfCredit} />}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TitleTypography variant="h6">課程詳細資料</TitleTypography>
                  <Grid container sx={{ padding: "10px" }} spacing={1}>
                    <Grid item xs={12}>
                      <SubTitleTypography>總評價</SubTitleTypography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                        <Box sx={{ display: "flex" }}>
                          <Rating value={Number(courseDetail.avg_rate?.toFixed(1))} precision={0.1} readOnly />
                          <Typography sx={{paddingLeft: "10px"}}>
                            {courseDetail.avg_rate == -1 ? "無" : courseDetail.avg_rate?.toFixed(1) + " (" + courseDetail.num_of_feedback + "人)"}
                          </Typography>
                        </Box>
                        {loggedIn ? <CourseRatingDialog /> : <Box />}
                      </Box>

                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SubTitleTypography>開課單位</SubTitleTypography>
                      <Typography>{courseDetail.departmentZH_TW}</Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <SubTitleTypography>時間</SubTitleTypography>
                      <Typography>{courseDetail.sessionZH_TW}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SubTitleTypography>地點</SubTitleTypography>
                      <Typography>{courseDetail.classroom}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SubTitleTypography>學分數</SubTitleTypography>
                      <Typography>{courseDetail.point?.toFixed(1)}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SubTitleTypography>異動資訊</SubTitleTypography>
                      <Typography>{courseDetail?.information.split("＠異動資訊Information of alteration:")[1] == "N/A" ?  "無" : courseDetail?.information.split("＠異動資訊Information of alteration:")[1]}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SubTitleTypography>備註</SubTitleTypography>
                      <Typography>{courseDetail?.note.split("＠備註Note:")[1] == "N/A" ? "無" : courseDetail?.note.split("＠備註Note:")[1]}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RadarChart boringness={courseDetail.avg_loading} sweet={courseDetail.avg_sweet} harvest={courseDetail.avg_gain} />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}>
              <ActionButton onClick={()=>handleClick()} endIcon={<OpenInNewIcon />}>課程大綱</ActionButton>
              {/*<ActionButton endIcon={<OpenInNewIcon />}>選課設定</ActionButton>*/}
              <ActionButton endIcon={<ContentCopyIcon />}>複製課程代碼</ActionButton>
              <ActionButton disabled>加入GDSC選課系統/備選清單</ActionButton>
            </CardActions>
          </Box>
      }

    </CourseDetailPannelBox >

  );
}

export default CourseDetailPannel;