import React, {useEffect, useState} from "react";
import {createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import './Layout/topbar.tsx';
import List from '@material-ui/core/List';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormGroup,
    InputLabel,
    ListItem,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import {postLogin} from "./Api/loginApi";
import { PhotoSizeSelectLargeOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ListSyle: {
            overflowY: 'scroll',
        },
        ListFont: {
            color: 'white'
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
        deleteButton: {
            backgroundColor: '#950740',
            variant: 'contained'
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);
const LoginPage = () => {
    const classes = useStyles();
    const [login, setLogin] = useState<string>("Login");
    const [password, setPassword] = useState<string>("Password");

    const handleChangeLogin = (login: string) => {
        setLogin(login);
    }
    const handleChangePassword = (password: string) => {
        setPassword(password);
    }
    const handleLogging = () => {
        postLogin(login, password).then(r => {/*jeśli logowanie udało się to przenieś na stronę domową, jak nie udało się to ponów logowanie i podświetl na czerwono */});
    }
    return (
        <div style={{height: "91vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <form className={classes.container}>
                <FormGroup className={classes.formControl} onSubmit={handleLogging}>
                    <TextField label="Login" onChange={(event: any) => handleChangeLogin(event.target.value)}/>
                    <br/>
                    <TextField label="Password" type="password" onChange={(event: any) => handleChangePassword(event.target.value)}/>
                    <br/>
                    <Button type="submit">
                        Login
                    </Button>
                </FormGroup>
            </form>
        </div>
    );
}
export default LoginPage;