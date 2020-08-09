import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
  Slide,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddEventDialog(props) {
  const { handleSubmit, errors, control, register, reset } = useForm({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data) => {
    alert("Username: " + data.username + "\nPassword: " + data.password);
    reset();
  };

  return (
    <Dialog
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      id="loginDialog"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="login-dialog-title"
      aria-describedby="login-dialog-description"
    >
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
              <Typography variant="h6">Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                color="secondary"
                variant="outlined"
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
                color="secondary"
                type="password"
                fullWidth
                rules={{ required: true }}
                InputProps={{
                  type: "password",
                }}
                variant="outlined"
                name="password"
                id="password"
                label="Password"
                error={errors.password ? true : false}
                helperText={
                  errors.password && "Enter the password and try again"
                }
              />
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
