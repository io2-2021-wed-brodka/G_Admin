import { createStyles, makeStyles, Theme,createMuiTheme ,ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import './Layout/topbar.tsx';
import List from '@material-ui/core/List';
import { ListItemText, Divider, ListItem, Button, ListSubheader } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Bike , BikeState} from './Api/bikeApi'

export enum BikeStationState{
    Working,Blocked,
  }
  export  interface BikeStation{
    ID: number;
    State: BikeStationState;
    LocationName: string;
    Bikes: Bike[];
  }
  
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
   bicyclesInStation.push({ID: 10,State: 1, StationID: 22});
   bicyclesInStation.push({ID: 10,State: 1, StationID: 22});
   bicyclesInStation.push({ID: 10,State: 1, StationID: 22});
  bicyclesInStation.push({ID: 10,State: BikeState.Blocked,StationID: 22});
  bicyclesInStation.push({ID: 10,State: BikeState.Blocked,StationID: 22});
  stations.push({ID:1,State: BikeStationState.Working,LocationName: 'xDDDD',Bikes: bicyclesInStation})
  stations.push({ID:2,State: BikeStationState.Blocked,LocationName: 'zablokowany debil',Bikes: bicyclesInStation})
function StationListPage() {
    const classes = useStyles();
    return (
      <div className="App" style={{ height: "91vh", display: "flex", flexDirection: "column" }}>  
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
              </ListSubheader>
              {stations.map((station,index)=>{
                return (         
                    <div>
                    <ListItem style={{backgroundColor: '#69696e',color:'white',display:'flex'}}>
                      <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center" style={{width:'90%'}}>
                        <Box p={0} width="5%"  >
                          <ListItemText primary={station.ID} ></ListItemText>
                        </Box>
                        <Box p={0} width="10%">
                          <ListItemText primary={BikeState[station.State]}  ></ListItemText>
                        </Box>
                        <Box p={0} width="5%">
                        <ListItemText primary={station.LocationName} ></ListItemText>
                        </Box>
                      </Box>                   
                      <ThemeProvider theme={themeWarning} >
                        <Button  variant="contained" color="primary"> DELETE</Button>
                      </ThemeProvider>                 
                  </ListItem>
                  {station.Bikes.map((bike,index)=>{
                    return (
                      <ListItem style={{backgroundColor: '#69696e',color:'white',display:'flex'}}>
                      xDD                
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