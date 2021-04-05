import React, { useEffect, useState } from "react";
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
import { BikeStation, BikeStationState, deleteBikeStation, getBikeStations, postBikeStations } from "./Api/bikeStationApi";

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
function StationListPage() {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [newStationState, setState] = React.useState<number>(0);
    const [newStationLocation,setLocation] = React.useState<string>("Warsaw");
    const [list, setList] = React.useState<BikeStation[]>(stations);
    const [selectedIndex, setSelectedIndex] = React.useState(0  );
    const [openSlidingWindow, setOpenSlidingWindow] = useState<boolean>(false);
    const [getStationTriger, setStationTriger] = React.useState(true);
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
      postBikeStations({id:Math.floor(Math.random() * 100),state: newStationState,name: newStationLocation,bikes: []}).then(r => {        
      });
        setOpen(false);
        setStationTriger(!getStationTriger);
     };
    const handleChangeLocation = (location: string) =>{
      setLocation(location);
    };
    const deleteClicked = () => {
      deleteBikeStation(list[selectedIndex].id.toString());
      setOpenSlidingWindow(false); 
      setStationTriger(!getStationTriger); 
    };
    const handleCloseSlidingWindow = () => {
      setOpenSlidingWindow(false);
    };
    const handleListItemClick = (
      index: number,
    ) => {
      setSelectedIndex(index);
    };
    useEffect(()=>{
      getBikeStations().then(r=>{
       if(r.isError){
         alert("Error");
         return;
       }
       let list: BikeStation[]=r.data as BikeStation[] || [];
       list = list.map(e=>{return {id: e.id, name: e.name, state: e.state, bikes: e.bikes}});
       setList(list);
     });
    },[getStationTriger]);
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
                    <div key={station.id}>
                    <ListItem style={{backgroundColor: '#69696e',color:'white',display:'flex'}} onClick={()=>handleListItemClick(index)}>
                      <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center" style={{width:'90%'}}>
                        <Box p={0} width="5%"  >
                          <ListItemText primary={station.id} ></ListItemText>
                        </Box>
                        <Box p={0} width="10%">
                          <ListItemText primary={station.state}  ></ListItemText>
                        </Box>
                        <Box p={0} >
                        <ListItemText primary={station.name} ></ListItemText>
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
                  {/* {station.bikes.map((bike,index)=>{
                    return (
                      <ListItem style={{backgroundColor: '#69696e',color:'white',display:'flex'}}>
                        Bike State:{bike.state} Bike ID: {bike.id}                 
                     </ListItem>                    
                    )                   
                  })} */}
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