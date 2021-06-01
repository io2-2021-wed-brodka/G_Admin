import React from "react";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { postLogout } from "../Api/adminLoginApi";
import PeopleIcon from "@material-ui/icons/People";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: "10px",
      marginRight: "10px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#4E4E50",
    },
    primary: {
      main: "#1A1A1D",
    },
    warning: {
      main: "#950740",
    },
  },
});

export const adminLoggedIn = () => {
  return sessionStorage.length !== 0;
};

export const TopBar: React.FC = () => {
  const classes = useStyles();
  const handleLogout = () => {
    postLogout();
  };
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          {adminLoggedIn() ? (
            <Toolbar className={classes.toolbar}>
              <div>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  component={Link}
                  to="/"
                >
                  <MenuIcon />
                </IconButton>
                <Button
                  color="inherit"
                  startIcon={<DirectionsBikeIcon />}
                  className={classes.title}
                  component={Link}
                  to="/bikes"
                >
                  {" "}
                  Bicycles{" "}
                </Button>
                <Button
                  id="topbar-station-button-confirm"
                  color="inherit"
                  startIcon={<LocalParkingIcon />}
                  className={classes.title}
                  component={Link}
                  to="/stations"
                >
                  {" "}
                  Stations{" "}
                </Button>
                <Button
                  id="topbar-rented-button-confirm"
                  color="inherit"
                  startIcon={<PeopleIcon />}
                  className={classes.title}
                  component={Link}
                  to="/users"
                >
                  {" "}
                  Users & Techs{" "}
                </Button>
              </div>
              <div>
                <Button
                  id="logout-button-confirm"
                  color="inherit"
                  startIcon={<ExitToAppIcon />}
                  className={classes.title}
                  onClick={handleLogout}
                >
                  {" "}
                  Logout{" "}
                </Button>
              </div>
            </Toolbar>
          ) : (
            <Toolbar className={classes.toolbar}>
              <div>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  component={Link}
                  to="/"
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div>
                <Button
                  color="inherit"
                  startIcon={<PersonOutlineIcon />}
                  className={classes.title}
                  component={Link}
                  to="/login"
                >
                  {" "}
                  Login{" "}
                </Button>
              </div>
            </Toolbar>
          )}
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
};
