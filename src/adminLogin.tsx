import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Animated } from "react-animated-css";
import { useState } from "react";
import "animate.css";
import Box from "@material-ui/core/Box";
import { postLogin } from "./Api/adminLoginApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      backgroundColor: "#aec6cf",
      opacity: "0.95",
      borderRadius: "15px",
      display: "flex",
      flexDirection: "column",
      height: "400px",
      marginTop: "50px",
      width: "300px",
      background: "linear-gradient(rgba(0,0,255,0.5),transparent)",
    },
    textFieldStyle: {
      margin: "10px",
      backgroundColor: "white",
      color: "white",
    },
    welcomeLabel: {
      color: "white",
      marginTop: "10%",
      fontSize: "35px",
      marginBottom: "20px",
    },
    windowContainer: {
      display: "flex",
      flexDirection: "column",
    },
    formContainerOverlay: {
      backgroundColor: "#aec6cf",
      opacity: "0.95",
      borderRadius: "15px",
      display: "flex",
      flexDirection: "column",
      height: "500px",
      marginTop: "50px",
      width: "300px",
      background: "linear-gradient(rgba(250,0,0,0.5),transparent)",
    },
    welcomeLabelSmall: {
      color: "white",
      marginTop: "10%",
      fontSize: "15px",
      marginBottom: "20px",
    },
  })
);

export const AdminLoginPage = () => {
  const classes = useStyles();
  const [login, setLogin] = useState<string>("Login");
  const [password, setPassword] = useState<string>("Password");

  const handleChangeLogin = (login: string) => {
    setLogin(login);
  };
  const handleChangePassword = (password: string) => {
    setPassword(password);
  };
  const handleLogging = () => {
    postLogin(login, password);
  };
  const onEnterDown = (event: any) => {
    if (event.key == "Enter") {
      event.preventDefault();
      handleLogging();
    }
  };
  return (
    <div className={classes.windowContainer}>
      <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center">
        <Container fixed className={classes.formContainer}>
          <div className={classes.welcomeLabel}>Log in as Administrator</div>
          <TextField
            id="standard-login"
            label="Login"
            variant="filled"
            className={classes.textFieldStyle}
            onChange={(event: any) => handleChangeLogin(event.target.value)}
            onKeyDown={onEnterDown}
          />
          <TextField
            id="standard-password"
            type="password"
            label="Password"
            variant="filled"
            className={classes.textFieldStyle}
            onChange={(event: any) => handleChangePassword(event.target.value)}
            onKeyDown={onEnterDown}
          />
          <Button
            variant="contained"
            style={{ borderRadius: "15px" }}
            onClick={handleLogging}
          >
            Log in
          </Button>
        </Container>
      </Box>
    </div>
  );
};
