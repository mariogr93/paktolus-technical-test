import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CustomModal from "../modal/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  function onButtonClick() {
    props.loginIn();
    props.closeModal();
  }
  return (
    <CustomModal open={props.isOpen}>
      <Typography variant="h2">LOGIN</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <Typography variant="h6">Username</Typography>
        <TextField id="username-input" label="Username" type="text" />
        <br />
        <br />
        <Typography variant="h6">Password</Typography>
        <TextField
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button onClick={onButtonClick} color="inherit">
          Get me in!
        </Button>
      </form>
      <span>123</span>
    </CustomModal>
  );
}

export default Login;
