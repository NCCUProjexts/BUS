import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slider, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRate } from "../../../store/actions/courseRate";
import { getDetail } from "../../../store/actions/courseDetail"

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px !important",
  border: "2px solid " + theme.palette.grey[400] + " !important",
  color: theme.palette.primary.main,
  padding: theme.spacing(0.5, 2),
  "&:hover": {
    border: "2px solid " + theme.palette.primary.main + " !important",
    backgroundColor: theme.palette.primary.main + '!important',
    color: theme.palette.primary.contrastText + '!important',
  },
}));

function CourseRatingDialog() {
  const params = useParams()
  const dispatch = useDispatch();
  const courseId = params.courseId;
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(3.5);
  const [sweet, setSweet] = useState(3.5);
  const [boringness, setBoringness] = useState(3.5);
  const [harvest, setHarvest] = useState(3.5);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (loading && reason) return
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    dispatch(createRate(courseId, rate, sweet, boringness, harvest)).then(() => {
      setLoading(false);
      setOpen(false);
    })
  }

  return (
    <Box>
      <ActionButton onClick={handleClickOpen}>填寫評價</ActionButton>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          填寫課程評價
        </DialogTitle>
        <DialogContent>
          <Box sx={{ paddingTop: "20px" }}>
            <Typography>總推薦指數</Typography>
            <Slider
              value={rate}
              onChange={(event, newValue) => setRate(newValue)}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={0}
              max={5}
            />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <Typography>甜度</Typography>
            <Slider
              value={sweet}
              onChange={(event, newValue) => setSweet(newValue)}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={0}
              max={5}
            />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <Typography>涼度</Typography>
            <Slider
              value={boringness}
              onChange={(event, newValue) => setBoringness(newValue)}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={0}
              max={5}
            />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <Typography>收穫</Typography>
            <Slider
              value={harvest}
              onChange={(event, newValue) => setHarvest(newValue)}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={0}
              max={5}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={handleSubmit}>送出評價</LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CourseRatingDialog;