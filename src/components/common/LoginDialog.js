import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export default function LoginDialog(props) {
  const { handleSubmit, formState: { errors }, control, register } = useForm({
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
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    color="primary"
                    variant="filled"
                    label="Username"
                    margin="none"
                    id="username"
                    fullWidth
                    error={!!errors.username}
                    helperText={
                      errors.username && "Enter the username and try again"
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="primary"
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      type: "password",
                    }}
                    variant="filled"
                    id="password"
                    label="Password"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="password" name="phoneNumber" {...register("phoneNumber")} />
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
