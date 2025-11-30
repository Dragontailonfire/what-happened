import React from "react";
import { SnackbarProvider } from "notistack";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { EventModificationPanel } from "./EventModificationPanel";
import { FinalSortedFilteredEventList } from "./FinalSortedFilteredEventList";

import NavBar from "./Navbar";
import SiteFooter from "./SiteFooter";
import Grid from "@mui/material/Grid";
import { EventSortFilterPanel } from "./EventSortFilterPanel";
import QuickActions from "./common/QuickActions";

export default function EventDashboard() {
  return (
    <>
      <SnackbarProvider maxSnack={1} hideIconVariant>
        <CssBaseline />
        <NavBar />
        <Box sx={{ ...theme => theme.mixins.toolbar }} />
        <Container maxWidth="lg">
          <Grid
            spacing={10}
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid 
              item 
              md={4}
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'sticky',
                top: 70,
              }}
            >
              <EventModificationPanel />
            </Grid>
            <Grid 
              item 
              lg={5} 
              xs={11}
              sx={{
                position: 'sticky',
                top: 70,
              }}
            >
              <FinalSortedFilteredEventList />
            </Grid>
            <Grid 
              item 
              md={3}
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'sticky',
                top: 70,
              }}
            >
              <EventSortFilterPanel />
            </Grid>
            <Grid item>
              <QuickActions />
            </Grid>
          </Grid>
        </Container>
        <SiteFooter />
      </SnackbarProvider>
    </>
  );
}
