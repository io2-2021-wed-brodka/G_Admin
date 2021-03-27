import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme,createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Link } from 'react-router-dom'

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
    },
  }),
);
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#4E4E50'
    },
    primary:{
      main:'#1A1A1D'
    },
    warning: {
      main: '#950740'
    }
    
  }
});
export const TopBar: React.FC = () => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit" startIcon={<DirectionsBikeIcon />} className={classes.title} component={Link} to="/bikes">
             Bicycles 
          </Button>
          <Button color="inherit" startIcon={<LocalParkingIcon />} className={classes.title} component={Link} to="/stations"> Stations </Button>
          <Button color="inherit" startIcon={<ErrorOutlineIcon />} className={classes.title}> Malfunctions </Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>
      
    </div>
    );
}