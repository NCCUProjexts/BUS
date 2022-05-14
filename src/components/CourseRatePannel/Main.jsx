import { Card, CardHeader, CardContent, CardActions, Grid, Typography, Box, IconButton, CircularProgress, Button, Menu, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FaceIcon from '@mui/icons-material/Face';
import SortIcon from '@mui/icons-material/Sort';
import { styled } from '@mui/material/styles';
import { borderRadius } from '@mui/system';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRate, createFeedback, thumbUp } from "../../store/actions/courseRate"
import { isLoggedIn } from "../../store/selectors/auth"
import CourseRateMessageCard from './components/CourseRateMessageCard';
import GoogleLoginContainer from './components/GoogleLoginContainer';

const CourseRatePannelBox = styled(Card)(({ theme }) => ({
  height: "100%",
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
}));

const CourseRateCardHeaderBox = styled(Box)(({ theme }) => ({
  borderBottom: "3px solid " + theme.palette.grey[400],
  paddingBottom: theme.spacing(0.5),
  paddingLeft: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

const SearchBarBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  margin: "0px 10px",
  height: "100%",
  borderRadius: "50px",
  border: "2px solid " + theme.palette.grey[400],
  display: "flex",
  alignItems: "center"
}));

const SearchBarInput = styled("input")(({ theme }) => ({
  height: "100%",
  width: "95%",
  margin: "0px 2.5%",
  border: "none",
  backgroundColor: "transparent",
  outlineWidth: 0,
  fontFamily: "Noto Sans TC"
}));

function CourseRatePannel({ leftPannelHeight }) {
  const dispatch = useDispatch();
  const params = useParams();
  const courseRate = useSelector(state => state.courseRate.rate);
  const loading = useSelector(state => state.courseRate.loading);
  const courseId = params.courseId;
  const [comment, setComment] = useState("");
  const [sortType, setSortType] = useState("依讚數排序");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isLoggedin = useSelector(state => isLoggedIn(state));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (text, e) => {
    if (text) setSortType(text);
    setAnchorEl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComment("")
    dispatch(createFeedback(courseId, comment)).catch(err => {
      console.log(err);
    })
  }

  const handleThumbUp = (source, id) => {
    dispatch(thumbUp(courseId, source, id)).catch(err => {
      console.log(err);
    })
  }

  const officialFeedbacks = courseRate.official_feedback ? courseRate.official_feedback.filter(comment => comment.comment.replace(/\s/g, '').length).map(comment => {
    return {
      ...comment,
      source: "官方評價"
    }
  }) : [];

  const feedbacks = courseRate.feedback ? courseRate.feedback.filter(comment => comment.comment.replace(/\s/g, '').length).map(comment => {
    return {
      ...comment,
      source: "評價網"
    }
  }) : [];

  const allFeedback = feedbacks.concat(officialFeedbacks);

  const genCommentCards = allFeedback.sort((a, b) => {
    switch (sortType) {
      case "依讚數排序":
        return b.num_of_thumbsup - a.num_of_thumbsup;
      case "依時間排序":
        return b.create_time - a.create_time;
      case "依學年排序":
        return b.semester - a.semester;
    }
  }).map((comment, index) => {
    return (
      <CourseRateMessageCard
        key={comment.course_feedback_id}
        id={comment.course_feedback_id}
        semester={comment.semester}
        source={comment.source}
        content={comment.comment}
        thumb={comment.num_of_thumbsup}
        isThumbUp={comment.is_rated}
        onThumbUp={handleThumbUp}
      />)
  });

  return (
    <Box sx={{ height: leftPannelHeight }}>
      <CourseRatePannelBox>
        <CardHeader
          title={
            <CourseRateCardHeaderBox>
              <TitleTypography variant="h6">課程評價</TitleTypography>
              <Box>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  startIcon={<SortIcon />}
                >
                  {sortType}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={(event) => handleClose("", event)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={(event) => handleClose("依讚數排序", event)}>依讚數排序</MenuItem>
                  <MenuItem onClick={(event) => handleClose("依時間排序", event)}>依時間排序</MenuItem>
                  <MenuItem onClick={(event) => handleClose("依學年排序", event)}>依學年排序</MenuItem>
                </Menu>
              </Box>
            </CourseRateCardHeaderBox>
          }
          sx={{ paddingBottom: 0 }}
        />
        <CardContent sx={{ overflowY: "auto", height: "100%", lexGrow: 1, position: 'relative', paddingTop: 0, paddingBottom: 0 }}>
          {
            !isLoggedin ? (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}><GoogleLoginContainer renderComponent={<>登入以查看政大官方評價</>}/></Box>) :
              loading ? (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}><CircularProgress /></Box>) :
                !genCommentCards.length ? (<Box sx={{ position: "absolute", top: "40%", left: "35%" }}><span>建立第一筆評價吧</span></Box>) :
                  genCommentCards
          }
        </CardContent>
        <CardActions>
          <form style={{ display: "flex", alignItems: "stretch", width: "100%" }} onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              {!isLoggedin ? 
              (
              <GoogleLoginContainer renderComponent={<><SearchBarBox>
                <SearchBarInput value={comment} onChange={(e) => setComment(e.target.value)} placeholder="填入你的評價吧！" disabled={loading} />
              </SearchBarBox></>}/>
              ) : (
              <SearchBarBox>
                <SearchBarInput value={comment} onChange={(e) => setComment(e.target.value)} placeholder="填入你的評價吧！" disabled={loading} />
              </SearchBarBox>
              )}
            </Box>
            <IconButton disabled>
              <FaceIcon />
            </IconButton>
            <IconButton type="submit" disabled={loading}>
              <SendIcon />
            </IconButton>
          </form>
        </CardActions>
      </CourseRatePannelBox >
    </Box>
  );
}

export default CourseRatePannel;