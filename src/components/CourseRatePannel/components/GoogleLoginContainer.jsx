import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Backdrop, CircularProgress } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin } from 'react-google-login';
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/actions/auth"

function GoogleLoginContainer({ onClose,renderComponent }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const responseGoogle = (e) => {
    if (e.error) {
      alert(e.error);
      return;
    }
    setLoading(true);
    localStorage.setItem("authToken", e.tokenId);
    dispatch(login()).then(res => {
      onClose();
      setLoading(false);
    })
  };

  return (
    <>
        <GoogleLogin
            clientId="22551978498-3d7pfatc0km7mpm8t6glfuu4ev2jld3a.apps.googleusercontent.com"
            render={renderProps => (
            <span  style={{ cursor: 'pointer' }}  variant="contained" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<GoogleIcon />}>
                {renderComponent}
            </span>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    </>
  )
}

export default GoogleLoginContainer;