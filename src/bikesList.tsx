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
import Dialog from "@material-ui/core/Dialog/Dialog";
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import {Bike, BikeState, deleteBike, getBikes, postBike} from "./Api/bikeApi";
import {getStations, Station} from "./Api/bikeStationApi";
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ListStyle: {
            overflowY: 'auto',
            opacity: '0.92',
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '2%',
            marginBottom: '2%',
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
            backgroundColor: '#D11A2A ',
            variant: 'contained',
            margin: '5px'
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        generalContainer:{  
         height: '91vh',
         display: 'flex',
         flexDirection: 'column'
        }
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
let bicycles: Bike[] = [];
const BikeListPage = () => {
    const classes = useStyles();
    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [newBikeState, setState] = React.useState<number>(0);
    const [newBikeStation, setStation] = React.useState<string>("0");
    const [bikeList, setBikeList] = React.useState<Bike[]>(bicycles);
    const [stationList, setStationList] = React.useState<Station[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [getBikesTrigger, setBikesTrigger] = React.useState(true);
    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    const handleChangeStation = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStation(String(event.target.value));
    };
    const handleCloseSlidingWindow = () => {
        setOpenSlidingWindow(false);
    };
    const deleteClicked = async () => {
        deleteBike(bikeList[selectedIndex].id);
        setOpenSlidingWindow(false);
        setBikesTrigger(!getBikesTrigger);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddBike = async () => {
        postBike(newBikeStation).then(r => {
        });
        setOpen(false);
        setBikesTrigger(!getBikesTrigger);
    };
    useEffect(() => {
        getBikes().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            let list: Bike[] = r.data as Bike[] || [];
            list = list.map(e => {
                return {id: e.id, status: BikeState.InService, station: e.station}
            });
            setBikeList(list);
        });
        getStations().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            let listStation: Station[] = r.data as Station[] || [];
            listStation = listStation.map(e => {
                return {id: e.id, name: e.name, state: e.state, bikes: e.bikes}
            });
            setStationList(listStation);
        });
    }, [getBikesTrigger]);
    return (
        <div className={classes.generalContainer}>
            <List className={classes.ListStyle} subheader={<li/>}>
                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader
                            style={{backgroundColor: '#4E4E50', display: 'flex', fontWeight: 'bold',
                                    height: '50px', borderRadius: '15px'}}>
                            <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                 style={{width: '90%'}}>
                                <Box p={1} m={1} >
                                    State
                                </Box>
                                <Box p={1} m={1} style={{marginLeft:'6%'}}>
                                    Station
                                </Box>
                            </Box>
                            <Button startIcon={<AddIcon/>} variant="contained"  style={{margin: '5px'}} onClick={handleClickOpen}>
                                NEW BIKE
                            </Button>
                            <Dialog disableBackdropClick open={open} onClose={handleClose}>
                                <DialogTitle>Fill the form</DialogTitle>
                                <DialogContent>
                                    <form className={classes.container}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="demo-dialog-native">
                                                station
                                            </InputLabel>
                                            <Select native value={newBikeStation} onChange={handleChangeStation}
                                                    input={<Input/>}>
                                                {stationList.map((station) => {
                                                    return (
                                                        <option value={station.id}> {station.name} </option>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleAddBike} color="primary">
                                        OK
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </ListSubheader>
                        {bikeList.map((bike, index) => {
                            return (
                                <li key={bike.id}>
                                    <ListItem style={{backgroundColor: '#69696e', color: 'white', display: 'flex', 
                                                    height: '50px', marginBottom: '5px',  marginTop: '5px', borderRadius: '15px'}}
                                              onClick={() => handleListItemClick(index)}>
                                        <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                             style={{width: '90%'}}>
                                            <Box p={2} m={1}  >
                                                <ListItemText primary={BikeState[bike.status]}></ListItemText>
                                            </Box>
                                            <Box p={2} m={1}>
                                                <ListItemText
                                                    primary={bike.station == null ? "" : bike.station.name}></ListItemText>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button className={classes.deleteButton} id="delete_bike_button" startIcon={<DeleteOutlineSharpIcon/>}
                                                    onClick={() => setOpenSlidingWindow(true)}> DELETE</Button>
                                            <Dialog open={openSlidingWindow}
                                                    keepMounted
                                                    onClose={handleCloseSlidingWindow}>
                                                <DialogTitle
                                                    id="alert-dialog-slide-title">{"Delete this bike?"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
                                                        Do you really want you delete this bike?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseSlidingWindow} color="primary">
                                                        No
                                                    </Button>
                                                    <Button onClick={deleteClicked} color="primary">
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </ThemeProvider>
                                    </ListItem>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </List>
        </div>
    );
}
export default BikeListPage;
