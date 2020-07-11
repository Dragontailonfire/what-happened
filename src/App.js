import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import EventDashboard from "./components/EventDashboard";
import { ThemeProvider } from "@material-ui/styles";
import { lightTheme, darkTheme } from "./components/common/theme";
import PageNotFound from "./components/pages/PageNotFound";
import AboutPage from "./components/pages/AboutPage";

function App() {
  const settings = useSelector((state) => state.appSettings);
  const darkness = settings.isDark;

  return (
    <ThemeProvider theme={darkness ? darkTheme : lightTheme}>
      <Switch>
        <Route exact path="/" component={EventDashboard} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
