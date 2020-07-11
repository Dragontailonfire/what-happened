import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions, Button, Grid, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

export default function AddEventDialog(props) {
  const { handleSubmit, errors, control, register } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    alert(data.username + " - " + data.password + " - " + data.phoneNumber);
  };

  return (
    <Dialog
      id="loginDialog"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="login-dialog-title"
      aria-describedby="login-dialog-description"
    >
      <DialogTitle id="login-dialog-title">Login</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid
            spacing={1}
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <Controller
                as={TextField}
                InputProps={{
                  disableUnderline: true,
                }}
                color="primary"
                variant="filled"
                label="Username"
                name="username"
                margin="none"
                id="username"
                fullWidth
                rules={{ required: true }}
                control={control}
                error={errors.username ? true : false}
                helperText={
                  errors.username && "Enter the username and try again"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                color="primary"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  type: "password",
                }}
                multiline
                variant="filled"
                name="password"
                id="password"
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <input type="password" name="phoneNumber" ref={register} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={props.handleClose} color="inherit">
            Cancel
          </Button>
          <Button id="login" type="submit" variant="contained" color="primary">
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
