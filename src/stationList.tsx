import React, { useState } from "react";
import { createStyles, makeStyles, Theme,createMuiTheme ,ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import './Layout/topbar.tsx';
import List from '@material-ui/core/List';
import { ListItemText, Divider, ListItem, Button, ListSubheader,DialogActions, DialogContent, DialogContentText, DialogTitle,InputLabel } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Bike , BikeState} from './Api/bikeApi'
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog/Dialog";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { BikeStation, BikeStationState } from "./Api/bikeStationApi";

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
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
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
  export let stations: BikeStation[] = [];
   let bicyclesInStation: Bike[] = [];
   bicyclesInStation.push({id: 10,state: 1, station: 22});
   bicyclesInStation.push({id: 10,state: 1, station: 22});
   bicyclesInStation.push({id: 10,state: 1, station: 22});
  bicyclesInStation.push({id: 10,state: BikeState.Blocked,station: 22});
  bicyclesInStation.push({id: 10,state: BikeState.Blocked,station: 22});
  stations.push({ID:1,State: BikeStationState.Working,LocationName: 'Warszawa Ksiecia Janusza 39',Bikes: bicyclesInStation})
  stations.push({ID:2,State: BikeStationState.Blocked,LocationName: 'Niu Jork Ajfel tałer',Bikes: bicyclesInStation})
function StationListPage() {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [newStationState, setState] = React.useState<number>(0);
    const [newStationLocation,setLocation] = React.useState<string>("Warsaw");
    const [list, setList] = React.useState<BikeStation[]>(stations);
    const [selectedIndex, setSelectedIndex] = React.useState(0  );
    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleChangeState = (event: React.ChangeEvent<{ value: unknown }>) => {
      setState(Number(event.target.value));
    };
    const handleAddStation = () => {
      list.push({ID:Math.floor(Math.random() * 100),State: newStationState,LocationName: newStationLocation,Bikes: []})
    //   postBike({ID: Math.floor(Math.random() * 100), State: newBikeState, StationID: newBikeStationID}).then(r => {        
    // });
      setOpen(false);
     };
    const handleChangeLocation = (location: string) =>{
      setLocation(location);
    };
    const deleteClicked = () => {
      const newList = list.filter((item) => item.ID != list[selectedIndex].ID);  
      setList(newList);
      setOpenSlidingWindow(false);  
    };
    const handleCloseSlidingWindow = () => {
      setOpenSlidingWindow(false);
    };
    const handleListItemClick = (
      index: number,
    ) => {
      setSelectedIndex(index);
    };
    return (
      <div className="App" style={{ height: "91vh", display: "flex", flexDirection: "column" }}>  
        <List className={classes.ListSyle} subheader={<li/>} >
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
                        <Box p={1} width="10%">
                          Station Location
                        </Box>                       
                      </Box>
                      <Button startIcon={<AddIcon/>} style={{backgroundColor: 'white'}} onClick={handleClickOpen}>  
                        Add new station
                      </Button>
                      <Dialog disableBackdropClick  open={open} onClose={handleClose}>
                        <DialogTitle>Fill the form</DialogTitle>
                        <DialogContent>
                        <form className={classes.container}>
                          {/* <FormControl className={classes.formControl}>   
                            <InputLabel htmlFor="demo-dialog-native">
                              State
                            </InputLabel>
                            <Select native value={newStationState} onChange={handleChangeState} input={<Input />}>
                              <option value={0}> In Service </option>
                              <option value={1}> Blocked </option>
                            </Select>
                          </FormControl> */}
                          <FormControl className={classes.formControl}>   
                            <InputLabel htmlFor="demo-dialog-native">
                              Location
                            </InputLabel> 
                            <Input  onChange={(event: any)=>handleChangeLocation(event.target.value)}/>                                                                               
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
              {list.map((station,index)=>{
                return (         
                    <div key={station.ID}>
                    <ListItem style={{backgroundColor: '#69696e',color:'white',display:'flex'}} onClick={()=>handleListItemClick(index)}>
                      <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center" style={{width:'90%'}}>
                        <Box p={0} width="5%"  >
                          <ListItemText primary={station.ID} ></ListItemText>
                        </Box>
                        <Box p={0} width="10%">
                          <ListItemText primary={BikeState[station.State]}  ></ListItemText>
                        </Box>
                        <Box p={0} >
                        <ListItemText primary={station.LocationName} ></ListItemText>
                        </Box>
                      </Box>                   
                      <ThemeProvider theme={themeWarning} >
                        <Button  variant="contained" color="primary" onClick={() => setOpenSlidingWindow(true)}> DELETE</Button>
                        <Dialog open={openSlidingWindow} 
                        keepMounted
                        onClose={handleCloseSlidingWindow}>
                          <DialogTitle id="alert-dialog-slide-title">{"Delete this group?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              Do you really want you delete this station?
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
                  {station.Bikes.map((bike,index)=>{
                    return (
                      <ListItem style={{backgroundColor: '#69696e',color:'white',display:'flex'}}>
                        Bike State:{bike.state} Bike ID: {bike.id}                 
                     </ListItem>                    
                    )                   
                  })}
                  <Divider style={{backgroundColor:'#1A1A1D',height:'2px'}}/>
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