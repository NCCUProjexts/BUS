import { Typography, Box, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { styled } from '@mui/material/styles';

const CourseRateMessageCardBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.spacing(2),
  border: "2px solid " + theme.palette.grey[400],
  backgroundColor: theme.palette.background.default,
  margin: theme.spacing(3, 0),
  padding: theme.spacing(2),
  wordBreak: "break-all"
}));

const CourseRateMessageCardFeedbackTag = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(-1.5),
  left: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.grey[100],
  padding: theme.spacing(0, 1.5)
}));

const CourseRateMessageCardOfficialFeedbackTag = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(-1.5),
  left: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.grey[100],
  padding: theme.spacing(0, 1.5)
}));

function CourseRateMessageCard({ id, source, semester, content, thumb, isThumbUp, onThumbUp }) {
  return (
    <CourseRateMessageCardBox>
      {source == "評價網" ?
        <CourseRateMessageCardFeedbackTag>{source} {semester}</CourseRateMessageCardFeedbackTag>
        :
        <CourseRateMessageCardOfficialFeedbackTag>{source} {semester}</CourseRateMessageCardOfficialFeedbackTag>
      }
      <Box sx={{ flexGrow: 1 }}>{content}</Box>
      <IconButton onClick={() => onThumbUp(source == "評價網" ? "CUSTOM" : "OFFICIAL", id)}>
        {
          isThumbUp ?
            <ThumbUpAltIcon />
            :
            <ThumbUpOffAltIcon />
        }
      </IconButton>
      <Box sx={{minWidth: "20px", paddingLeft: "5px"}}>{thumb}</Box>
    </CourseRateMessageCardBox>
  );
}

export default CourseRateMessageCard;