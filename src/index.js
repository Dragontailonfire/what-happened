import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
import { lightTheme } from "./components/common/theme";

const store = configureStore();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={lightTheme}>
          <StylesThemeProvider theme={lightTheme}>
            <Router>
              <App />
            </Router>
          </StylesThemeProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
