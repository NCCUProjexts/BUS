import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLocation as reduxSetLocation, getNearestStop } from './store/actions/bus';
import { useEffect } from "react";
import theme from "./theme/theme";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  const geolocation = useSelector(state => state.bus.Geolocation)

  function setLocation(position) {
    dispatch(reduxSetLocation(position.coords.latitude, position.coords.longitude))
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "auth.googleProfile.set",
          googleProfile: user
        })
      } else {

      }
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
    } else {
      dispatch(reduxSetLocation("25.04235", "121.5650027"))
    }
  }, [])

  useEffect(() => {
    if (geolocation[0] && geolocation[1])
      dispatch(getNearestStop())
  }, [geolocation])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
