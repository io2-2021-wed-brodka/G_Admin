import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles,Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Animated} from "react-animated-css";
import {useState} from "react";
import 'animate.css';
import Box from '@material-ui/core/Box';
import {postLogin} from "./Api/registerLoginApi";
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  formContainer: {
    backgroundColor: '#aec6cf',
    opacity: '0.95',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    marginTop: '50px',
    width: '300px',
    background: 'linear-gradient(rgba(0,0,255,0.5),transparent)',         
  },
  textFieldStyle: {
      margin: '10px',
      backgroundColor: 'white',
      color: 'white',
      
  },
  welcomeLabel: {
    color: 'white',
    marginTop: '10%',
    fontSize: '35px',
    marginBottom: '20px'
  },
  windowContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  formContainerOverlay: {
    backgroundColor: '#aec6cf',
    opacity: '0.95',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    marginTop: '50px',
    width: '300px',  
    background: 'linear-gradient(rgba(250,0,0,0.5),transparent)',   
       
  },
  welcomeLabelSmall: {
    color: 'white',
    marginTop: '10%',
    fontSize: '15px',
    marginBottom: '20px'
  },
}),
);

export const RegisterLoginPage = () =>{
    const classes = useStyles();
    const [login, setLogin] = useState<string>("Login");
    const [password, setPassword] = useState<string>("Password");
    const [loginOpen, setLoginOpen] = useState<boolean>(true);
    const [signUpOpen, setSignUpOpen] = useState<boolean>(false);
    
    const handleChangeLogin = (login: string) => {
        setLogin(login);
    }
    const handleChangePassword = (password: string) => {
        setPassword(password);
    }
    const handleLogging = () => {
        postLogin(login, password);
    }
    const handleOpen = () =>{
        setLoginOpen(!loginOpen);
        setSignUpOpen(!signUpOpen);
    }
    return (
        <div className={classes.windowContainer}>
            <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                 >
                <Box p={1} m={1}>
                    {loginOpen ?
                        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={loginOpen}>
                            <Container fixed className={classes.formContainer} >
                                <div className={classes.welcomeLabel}>Log in</div>
                                <TextField id="standard-login" label="Login" variant="filled" className={classes.textFieldStyle} onChange={(event: any) => handleChangeLogin(event.target.value)}/>
                                <TextField id="standard-password" type="password" label="Password" variant="filled" className={classes.textFieldStyle} onChange={(event: any) => handleChangePassword(event.target.value)}/>
                                <Button variant="contained" style={{borderRadius: '15px'}} onClick={handleLogging}> Log in</Button>
                            </Container>
                        </Animated>              
                    :  
                        <Container fixed className={classes.formContainerOverlay}>
                            <div className={classes.welcomeLabel}>Hello, Friend!</div>
                            <div className={classes.welcomeLabelSmall}>Enter your personal data and begin journey with us</div>
                            <div className={classes.welcomeLabelSmall}>Don't have account yet? Sing up here!</div>
                            <Button variant="outlined" onClick={() => handleOpen()} style={{borderRadius: '15px'}}>I want to Sign in</Button>
                        </Container>                      
                    }
                </Box>
                <Box p={1} m={1}>
                    {signUpOpen ?
                        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={signUpOpen}>
                            <Container fixed className={classes.formContainer}>
                                <div className={classes.welcomeLabel}>Sign up</div>
                                <TextField id="standard-login" label="Login" variant="filled" className={classes.textFieldStyle}/>
                                <TextField id="standard-password" type="password" label="Password" variant="filled" className={classes.textFieldStyle}/>
                                <TextField id="standard-password-confirm" type="password" label="Password Confirm" variant="filled" className={classes.textFieldStyle}/>
                                <Button variant="contained" style={{borderRadius: '15px'}}> Sign up</Button>
                            </Container>
                        </Animated>
                    :
                        <Container fixed className={classes.formContainerOverlay}>
                            <div className={classes.welcomeLabel}>Welcome Back!</div>
                            <div className={classes.welcomeLabelSmall}>To keep conected with us please login with your personal data</div>
                            <div className={classes.welcomeLabelSmall}>Have account already? Sign in here!</div>
                            <Button variant="outlined" onClick={() => handleOpen()} style={{borderRadius: '15px'}}>I want to Sign up</Button>
                        </Container>           
            }
                </Box>
            </Box>  
        </div>
    )
}