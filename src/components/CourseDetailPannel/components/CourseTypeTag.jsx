import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const RequiredBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.25) + " " + theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.tagRequired.main
}));

const PartialBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.25) + " " + theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.tagPartial.main
}));

const SelectBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.25) + " " + theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.grey[100],
  backgroundColor: theme.palette.tagSelect.main
}));

const NoneBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.25) + " " + theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[400]
}));

const CourseTypeBox = ({ courseType }) => {
  switch (courseType) {
    case "必/Required":
      return (
        <RequiredBox>
          必修
        </RequiredBox>
      );
    case "選/Elective":
      return (
        <PartialBox>
          選修
        </PartialBox>
      );
    case "群/Partially Required":
      return (
        <SelectBox>
          群修
        </SelectBox>
      );
    default:
      return (
        <NoneBox>
          無資料
        </NoneBox>
      );
  }
}

function CourseTypeTag({ courseType }) {
  return (
    <Box sx={{padding: "6px "}}>
      <CourseTypeBox courseType={courseType} />
    </Box>
  )
}

export default CourseTypeTag;