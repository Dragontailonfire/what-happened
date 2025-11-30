import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import EventDashboard from "./components/EventDashboard";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
import { lightTheme, darkTheme } from "./components/common/theme";
import PageNotFound from "./components/pages/PageNotFound";
import AboutPage from "./components/pages/AboutPage";

function App() {
  const settings = useSelector((state) => state.appSettings);
  const darkness = settings.isDark;

  return (
    <MuiThemeProvider theme={darkness ? darkTheme : lightTheme}>
      <StylesThemeProvider theme={darkness ? darkTheme : lightTheme}>
        <Routes>
          <Route path="/" element={<EventDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </StylesThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
