import React, { useState } from "react";
import { createStyles, makeStyles, Theme,createMuiTheme ,ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import './Layout/topbar.tsx';
import List from '@material-ui/core/List';
import { ListItemText, Divider, ListItem, Button, ListSubheader,DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputLabel } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import {  stations} from "./stationList";
import {BikeState,Bike, postBike} from "./Api/bikeApi";
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      ListSyle: {
        overflowY: 'scroll',         
      },
      ListFont:{
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
  const themeWarning = createMuiTheme({
    palette: {
      primary:{
        main:'#950740'
      }
    },
  });
  const themeListItem = createMuiTheme({
    palette: {
      primary:{
        main:'#4E4E50'
      }
    },
  });
  let bicycles: Bike[] = [];

   
const  BikeListPage = () => {
    const classes = useStyles();
    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [newBikeState, setState] = React.useState<number>(0);
    const [newBikeStationID, setStation] = React.useState<number>(0);
    const [list, setList] = React.useState<Bike[]>(bicycles);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const handleListItemClick = (
      index: number,
    ) => {
      setSelectedIndex(index);
    };
  const handleBikeStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState(Number(event.target.value));
  };
  const handleChangeStation = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStation(Number(event.target.value));
  };
    const handleCloseSlidingWindow = () => {
      setOpenSlidingWindow(false);
    };
    const deleteClicked = () => {
      const newList = list.filter((item) => item.ID != list[selectedIndex].ID);  
      setList(newList);
      setOpenSlidingWindow(false);  
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleAddBike = () => {
      postBike({ID: Math.floor(Math.random() * 100), State: newBikeState, StationID: newBikeStationID}).then(r => {        
    });
      setOpen(false);
    };
    return (
      <div style={{  height: "91vh", display: "flex", flexDirection: "column" }}>  
        <List className={classes.ListSyle} subheader={<li/>}>
        <li className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader style={{backgroundColor:'#4E4E50',display:'flex',fontWeight:'bold',height:'50px'}}>
                <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center" style={{width:'90%'}}>
                        <Box p={1} width="1%" >
                          ID
                        </Box>
                        <Box p={1} width="10%">
                          Bike State
                        </Box>
                        <Box p={1} width="7%">
                          Station ID
                        </Box>
                      </Box>
                      <Button startIcon={<AddIcon/>} style={{backgroundColor: 'white'}} onClick={handleClickOpen}>  
                        Add new bike
                      </Button>
                      <Dialog disableBackdropClick  open={open} onClose={handleClose}>
                        <DialogTitle>Fill the form</DialogTitle>
                        <DialogContent>
                        <form className={classes.container}>
                          <FormControl className={classes.formControl}>   
                            <InputLabel htmlFor="demo-dialog-native">
                              State
                            </InputLabel>
                            <Select native value={newBikeState} onChange={handleBikeStateChange} input={<Input />}>
                              <option value={0}> Working </option>
                              <option value={1}> In Service </option>
                              <option value={2}> Blocked </option>
                            </Select>
                          </FormControl>
                          <FormControl className={classes.formControl}>   
                            <InputLabel htmlFor="demo-dialog-native">
                              StationID
                            </InputLabel>
                            <Select native value={newBikeStationID} onChange={handleChangeStation} input={<Input />}>
                              {stations.map((station)=>{
                                return (
                                  <option value={station.ID}> {station.ID} </option>
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
              {list.map((bike,index)=>{
                return (         
                    <li key={bike.ID}>
                    <ListItem style={{backgroundColor: '#69696e',color:'white',display:'flex'}} onClick={()=>handleListItemClick(index)}>
                      <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center" style={{width:'90%'}}>
                        <Box p={0} width="5%"  >
                          <ListItemText primary={bike.ID} ></ListItemText>
                        </Box>
                        <Box p={0} width="10%">
                          <ListItemText primary={BikeState[bike.State]}  ></ListItemText>
                        </Box>
                        <Box p={0} width="5%">
                        <ListItemText primary={bike.StationID} ></ListItemText>
                        </Box>
                      </Box>                   
                      <ThemeProvider theme={themeWarning} >
                        <Button className={classes.deleteButton} id="delete_group_button" onClick={() => setOpenSlidingWindow(true)}> DELETE</Button>
                        <Dialog open={openSlidingWindow} 
                        keepMounted
                        onClose={handleCloseSlidingWindow}>
                          <DialogTitle id="alert-dialog-slide-title">{"Delete this group?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              Do you really want you delete this group?
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
                  <Divider style={{backgroundColor:'#1A1A1D',height:'2px'}}/>
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
