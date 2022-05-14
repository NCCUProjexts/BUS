import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/actions/auth';
import theme from "./theme/theme";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

function App() {
  const dispatch = useDispatch();

  dispatch(login()).catch(() => {
    dispatch(logout());
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" >
            <Route path=":courseId" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
