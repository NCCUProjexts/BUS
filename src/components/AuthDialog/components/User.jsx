import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Avatar, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogout } from 'react-google-login';
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { googleProfile } from "../../../store/selectors/auth"
import { logout } from "../../../store/actions/auth";
import { getAuth, signOut } from "firebase/auth";

function User() {
  const dispatch = useDispatch();
  const user = useSelector(state => googleProfile(state));
  const avatar = user.photoURL;
  const name = user.displayName;
  const email = user.email;
  const auth = getAuth();

  const handleClick = (e) => {
    signOut(auth).then(() => {
      dispatch(logout());
    }).catch((error) => {
    });
  };

  return (
    <Box>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Remy Sharp" src={avatar} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ margin: "0px 10px" }}>{name}</Typography>
          <Typography sx={{ margin: "0px 10px" }}>{email}</Typography>
        </Box>
      </DialogTitle>
      <DialogActions>
        <Button variant="outlined" >
          Footprint
        </Button>
        <Button variant="contained" onClick={handleClick} startIcon={<GoogleIcon />}>
          Logout
        </Button>
      </DialogActions>
    </Box>
  )
}

export default User;