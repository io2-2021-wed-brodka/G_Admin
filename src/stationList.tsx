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
    InputLabel,
    ListItem,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog/Dialog";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import {blockBikeStation, deleteBikeStation, getStations, postStation, Station} from "./Api/bikeStationApi";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import { delay } from "./Api/ApiUtils";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ListStyle: {
            overflowY: 'auto',
            opacity: '0.92',
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '2%',
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        deleteButton: {
            backgroundColor: '#D11A2A',
            variant: 'contained',
            margin: '5px'
        },
        blockButton: {
            backgroundColor: '#f2e20e',
            variant: 'contained',
            margin: '5px'
        },
    }),
);
const themeWarning = createMuiTheme({
    palette: {
        primary: {
            main: '#950740'
        }
    },
});
const themeListItem = createMuiTheme({
    palette: {
        primary: {
            main: '#4E4E50'
        }
    },
});
export let stations: Station[] = [];

function StationListPage() {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [newStationState, setState] = React.useState<number>(0);
    const [newStationName, setName] = React.useState<string>("Generic Location");
    const [list, setList] = React.useState<Station[]>(stations);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [openDeleteConfirmPopUp, setDeleteConfirmPopUp] = useState<boolean>(false);
    const [openBlockConfirmPopUp, setBlockConfirmPopUp] = useState<boolean>(false);
    const [getStationTrigger, setStationTrigger] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChangeState = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState(Number(event.target.value));
    };
    const handleAddStation = async () => {
        await delay(50);
        postStation(newStationName).then(r => {
        });
        setOpen(false);
        setStationTrigger(!getStationTrigger);
    };
    const handleChangeName = (location: string) => {
        setName(location);
    };
    const blockClicked = async () => {
        await delay(50);
        blockBikeStation(list[selectedIndex].id.toString());
        setBlockConfirmPopUp(false);
        setStationTrigger(!getStationTrigger);
    };
    const deleteClicked = async () => {
        await delay(50);
        deleteBikeStation(list[selectedIndex].id.toString());
        setDeleteConfirmPopUp(false);
        setStationTrigger(!getStationTrigger);
    };
    const handleCloseBlockConfirmPopUp = () => {
        setDeleteConfirmPopUp(false);
    };
    const handleCloseDeleteConfirmPopUp = () => {
        setDeleteConfirmPopUp(false);
    };
    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    useEffect(() => {
        getStations().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            let list: Station[] = r.data as Station[] || [];
            list = list.map(e => {
                return {id: e.id, name: e.name, state: e.state, bikes: e.bikes}
            });
            setList(list);
        });
    }, [getStationTrigger]);
    return (
        <div className="App" style={{height: "91vh", display: "flex", flexDirection: "column"}}>
            <List className={classes.ListStyle} subheader={<li/>}>
                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader
                            style={{ backgroundColor: '#4E4E50', display: 'flex', fontWeight: 'bold',
                                    height: '50px', borderRadius: '15px'}}>
                            <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                 style={{width: '90%'}}>
                                <Box p={0} m={1} >
                                    Name
                                </Box>
                            </Box>
                            <Button startIcon={<AddIcon/>} variant="contained"  style={{margin: '5px'}} onClick={handleClickOpen}>
                                 new station
                            </Button>
                            <Dialog disableBackdropClick open={open} onClose={handleClose}>
                                <DialogTitle>Fill the form</DialogTitle>
                                <DialogContent>
                                    <form className={classes.container}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="demo-dialog-native">
                                                Name
                                            </InputLabel>
                                            <Input onChange={(event: any) => handleChangeName(event.target.value)}/>
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleAddStation} color="primary">
                                        OK
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </ListSubheader>
                        {list.map((station, index) => {
                            return (
                                <div key={station.id}>
                                    <ListItem style={{backgroundColor: '#69696e', color: 'white', display: 'flex', 
                                                    height: '50px', marginBottom: '5px',  marginTop: '5px', borderRadius: '15px'}}
                                              onClick={() => handleListItemClick(index)}>
                                        <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                             style={{width: '90%'}}>                                          
                                            <Box p={0} m={1}>
                                                <ListItemText primary={station.name}></ListItemText>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button variant="contained" color="primary" className={classes.blockButton}
                                                    onClick={() => setBlockConfirmPopUp(true)} 
                                                    startIcon={<ErrorOutlineIcon/>}> BLOCK</Button>
                                            <Button variant="contained" color="primary" className={classes.deleteButton}
                                                    onClick={() => setDeleteConfirmPopUp(true)}
                                                    startIcon={<DeleteOutlineSharpIcon/>}> DELETE</Button>
                                            <Dialog open={openBlockConfirmPopUp}
                                                    keepMounted
                                                    onClose={handleCloseBlockConfirmPopUp}>
                                                <DialogTitle
                                                    id="alert-dialog-slide-title">{"Block this station?"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
                                                        Do you really want you block this station?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseBlockConfirmPopUp} color="primary">
                                                        No
                                                    </Button>
                                                    <Button onClick={blockClicked} color="primary">
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Dialog open={openDeleteConfirmPopUp}
                                                    keepMounted
                                                    onClose={handleCloseDeleteConfirmPopUp}>
                                                <DialogTitle
                                                    id="alert-dialog-slide-title">{"Delete this station?"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
                                                        Do you really want you delete this station?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseDeleteConfirmPopUp} color="primary">
                                                        No
                                                    </Button>
                                                    <Button onClick={deleteClicked} color="primary">
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </ThemeProvider>
                                    </ListItem>
                                </div>
                            );
                        })}

                    </ul>
                </li>

            </List>
        </div>
    );
}


export default StationListPage;