import React, { useEffect, useState } from "react";
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
import {BikeState,Bike, postBike, getBikes, deleteBike} from "./Api/bikeApi";
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
    const [newBikestate, setstate] = React.useState<number>(0);
    const [newBikestation, setStation] = React.useState<number>(0);
    const [list, setList] = React.useState<Bike[]>(bicycles);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const handleListItemClick = (
      index: number,
    ) => {
      setSelectedIndex(index);
    };
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setstate(Number(event.target.value));
  };
  const handleChangeStation = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStation(Number(event.target.value));
  };
    const handleCloseSlidingWindow = () => {
      setOpenSlidingWindow(false);
    };
    const deleteClicked = () => {
      deleteBike(list[selectedIndex].id);
      setOpenSlidingWindow(false);  
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleAddBike = () => {
      postBike({id: Math.floor(Math.random() * 100), state: newBikestate, station: newBikestation}).then(r => {        
    });
      setOpen(false);
    };
    useEffect(()=>{
      getBikes().then(r=>{
        if(r.isError){
          alert("Error");
          return;
        }
        let list: Bike[]=r.data as Bike[] || [];
        list = list.map(e=>{return {id: e.id, state: e.state, station: e.station}});
        setList(list);
      });

    },[selectedIndex,openSlidingWindow]);
    return (
      <div style={{  height: "91vh", display: "flex", flexDirection: "column" }}>  
        <List className={classes.ListSyle} subheader={<li/>}>
        <li className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader style={{backgroundColor:'#4E4E50',display:'flex',fontWeight:'bold',height:'50px'}}>
                <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center" style={{width:'90%'}}>
                        <Box p={1} width="1%" >
                          id
                        </Box>
                        <Box p={1} width="10%">
                          Bike state
                        </Box>
                        <Box p={1} width="7%">
                          Station id
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
                              station
                            </InputLabel>
                            <Select native value={newBikestation} onChange={handleChangeStation} input={<Input />}>
                              {stations.map((station)=>{
                                return (
                                  <option value={station.LocationName}> {station.LocationName} </option>
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
                    <li key={bike.id}>
                    <ListItem style={{backgroundColor: '#69696e',color:'white',display:'flex'}} onClick={()=>handleListItemClick(index)}>
                      <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center" style={{width:'90%'}}>
                        <Box p={0} width="5%"  >
                          <ListItemText primary={bike.id} ></ListItemText>
                        </Box>
                        <Box p={0} width="10%">
                          <ListItemText primary={BikeState[bike.state]}  ></ListItemText>
                        </Box>
                        <Box p={0} width="5%">
                        <ListItemText primary={bike.station} ></ListItemText>
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