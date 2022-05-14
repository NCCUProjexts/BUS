import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Backdrop, CircularProgress } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin } from 'react-google-login';
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/actions/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function Login({ onClose }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch({
          type: "auth.googleProfile.set",
          googleProfile: user
        })
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <Box>
      {
        loading ?
          <DialogContent>
            <CircularProgress color="inherit" />
          </DialogContent>
          :
          <Box>
            <DialogTitle sx={{ textAlign: "center" }}>
              登入
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Button variant="contained" onClick={handleClick} startIcon={<GoogleIcon />}>
                  Google Login
                </Button>
              </DialogContentText>
            </DialogContent>
          </Box>
      }
    </Box>
  )
}

export default Login;