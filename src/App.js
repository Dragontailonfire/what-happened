import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import EventDashboard from "./components/EventDashboard";
import { ThemeProvider } from "@material-ui/styles";
import { lightTheme, darkTheme, amoledTheme } from "./utilities/theme";
import PageNotFound from "./components/pages/PageNotFound";
import AboutPage from "./components/pages/AboutPage";

function App() {
  const settings = useSelector((state) => state.appSettings);
  const darkness = settings.isDark;
  const amoled = settings.isAmoled;

  return (
    <ThemeProvider
      theme={amoled ? amoledTheme : darkness ? darkTheme : lightTheme}
    >
      <Switch>
        <Route exact path="/" component={EventDashboard} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
