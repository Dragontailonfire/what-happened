import React from "react";
import { Link } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Button,
  Typography,
} from "@material-ui/core";
import SiteFooter from "../SiteFooter";
import BasicNavbar from "../common/BasicNavbar";

export default function PageNotFound() {
  return (
    <ThemeProvider theme>
      <CssBaseline />
      <BasicNavbar />
      <Container maxWidth="lg">
        <Typography variant="h1">Login</Typography>
        <Typography variant="h6" gutterBottom>
          Under construction
        </Typography>
        <Typography variant="button">
          <Link to="/" className="btn">
            <Button color="primary" variant="contained" size="large">
              Go home
            </Button>
          </Link>
        </Typography>
      </Container>
      <SiteFooter />
    </ThemeProvider>
  );
}
