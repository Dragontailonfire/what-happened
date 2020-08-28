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
        <Typography variant="h1">Nothing to see here folks!</Typography>
        <Typography variant="h6" gutterBottom>
          How did you end up here?
        </Typography>
        <Typography variant="button">
          <Link to="/" className="btn">
            <Button color="primary" variant="contained" size="large">
              Go home to safety
            </Button>
          </Link>
        </Typography>
      </Container>
      <SiteFooter />
    </ThemeProvider>
  );
}
