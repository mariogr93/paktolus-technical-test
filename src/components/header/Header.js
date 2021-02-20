import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import logo from "../../logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Login from "./Login";
import SaveLocalStorage from "../../storage/UseLocalStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  const { state, dispatch } = useAppContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openLogin = () => {
    setOpenModal(true);
  };
  const closeLogin = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    handleClose();
    dispatch({ type: "LOGOUT" });
  };
  const handleLogin = (username) => {
    dispatch({
      type: "LOGIN",
      payload: {
        user: SaveLocalStorage({ username }, { type: "LOGIN", key: "USER" }),
        isAuthenticated: true,
      },
    });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6">React Logo</Typography>
            <img
              src={logo}
              style={{ width: "40px", height: "40px" }}
              className="App-logo"
              alt="logo"
            />
          </div>

          {state.isAuthenticated ? (
            <div
              style={{
                display: "flex",
                width: "100px",
                justifyContent: "space-evenly",
              }}
            >
              <Typography style={{ alignSelf: "center" }} variant="h6">
                ${state.user.money.toFixed(2)}
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>User: {state.user.username}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button onClick={openLogin} color="inherit">
                Login
              </Button>
              <Login
                isOpen={openModal}
                closeModal={closeLogin}
                loginIn={handleLogin}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
